import { mount, createLocalVue } from "@vue/test-utils";
import holiday from "../../../src/views/human-resources/setups/Holiday.vue";
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

const fakeAPILocation = [
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
    component: holiday,
}, ];

const router = new VueRouter({
    routes,
});

const store = new Vuex.Store({
    getters: {
        allHolidayType: () => fakeAPIHolidayType,
        allLocation: () => fakeAPILocation
    }
});


const fakeData = { EmpID: null, ModifiedBy: null }

fakeUserDetails = { Email: 'test@gmail.com' }
user_session = sessionStorage.setItem("user_session", JSON.stringify({ empId: 1 }));
user_details = localStorage.setItem("user_details", JSON.stringify({ data: fakeUserDetails }));



const localVue = createLocalVue();
localVue.use(VueSweetalert2);
localVue.use(router)
wrapper = mount(holiday, {
    data() {
        return {
            message: "SuccessFully Test",

        }
    },
    localVue,
    store,
    router,
    user_session,
    user_details

});

describe("Component", () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});



    it("input config", () => {


        expect(JSON.stringify(wrapper.vm.inputConfig)).toBe(
            JSON.stringify([{
                    inputLabel: "Date",
                    inputType: "date",
                    inputModel: "Date",
                    rules: [(v) => Validation.required(v, "Date")],
                },
                {
                    inputLabel: "Holiday Type",
                    inputType: "select",
                    inputModel: "HolidayType",
                    selectionItems: store.getters.allHolidayType.map(
                        (item) => {
                            return {
                                ...item,
                                name: item.HolidayType,
                            };
                        }
                    ),
                    rules: [(v) => Validation.required(v, "HolidayType")],
                },
                {
                    inputLabel: "Holiday Name",
                    inputType: "text",
                    inputModel: "HolidayName",
                    rules: [(v) => Validation.required(v, "HolidayName")],
                },
                {
                    inputLabel: "Location",
                    inputType: "select",
                    inputModel: "LocationID",
                    selectionItems: store.getters.allLocation.map(
                        (item) => {
                            return {
                                ...item,
                                name: item.Location,
                            };
                        }
                    ),
                    rules: [(v) => Validation.required(v, "Location")],
                },
            ])
        );
    });



    it("contains name and assignment", () => {


        expect(wrapper.vm.headers).toEqual([
            { text: "Date", value: "Date" },
            { text: "Holiday Type", value: "HolidayType" },
            { text: "Holiday Name", value: "HolidayName" },
            { text: "Location", value: "LocationID" },
            { text: "Actions", value: "actions", sortable: false },
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

describe("test holiday method", () => {


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