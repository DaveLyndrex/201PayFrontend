import jobCode from '../../../src/views/human-resources/setups/jobCode';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Validation from "@/utils/Validation";
import VueRouter from "vue-router";
import Vue from "vue";

import VueSweetalert2 from "vue-sweetalert2";
import vuetify from "@/plugins/vuetify";
import Vuetify from "vuetify/lib";
import CRUD from "@/utils/CRUD";



//mount component
function getMountedComponent(Component, propsData) {
    return shallowMount(Component, { propsData });
}

//Checking functions
describe('JOBCODE FUNCTIONS', () => {
    //check if data is a function
    it('data is a function', () => {
        expect(typeof jobCode.data).toBe('function');
    });
    //check if created is a function
    it('created is a function', () => {
        expect(typeof jobCode.created).toBe('function');
    });
});

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
})

//Testing Data Returns
describe("DATA RETURNED OBJECTS", () => {
    let jobCodeMounted;
    //this will execute first before all testings.
    
    beforeEach(() => {
        jobCodeMounted = shallowMount(jobCode, {
            // Create a shallow instance of the component
            data: {
                message: "",
                response: "",
                openForm: false,
                loading: true,
                savingChanges: false,
                headers: [],
                jobCode: [],
                editedIndex: -1,
                inputConfig: [],
            }
        });
    });

    //message
    it('renders an empty message', () => {
        // Within mounted.vm, we can access all Vue instance methods
        expect(jobCodeMounted.vm.message).toEqual("");
    });
    //response
    it('renders an empty message', () => {
        expect(jobCodeMounted.vm.response).toEqual("");
    });
    //form
    it("renders data form => when add new item triggers", () => {
        const wrapper = getMountedComponent(jobCode, { openForm: true });
        wrapper.vm.close();
        expect(wrapper.vm.openForm).toBe(false);
    });
    
    //loading
    it ("renders loading", () => {
        const wrapper = getMountedComponent(jobCode, { loading: false });
        wrapper.vm.retrieve();
        expect(wrapper.vm.loading).toBe(true);
    })
    //save changes
    it("contains savingChanges => when create function triggers", () => {
        const wrapper = getMountedComponent(jobCode, {savingChanges: true});
        wrapper.vm.create();
        expect(wrapper.vm.savingChanges).toBe(false);
    })
    //headers
    it('contains name and assignment in headers', () => {
        expect(jobCodeMounted.vm.headers).toEqual([
            { text: "Job Code", value: "JobCode" },
            { text: "Actions", value: "actions", sortable: false },
        ])
    });
    //defaultForm
    it("renders default form => default is rendered but not show", () => {
        const wrapper = getMountedComponent(jobCode);
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    //defaultTable
    it("renders default table", () => {
        const wrapper = getMountedComponent(jobCode);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });
    //jobCode dictionary
    it('jobCode declaration', () => {
        expect(jobCodeMounted.vm.jobCode).toEqual([]);
    });
    //edited Index
    it('editedIndex value', () => {
        expect(jobCodeMounted.vm.editedIndex).toEqual(-1);
    });
    //input config
    it('input config', () => {
        expect(JSON.stringify(jobCodeMounted.vm.inputConfig)).toStrictEqual(JSON.stringify([{
            inputLabel: "Job Code",
            inputType: "text",
            inputModel: "JobCode",
            rules: [(v) => Validation.required(v, "Job Code")],
            },
        ]))
    })
     //editedItem
     it('check editedItem object', () => {
        const wrapper = getMountedComponent(jobCode, { editedItem: {} });

        const editedItem = {
            ID: null,
            JobCode: null,
        }
        expect(typeof wrapper.vm.editedItem).toBe('object');
        expect(wrapper.vm.editedItem).toEqual(editedItem);
    });

    //defaultItem
    it('check defaultItem object', () => {
        const wrapper = getMountedComponent(jobCode, { defaultItem: {} });

        const defaultItem = {
            ID: null,
            JobCode: null,
        };
        expect(typeof wrapper.vm.defaultItem).toBe('object');
        expect(wrapper.vm.defaultItem).toEqual(defaultItem);
    });

});
  


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Testing Methods
describe("test jobCode method", () => {
    const fakeData = { EmpID: null, ModifiedBy: null }
    let fakeUserDetails
    let user_session
    let user_details
    let wrapper

    beforeEach(() => {
        const localVue = createLocalVue();
        //user Details
        localVue.use(VueSweetalert2);
        fakeUserDetails = { Email: 'test@gmail.com' }
        user_session = sessionStorage.setItem("user_session", JSON.stringify({ empId: 1 }));
        user_details = localStorage.setItem("user_details", JSON.stringify({ data: fakeUserDetails }));
        wrapper = shallowMount(jobCode, { user_session, user_details, localVue });
    })
    //retrieveData function
    test("retrieve data spyOn()", async() => {
        const wrapper = shallowMount(jobCode, {});
        const retrieveData = jest.spyOn(wrapper.vm, "retrieveData");
        await wrapper.vm.retrieveData();
        expect(typeof retrieveData).toEqual("function");
        expect(retrieveData).toHaveBeenCalled();
        expect(retrieveData).toHaveBeenCalledTimes(1);
    });
    //createNewItem function
    test("create data spyOn()", async() => {
        const createNewItem = jest.spyOn(wrapper.vm, "createNewItem");
        await wrapper.vm.createNewItem(fakeData);
        expect(typeof createNewItem).toEqual("function");
        expect(createNewItem).toHaveBeenCalled();
        expect(createNewItem).toHaveBeenCalledTimes(1);
    });
    //updateItem function
    test("update data spyOn()", async() => {
        const updateItem = jest.spyOn(wrapper.vm, "updateItem");
        await wrapper.vm.updateItem(fakeData);
        expect(typeof updateItem).toEqual("function");
        expect(updateItem).toHaveBeenCalled();
        expect(updateItem).toHaveBeenCalledTimes(1);
    });

    //deleteItem function
    test("delete data spyOn()", async() => {
        const deleteItem = jest.spyOn(wrapper.vm, "deleteItem");
        await wrapper.vm.deleteItem(fakeData);
        expect(typeof deleteItem).toEqual("function");
        expect(deleteItem).toHaveBeenCalled();
        expect(deleteItem).toHaveBeenCalledTimes(1);
    });
});


//Testing alert
describe("test alert and button child component", () => {
    let cmp;
    Vue.use(VueRouter);
    Vue.use(Vuetify)
    const routes = [{
        path: "/",
        component: jobCode,
    }, ];

    const router = new VueRouter({
        routes,
    });

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(CRUD);
        cmp = mount(jobCode, {
            data() {
                return {
                    message: "SuccessFully Test",
                };
            },
            router,
            localVue,
            vuetify,
            CRUD,

        });
    });

    it("should find and trigger button", async() => {
        const button = cmp.find('[data-test=cancel]')

        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Cancel')
            // button.vm.$emit('click')
        expect(cmp.vm.index).toBe(1)
        button.trigger('click');
        await cmp.vm.$nextTick()
        expect(cmp.vm.index).toBe(2)

    });

    it("should find and trigger button save", async() => {
        const wrapper = getMountedComponent(jobCode, {});
        const saveItem = jest.spyOn(wrapper.vm, 'saveItem')
        const button = wrapper.find('[data-test=save]')
        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Save')
        button.trigger('click');
        await wrapper.vm.$nextTick();
        expect(saveItem).toHaveBeenCalled()
    });

      //alert
      test("check if alert rendered and contains correct attributes", async() => {
        const wrapper = getMountedComponent(jobCode);
        expect(wrapper.find("#alert").attributes().style).toBe("display: none;");
        expect(wrapper.find("#alert").isVisible()).toBe(false);
        expect(wrapper.find("#alert").attributes()).toStrictEqual({
            id: "alert",
            message: "",
            response: "",
            style: "display: none;",
        });
    });


    it('has received "SuccessFully Test" as the message property', () => {
        expect(cmp.vm.message).toEqual("SuccessFully Test");
    });

    it("has the expected html structure", () => {
        expect(cmp.element).toMatchSnapshot();
    });
});



