import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import employmentType from "../../../src/views/human-resources/setups/employmentType.vue";
import Validation from "@/utils/Validation";
import VueRouter from "vue-router";
import Vue from "vue";

import vuetify from "@/plugins/vuetify";
import Vuetify from "vuetify/lib";
import VueSweetalert2 from "vue-sweetalert2";

function getMountedComponent(Component, propsData) {
    return shallowMount(Component, { propsData });
}

describe("employmentType.vue", () => {
    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "info").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });


    it("should find and trigger button cancel", async() => {
        const wrapper = getMountedComponent(employmentType, {});
        const button = wrapper.find('[data-test=cancel]')

        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Cancel')
        expect(wrapper.vm.index).toBe(1)
        button.trigger('click');
        expect(wrapper.vm.index).toBe(2)
    });

    // it("check if data table rendered", () => {
    //     const wrapper = getMountedComponent(employmentType);
    //     expect(wrapper.find(".default-table").exists()).toBe(true);
    // });

    // it("check if form rendered => default is rendered but not show", () => {
    //     const wrapper = getMountedComponent(employmentType);
    //     expect(wrapper.find(".default-form").exists()).toBe(false);
    // });
    // it("check if data table rendered", () => {
    //     const wrapper = getMountedComponent(employmentType);
    //     expect(wrapper.find(".default-table").exists()).toBe(true);
    // });

    let employmentTypeDatas;

    beforeEach(() => {
        employmentTypeDatas = shallowMount(employmentType, {
            // Create a shallow instance of the component
            data: {
                index: 1,
                edit: false,
                search: "",
                message: "",
                response: "",
                openForm: false,
                loading: true,
                savingChanges: false,
                headers: [],
                employmentType: [],
                editedIndex: -1,
                inputConfig: [],
            }
        });
    });

    //index
    it('check if it renders an index', () => {
        const wrapper = getMountedComponent(employmentType, { index: 2 })
        expect(employmentTypeDatas.vm.index).toEqual(1);
        wrapper.vm.close();
        expect(wrapper.vm.index).toBe(2);
    });

    //search
    it('check if it renders a search', () => {
        expect(employmentTypeDatas.vm.search).toEqual("");
    });

     //edit
     it('check if it renders a edit', () => {
        expect(employmentTypeDatas.vm.edit).toEqual(false);
    });

    //message
    it('check if it renders a message', () => {
        // Within mounted.vm, we can access all Vue instance methods
        expect(employmentTypeDatas.vm.message).toEqual("");
    });
    //response
    it('response is an empty string', () => {
        expect(employmentTypeDatas.vm.response).toEqual("");
    });
    //form
    it("render data form", () => {
        const wrapper = getMountedComponent(employmentType, { openForm: true });
        wrapper.vm.close();
        expect(wrapper.vm.openForm).toBe(false);
    });
    //defaultForm
    it("check if form rendered => default is rendered but not show", () => {
        const wrapper = getMountedComponent(employmentType);
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    //defaultTable
    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(employmentType);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });
    //loading
    it("renders loading", () => {
        const wrapper = getMountedComponent(employmentType, { loading: false });
        wrapper.vm.retrieve();
        expect(wrapper.vm.loading).toBe(true);
    })
    //save changes
    it("save all changes", () => {
        const wrapper = getMountedComponent(employmentType, { savingChanges: true });
        wrapper.vm.create();
        expect(wrapper.vm.savingChanges).toBe(false);
    })
    //headers
    it("contains name and assignment", () => {
        expect(getMountedComponent(employmentType).vm.headers).toEqual([
            { text: "Employment Type", value: "EmploymentType" },
          {  text: "Actions", value: "actions", sortable: false },
        ]);
    });

    //editedItem
    it('check editedItem object', () => {
        const wrapper = getMountedComponent(employmentType, { editedItem: {} });

        const editedItem = {
            ID:null,
          EmploymentType: null,
          CreatedDate:null,
          ModifiedDate: null,
           ModifiedBy: null,
        }
        expect(typeof wrapper.vm.editedItem).toBe('object');
        expect(wrapper.vm.editedItem).toEqual(editedItem);
    });

    //defaultItem
    it('check defaultItem object', () => {
        const wrapper = getMountedComponent(employmentType, { editedItem: {} });

        const defaultItem = {
            ID:null,
          EmploymentType: null,
          CreatedDate:null,
          ModifiedDate: null,
           ModifiedBy: null,
        };
        expect(typeof wrapper.vm.defaultItem).toBe('object');
        expect(wrapper.vm.defaultItem).toEqual(defaultItem);
    });

    //employmentType declaration
    it('employmentType declaration', () => {
        expect(employmentTypeDatas.vm.employmentType).toEqual([]);
    });
    //edited Index
    it('editedIndex value', () => {
        expect(employmentTypeDatas.vm.editedIndex).toEqual(-1);
    });
    //input config
    it("input config", () => {
        expect(JSON.stringify(getMountedComponent(employmentType, {}).vm.inputConfig)).toBe(
            JSON.stringify([ {
                inputLabel: "Employment Type",
                inputType: "text",
                inputModel: "EmploymentType",
                rules: [(v) => Validation.required(v, "Employment Type")],
              },
            ])
        );
    });


});

describe("test employmentType method", () => {
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
        wrapper = shallowMount(employmentType, { user_session, user_details, localVue });
    })

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
    let wrapper;
    Vue.use(VueRouter);
    Vue.use(Vuetify)
    const routes = [{
        path: "/",
        component: employmentType,
    }, ];

    const router = new VueRouter({
        routes,
    });

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount(employmentType, {
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
