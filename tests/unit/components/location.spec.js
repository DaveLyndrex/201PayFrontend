// 11/18/2021 [C.RUBIO]
import { mount, createLocalVue } from "@vue/test-utils";
import location from "../../../src/views/human-resources/setups/Location.vue";
import Validation from "@/utils/Validation";
import VueRouter from "vue-router";
import Vue from "vue";
import Vuex from "vuex";
// import vuetify from "@/plugins/vuetify";
import Vuetify from "vuetify/lib";
import VueSweetalert2 from "vue-sweetalert2";

const fakeAPIHolidayType = [
    { id: 1, HolidayType: "string" },
    { id: 2, HolidayType: "string" },
    { id: 3, HolidayType: "string" },
];
const fakeAPICountries = [
    { id: 1, Location: "string" },
    { id: 2, Location: "string" },
    { id: 3, Location: "string" },
];

let wrapper;
let fakeUserDetails
let user_session
let user_details
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);
const routes = [{
    path: "/",
    component: location,
}, ];

const router = new VueRouter({
    routes,
});

const store = new Vuex.Store({
    getters: {
        allHolidayType: () => fakeAPIHolidayType,
        allCountries: () => fakeAPICountries
    }
});


const fakeData = { EmpID: null, ModifiedBy: null }

fakeUserDetails = { Email: 'test@gmail.com' }
user_session = sessionStorage.setItem("user_session", JSON.stringify({ empId: 1 }));
user_details = localStorage.setItem("user_details", JSON.stringify({ data: fakeUserDetails }));

console.log = jest.fn();
console.error = jest.fn();

const localVue = createLocalVue();
localVue.use(VueSweetalert2);
localVue.use(router)
wrapper = mount(location, {
    data() {
        return {
            message: "SuccessFully Test",

        }
    },
    localVue,
    store,
    router,
    user_session,
    user_details,

});
// console.log = consoleLog;
// console.error = consoleError;
describe("Component", () => {


    it("input config", () => {



        expect(JSON.stringify(wrapper.vm.inputConfig)).toBe(
            JSON.stringify([{
                    inputLabel: "Location Code",
                    inputType: "text",
                    inputModel: "ID",
                    rules: [(v) => Validation.required(v, "Location Code")],
                },
                {
                    inputLabel: " Effective Start Date ",
                    inputType: "date",
                    inputModel: "EffectiveStartDate",
                },
                {
                    inputLabel: " Effective End Date ",
                    inputType: "date",
                    inputModel: "EffectiveEndDate",
                },
                {
                    inputLabel: " Set Code ",
                    inputType: "text",
                    inputModel: "SetCode",
                },
                {
                    inputLabel: " Active Status ",
                    inputType: "select",
                    inputModel: "ActiveStatus",
                    selectionItems: [{
                            ID: "Active",
                            name: "Active",
                        },
                        {
                            ID: "Inactive",
                            name: "Inactive",
                        },
                    ],
                },
                {
                    inputLabel: "Main Phone Area Code",
                    inputType: "text",
                    inputModel: "MainPhoneAreaCode",
                },
                {
                    inputLabel: "Main Phone Country Code",
                    inputType: "text",
                    inputModel: "MainPhoneCountryCode",
                },
                {
                    inputLabel: "Main Phone Extension",
                    inputType: "text",
                    inputModel: "MainPhoneExtension",
                },
                {
                    inputLabel: "Location Name",
                    inputType: "text",
                    inputModel: "Location",
                    rules: [(v) => Validation.required(v, "Location Name")],
                },
                {
                    inputLabel: "Address Line 1",
                    inputType: "text",
                    inputModel: "AddressLine1",
                },
                {
                    inputLabel: "Address Line 2",
                    inputType: "text",
                    inputModel: "AddressLine2",
                },
                {
                    inputLabel: "Address Line 3",
                    inputType: "text",
                    inputModel: "AddressLine3",
                },
                {
                    inputLabel: "Address Line 4",
                    inputType: "text",
                    inputModel: "AddressLine4",
                },
                {
                    inputLabel: "Town/City",
                    inputType: "text",
                    inputModel: "City",
                },
                {
                    inputLabel: " Province ",
                    inputType: "text",
                    inputModel: "Province",
                },
                {
                    inputLabel: " Country ",
                    inputType: "select",
                    inputModel: "Country",
                    selectionItems: store.getters.allCountries.map((item) => {
                        return {
                            ...item,
                            name: item.CountryName,
                        };
                    }),
                },
                {
                    inputLabel: " LeiInformation Category ",
                    inputType: "text",
                    inputModel: "LeiInformationCategory",
                },
                {
                    inputLabel: " Legislation Code ",
                    inputType: "text",
                    inputModel: "LegislationCode",
                },
            ])
        );
    });



    it("contains name and assignment", () => {


        expect(wrapper.vm.headers).toEqual([
            { text: "Actions", value: "actions", sortable: false },
            { text: "Location Name", value: "Location" },
            { text: "Effective Start Date", value: "EffectiveStartDate" },
            { text: "Effective End Date", value: "EffectiveEndDate" },
            { text: "Set Code", value: "SetCode" },
            { text: "Active Status", value: "ActiveStatus" },
            { text: "Main Phone Area Code", value: "MainPhoneAreaCode" },
            { text: "Main Phone Country Code", value: "MainPhoneCountryCode" },
            { text: "Main Phone Extension", value: "MainPhoneExtension" },
            { text: "Address Line 1", value: "AddressLine1" },
            { text: "Address Line 2", value: "AddressLine2" },
            { text: "Address Line 3", value: "AddressLine3" },
            { text: "Address Line 4", value: "AddressLine4" },
            { text: "Town/City", value: "City" },
            { text: "Province", value: "Province" },
            { text: "Country", value: "Country" },
            { text: "LeiInformation Category", value: "LeiInformationCategory" },
            { text: "Legislation Code", value: "LegislationCode" },
        ]);

    });


    it("should find and trigger button cancel", async() => {
        const button = wrapper.find('[data-test=cancel]')

        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Cancel')
        expect(wrapper.vm.index).toBe(1)
        button.trigger('click');
        expect(wrapper.vm.index).toBe(2)
    });

    it("should find and trigger button save", async() => {
        const saveItem = jest.spyOn(wrapper.vm, 'saveItem')
        const button = wrapper.find('[data-test=save]')
        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Save')
        button.trigger('click');
        await wrapper.vm.$nextTick();
        expect(saveItem).toHaveBeenCalled()
    });

    it("check if data table rendered", () => {
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });

    it("check if form rendered => default is rendered but not show", () => {
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    it("check if data table rendered", () => {
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });



});
describe("test location method", () => {


    test("retrieve data spyOn()", async() => {
        const retrieveData = jest.spyOn(wrapper.vm, "retrieveData");
        await wrapper.vm.retrieveData();
        expect(typeof retrieveData).toEqual("function");
        expect(retrieveData).toHaveBeenCalled();
        expect(retrieveData).toHaveBeenCalledTimes(1);
    });

    test("create data spyOn()", async() => {
        const createNewItem = jest.spyOn(wrapper.vm, "createNewItem");
        await wrapper.vm.createNewItem(fakeData);
        expect(typeof createNewItem).toEqual("function");
        expect(createNewItem).toHaveBeenCalled();
        expect(createNewItem).toHaveBeenCalledTimes(1);
    });

    test("update data spyOn()", async() => {
        const updateItem = jest.spyOn(wrapper.vm, "updateItem");
        await wrapper.vm.updateItem(fakeData);
        expect(typeof updateItem).toEqual("function");
        expect(updateItem).toHaveBeenCalled();
        expect(updateItem).toHaveBeenCalledTimes(1);
    });


    test("delete data spyOn()", async() => {
        const deleteItem = jest.spyOn(wrapper.vm, "deleteItem");
        await wrapper.vm.deleteItem(fakeData);
        expect(typeof deleteItem).toEqual("function");
        expect(deleteItem).toHaveBeenCalled();
        expect(deleteItem).toHaveBeenCalledTimes(1);
    });

})

describe("test alert child component", () => {



    test("check if alert rendered and contains correct attributes", async() => {
        expect(wrapper.find("#alert").attributes().style).toBe("display: none;");
        expect(wrapper.find("#alert").isVisible()).toBe(false);
        expect(wrapper.find("#alert").attributes()).toStrictEqual({
            class: "alert-cont",
            id: "alert",
            style: "display: none;",
        });
    });


    it('should received "SuccessFully Test" as the message property', () => {
        expect(wrapper.vm.message).toEqual("SuccessFully Test");
    });

    it("should has the expected html structure", () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});