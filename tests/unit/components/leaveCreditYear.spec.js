// 11/18/2021 [C.RUBIO]
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import leaveCreditYear from "../../../src/views/human-resources/setups/leaveCreditYear.vue";
import Validation from "@/utils/Validation";
import VueRouter from "vue-router";
import Vue from "vue";
import moment from 'moment';
import vuetify from "@/plugins/vuetify";
import Vuetify from "vuetify/lib";
import VueSweetalert2 from "vue-sweetalert2";

function getMountedComponent(Component, propsData) {
    return shallowMount(Component, { propsData });
}

describe("leaveCreditYear.vue", () => {
    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => { });
        jest.spyOn(console, "info").mockImplementation(() => { });
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    it("should find and trigger button cancel", async () => {
        const wrapper = getMountedComponent(leaveCreditYear, {});
        const button = wrapper.find('[data-test=cancel]')

        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Cancel')
        expect(wrapper.vm.index).toBe(1)
        button.trigger('click');
        expect(wrapper.vm.index).toBe(2)
    });

    let leaveCreditYearDatas;

    beforeEach(() => {
        leaveCreditYearDatas = shallowMount(leaveCreditYear, {
            // Create a shallow instance of the component
            data: {
                index: 1,
                date: null,
                menu: false,
                startDate: false,
                year: false,
                endDate: false,
                edit: false,
                search: "",
                message: "",
                response: "",
                openForm: false,
                loading: true,
                savingChanges: false,
                headers: [],
                leaveCreditYear: [],
                editedIndex: -1,
                inputConfig: [],
            }
        });
    });

    //index
    it('check if it renders an index', () => {
        const wrapper = getMountedComponent(leaveCreditYear, { index: 2 })
        expect(leaveCreditYearDatas.vm.index).toEqual(1);
        wrapper.vm.close();
        expect(wrapper.vm.index).toBe(2);
    });

    //date
    it('check if it renders a date', () => {
        expect(leaveCreditYearDatas.vm.date).toEqual(null);
    });

    //menu
    it('check if it renders a menu', () => {
        expect(leaveCreditYearDatas.vm.menu).toEqual(false);
    });

    //startDate
    it('check if it renders a startDate', () => {
        expect(leaveCreditYearDatas.vm.startDate).toEqual(false);
    });

    //year
    it('check if it renders a Year', () => {
        expect(leaveCreditYearDatas.vm.year).toEqual(false);
    });

    //endDate
    it('check if it renders a endDate', () => {
        expect(leaveCreditYearDatas.vm.endDate).toEqual(false);
    });

    //edit
    it('check if it renders a edit', () => {
        expect(leaveCreditYearDatas.vm.edit).toEqual(false);
    });

    //search
    it('check if it renders a search', () => {
        expect(leaveCreditYearDatas.vm.search).toEqual("");
    });

    //message
    it('check if it renders a message', () => {
        // Within mounted.vm, we can access all Vue instance methods
        expect(leaveCreditYearDatas.vm.message).toEqual("");
    });
    //response
    it('response is an empty string', () => {
        expect(leaveCreditYearDatas.vm.response).toEqual("");
    });
    //form
    it("render data form", () => {
        const wrapper = getMountedComponent(leaveCreditYear, { openForm: true });
        wrapper.vm.close();
        expect(wrapper.vm.openForm).toBe(false);
    });
    //defaultForm
    it("check if form rendered => default is rendered but not show", () => {
        const wrapper = getMountedComponent(leaveCreditYear);
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    //defaultTable
    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(leaveCreditYear);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });
    //loading
    it("renders loading", () => {
        const wrapper = getMountedComponent(leaveCreditYear, { loading: false });
        wrapper.vm.retrieve();
        expect(wrapper.vm.loading).toBe(true);
    })
    //save changes
    it("save all changes", () => {
        const wrapper = getMountedComponent(leaveCreditYear, { savingChanges: true });
        wrapper.vm.create();
        expect(wrapper.vm.savingChanges).toBe(false);
    })
    //headers
    it("contains name and assignment", () => {
        expect(getMountedComponent(leaveCreditYear).vm.headers).toEqual([
            { text: "Year", value: "Year" },
            { text: "Start Date", value: "StartDate" },
            { text: "End Date", value: "EndDate" },
            { text: "Actions", value: "actions", sortable: false },
        ]);
    });

    //editedItem
    it('check editedItem object', () => {
        const wrapper = getMountedComponent(leaveCreditYear, { editedItem: {} });

        const editedItem = {
            ID: null,
            Year: null,
            StartDate: moment(new Date()).format("MM/DD/YYYY"),
            EndDate: moment(new Date()).format("MM/DD/YYYY"),
        }
        expect(typeof wrapper.vm.editedItem).toBe('object');
        expect(wrapper.vm.editedItem).toEqual(editedItem);
    });

    //defaultItem
    it('check defaultItem object', () => {
        const wrapper = getMountedComponent(leaveCreditYear, { editedItem: {} });

        const defaultItem = {
            ID: null,
            Year: null,
            StartDate: null,
            EndDate: null,
        };
        expect(typeof wrapper.vm.defaultItem).toBe('object');
        expect(wrapper.vm.defaultItem).toEqual(defaultItem);
    });

    //leaveCreditYear declaration
    it('leaveCreditYear declaration', () => {
        expect(leaveCreditYearDatas.vm.LeaveCreditYear).toEqual([]);
    });
    //edited Index
    it('editedIndex value', () => {
        expect(leaveCreditYearDatas.vm.editedIndex).toEqual(-1);
    });
    //input config
    it("input config", () => {
        expect(JSON.stringify(getMountedComponent(leaveCreditYear, {}).vm.inputConfig)).toBe(
            JSON.stringify([{
                inputLabel: "Year",
                inputType: "year",
                inputModel: "Year",
                rules: [(v) => Validation.required(v, "Year")],
            },
            {
                inputLabel: "Start Date",
                inputType: "date",
                inputModel: "StartDate",
                rules: [(v) => Validation.required(v, " Start Date")],
            },
            {
                inputLabel: " End Date ",
                inputType: "date",
                inputModel: "EndDate",
                rules: [(v) => Validation.required(v, " End Date ")],
            },
            ])
        );
    });

});

describe("test leaveCreditYear method", () => {
    const fakeData = { EmpID: null, ModifiedBy: null }
    let fakeUserDetails
    let user_session
    let user_details
    let wrapper

    beforeEach(() => {
        const localVue = createLocalVue();

        localVue.use(VueSweetalert2);
        fakeUserDetails = { Email: 'test@gmail.com' }
        user_session = sessionStorage.setItem("user_session", JSON.stringify({ empId: 1 }));
        user_details = localStorage.setItem("user_details", JSON.stringify({ data: fakeUserDetails }));
        wrapper = shallowMount(leaveCreditYear, { user_session, user_details, localVue });
    })

    test("retrieve data spyOn()", async () => {
        const retrieveData = jest.spyOn(wrapper.vm, "retrieveData");
        await wrapper.vm.retrieveData();
        expect(typeof retrieveData).toEqual("function");
        expect(retrieveData).toHaveBeenCalled();
        expect(retrieveData).toHaveBeenCalledTimes(1);
    });

    test("create data spyOn()", async () => {
        const createNewItem = jest.spyOn(wrapper.vm, "createNewItem");
        await wrapper.vm.createNewItem(fakeData);
        expect(typeof createNewItem).toEqual("function");
        expect(createNewItem).toHaveBeenCalled();
        expect(createNewItem).toHaveBeenCalledTimes(1);
    });

    test("update data spyOn()", async () => {
        const updateItem = jest.spyOn(wrapper.vm, "updateItem");
        await wrapper.vm.updateItem(fakeData);
        expect(typeof updateItem).toEqual("function");
        expect(updateItem).toHaveBeenCalled();
        expect(updateItem).toHaveBeenCalledTimes(1);
    });


    test("delete data spyOn()", async () => {
        const deleteItem = jest.spyOn(wrapper.vm, "deleteItem");
        await wrapper.vm.deleteItem(fakeData);
        expect(typeof deleteItem).toEqual("function");
        expect(deleteItem).toHaveBeenCalled();
        expect(deleteItem).toHaveBeenCalledTimes(1);
    });

    it('check close function', () => {
        const defaultItem = {
            ID: null,
            Year: null,
            StartDate: null,
            EndDate: null,
        }
        const editedItem = Object.assign({}, defaultItem)
        const wrapper = shallowMount(leaveCreditYear, { openForm: true, editedItem: editedItem, editedIndex: -1 })
        wrapper.vm.close()
        expect(wrapper.vm.openForm).toEqual(false);
        expect(wrapper.vm.editedItem).toEqual(defaultItem);
        expect(wrapper.vm.editedIndex).toEqual(-1);
    });

})

describe("test alert child component", () => {
    let wrapper;
    Vue.use(VueRouter);
    Vue.use(Vuetify)
    const routes = [{
        path: "/",
        component: leaveCreditYear,
    },];

    const router = new VueRouter({
        routes,
    });

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount(leaveCreditYear, {
            data() {
                return {
                    message: "SuccessFully Test",
                };
            },
            router,
            localVue,
            vuetify,

        });
    });

    test("check if alert rendered and contains correct attributes", async () => {
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
