
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import department from "../../../src/views/human-resources/setups/Department.vue";
import Validation from "@/utils/Validation";
import VueRouter from "vue-router";
import Vue from "vue";

import vuetify from "@/plugins/vuetify";
import Vuetify from "vuetify/lib";
import VueSweetalert2 from "vue-sweetalert2";
import moment from "moment";

function getMountedComponent(Component, propsData) {
    return shallowMount(Component, { propsData });
}

describe("Department.vue", () => {
    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => { });
        jest.spyOn(console, "info").mockImplementation(() => { });
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    it("should find and trigger button cancel", async () => {
        const wrapper = getMountedComponent(department, {});
        const button = wrapper.find('[data-test=cancel]')

        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Cancel')
        expect(wrapper.vm.index).toBe(1)
        button.trigger('click');
        expect(wrapper.vm.index).toBe(2)
    });

    let departmentDatas;

    beforeEach(() => {
        departmentDatas = shallowMount(department, {
            // Create a shallow instance of the component
            data: {
                index: 1,
                edit: false,
                extraInfoEffectiveStartDate: false,
                classificationEffectiveDate: false,
                effectiveStartDateMenuValue: moment(new Date()).format("MM/DD/YYYY"),
                effectiveEndDateMenuValue: moment(new Date()).format("MM/DD/YYYY"),
                classificationEffectiveDateMenuValue: moment(new Date()).format("MM/DD/YYYY"),
                extraInfoEffectiveStartDateMenuValue: moment(new Date()).format("MM/DD/YYYY"),
                startDate: false,
                endDate: false,
                search: "",
                message: "",
                response: "",
                openForm: false,
                loading: true,
                savingChanges: false,
                headers: [],
                department: [],
                editedIndex: -1,
                inputConfig: [],
            }
        });
    });

    //index
    it('check if it renders an index', () => {
        const wrapper = getMountedComponent(department, { index: 2 })
        expect(departmentDatas.vm.index).toEqual(1);
        wrapper.vm.close();
        expect(wrapper.vm.index).toBe(2);
    });

    //search
    it('check if it renders a search', () => {
        expect(departmentDatas.vm.search).toEqual("");
    });

    //edit
    it('check if it renders an edit', () => {
        expect(departmentDatas.vm.edit).toEqual(false);
    });

    //startDate
    it('check if it renders an startDate', () => {
        expect(departmentDatas.vm.startDate).toEqual(false);
    });

    //endDate
    it('check if it renders an endDate', () => {
        expect(departmentDatas.vm.endDate).toEqual(false);
    });

    //extraInfoEffectiveStartDate
    it('check if it renders the extraInfoEffectiveStartDate', () => {
        expect(departmentDatas.vm.extraInfoEffectiveStartDate).toEqual(false);
    });

    //classificationEffectiveDate
    it('check if it renders the classificationEffectiveDate', () => {
        expect(departmentDatas.vm.classificationEffectiveDate).toEqual(false);
    });

    //effectiveStartDateMenuValue
    it('check if it renders the effectiveStartDateMenuValue', () => {
        expect(departmentDatas.vm.effectiveStartDateMenuValue).toEqual(moment(new Date()).format("YYYY-MM-DD"));
    });

    //effectiveEndDateMenuValue
    it('check if it renders the effectiveEndDateMenuValue', () => {
        expect(departmentDatas.vm.effectiveEndDateMenuValue).toEqual(moment(new Date()).format("YYYY-MM-DD"));
    });

    //classificationEffectiveDateMenuValue
    it('check if it renders the classificationEffectiveDateMenuValue', () => {
        expect(departmentDatas.vm.classificationEffectiveDateMenuValue).toEqual(moment(new Date()).format("YYYY-MM-DD"));
    });

    //extraInfoEffectiveStartDateMenuValue
    it('check if it renders the extraInfoEffectiveStartDateMenuValue', () => {
        expect(departmentDatas.vm.extraInfoEffectiveStartDateMenuValue).toEqual(moment(new Date()).format("YYYY-MM-DD"));
    });

    //message
    it('check if it renders a message', () => {
        // Within mounted.vm, we can access all Vue instance methods
        expect(departmentDatas.vm.message).toEqual("");
    });
    //response
    it('response is an empty string', () => {
        expect(departmentDatas.vm.response).toEqual("");
    });
    //form
    it("render data form", () => {
        const wrapper = getMountedComponent(department, { openForm: true });
        wrapper.vm.close();
        expect(wrapper.vm.openForm).toBe(false);
    });
    //defaultForm
    it("check if form rendered => default is rendered but not show", () => {
        const wrapper = getMountedComponent(department);
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    //defaultTable
    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(department);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });
    //loading
    it("renders loading", () => {
        const wrapper = getMountedComponent(department, { loading: false });
        wrapper.vm.retrieve();
        expect(wrapper.vm.loading).toBe(true);
    })
    //save changes
    it("save all changes", () => {
        const wrapper = getMountedComponent(department, { savingChanges: true });
        wrapper.vm.create();
        expect(wrapper.vm.savingChanges).toBe(false);
    })
    //headers
    it("contains name and assignment", () => {
        expect(getMountedComponent(department).vm.headers).toEqual([
            { text: "Department Code", value: "DepartmentCode" },
            { text: "Department Name", value: "DepartmentName" },
            { text: "Effective Start Date", value: "EffectiveStartDate" },
            { text: "Effective End Date", value: "EffectiveEndDate" },
            { text: "Classification Name", value: "ClassificationName" },
            { text: "Classification Effective Date", value: "ClassificationEffectiveDate" },
            { text: "Extra Info Effective Start Date", value: "ExtraInfoEffectiveStartDate" },
            { text: "Legislation Code", value: "LegislationCode" },
            { text: "LeiInformation Category", value: "LeiInformationCategory" },
            { text: "Set Code", value: "SetCode" },
            { text: "Actions", value: "actions", sortable: false },
        ]);
    });


    //editedItem
    it('check editedItem object', () => {
        const wrapper = getMountedComponent(department, { editedItem: {} });

        const editedItem = {
            ID: null,
            DepartmentCode: null,
            DepartmentName: null,
            EffectiveStartDate: moment(new Date()).format("MM/DD/YYYY"),
            EffectiveEndDate: moment(new Date()).format("MM/DD/YYYY"),
            ClassificationName: null,
            ClassificationEffectiveDate: moment(new Date()).format("MM/DD/YYYY"),
            ExtraInfoEffectiveStartDate: moment(new Date()).format("MM/DD/YYYY"),
            LegislationCode: null,
            LeiInformationCategory: null,
            SetCode: null,
        }
        expect(typeof wrapper.vm.editedItem).toBe('object');
        expect(wrapper.vm.editedItem).toEqual(editedItem);
    });

    //defaultItem
    it('check defaultItem object', () => {
        const wrapper = getMountedComponent(department, { editedItem: {} });

        const defaultItem = {
            ID: null,
            DepartmentCode: null,
            DepartmentName: null,
            EffectiveStartDate: null,
            EffectiveEndDate: null,
            ClassificationName: null,
            ClassificationEffectiveDate: null,
            ExtraInfoEffectiveStartDate: null,
            LegislationCode: null,
            LeiInformationCategory: null,
            SetCode: null,
        };
        expect(typeof wrapper.vm.defaultItem).toBe('object');
        expect(wrapper.vm.defaultItem).toEqual(defaultItem);
    });

    //department declaration
    it('department declaration', () => {
        expect(departmentDatas.vm.department).toEqual([]);
    });
    //edited Index
    it('editedIndex value', () => {
        expect(departmentDatas.vm.editedIndex).toEqual(-1);
    });
    //input config
    it("input config", () => {
        expect(JSON.stringify(getMountedComponent(department, {}).vm.inputConfig)).toBe(
            JSON.stringify([{
                inputLabel: "Department Code",
                inputType: "text",
                inputModel: "DepartmentCode",
                rules: [(v) => Validation.required(v, "Department Code")],
            },
            {
                inputLabel: "Department Name",
                inputType: "text",
                inputModel: "DepartmentName",
                rules: [(v) => Validation.required(v, "Department Name")],
            },
            {
                inputLabel: "Effective Start Date",
                inputType: "date",
                inputModel: "EffectiveStartDate",
                rules: [(v) => Validation.required(v, "Effective Start Date")],
            },
            {
                inputLabel: "Effective End Date",
                inputType: "date",
                inputModel: "EffectiveEndDate",
                rules: [(v) => Validation.required(v, "Effective End Date")],
            },
            {
                inputLabel: "Classification Name",
                inputType: "text",
                inputModel: "ClassificationName",
                rules: [(v) => Validation.required(v, "Classification Name")],
            },
            {
                inputLabel: "Classification Effective Date",
                inputType: "date",
                inputModel: "ClassificationEffectiveDate",
                rules: [(v) => Validation.required(v, "Classification Effective Date")],
            },
            {
                inputLabel: "Extra Info Effective Start Date",
                inputType: "date",
                inputModel: "ExtraInfoEffectiveStartDate",
                rules: [(v) => Validation.required(v, "Extra Info Effective Start Date")],
            },
            {
                inputLabel: "Legislation Code",
                inputType: "text",
                inputModel: "LegislationCode",
                rules: [(v) => Validation.required(v, "Legislation Code")],
            },
            {
                inputLabel: "LeiInformation Category",
                inputType: "text",
                inputModel: "LeiInformationCategory",
                rules: [(v) => Validation.required(v, "LeiInformation Category")],
            },
            {
                inputLabel: "Set Code",
                inputType: "text",
                inputModel: "SetCode",
                rules: [(v) => Validation.required(v, "Set Code")],
            },
            ])
        );
    });

});

describe("test department method", () => {
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
        wrapper = shallowMount(department, { user_session, user_details, localVue });
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
            DepartmentCode: null,
            DepartmentName: null,
            EffectiveStartDate: null,
            EffectiveEndDate: null,
            ClassificationName: null,
            ClassificationEffectiveDate: null,
            ExtraInfoEffectiveStartDate: null,
            LegislationCode: null,
            LeiInformationCategory: null,
            SetCode: null,
        }
        const editedItem = Object.assign({}, defaultItem)
        const wrapper = shallowMount(department, { openForm: true, editedItem: editedItem, editedIndex: -1 })
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
        component: department,
    },];

    const router = new VueRouter({
        routes,
    });

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount(department, {
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

