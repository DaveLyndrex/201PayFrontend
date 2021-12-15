import groupPersonalAccident from '../../../src/views/human-resources/setups/groupPersonalAccident';
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
describe('groupPersonalAccident functions', () => {
    it('data is a function', () => {
        expect(typeof groupPersonalAccident.data).toBe('function');
    });

    it('created is a function', () => {
        expect(typeof groupPersonalAccident.created).toBe('function');
    });
});

//Testing Data Returns
describe("DATA RETURNS", () => {
    let groupPersonalAccidentMounted;
    //this will execute first before all testings.
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, "info").mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    })
    beforeEach(() => {
        groupPersonalAccidentMounted = shallowMount(groupPersonalAccident, {
            // Create a shallow instance of the component
            data: {
                message: "",
                response: "",
                openForm: false,
                loading: true,
                savingChanges: false,
                headers: [],
                groupPersonalAccident: [],
                editedIndex: -1,
                inputConfig: [],
            }
        });
    });

    //message
    it('check if it renders a message', () => {
        // Within mounted.vm, we can access all Vue instance methods
        expect(groupPersonalAccidentMounted.vm.message).toEqual("");
    });
    //response
    it('response is an empty string', () => {
        expect(groupPersonalAccidentMounted.vm.response).toEqual("");
    });
    //form
    it("render data form", () => {
        const wrapper = getMountedComponent(groupPersonalAccident, { openForm: true });
        wrapper.vm.close();
        expect(wrapper.vm.openForm).toBe(false);
    });
    //defaultForm
    it("check if form rendered => default is rendered but not show", () => {
        const wrapper = getMountedComponent(groupPersonalAccident);
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    //defaultTable
    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(groupPersonalAccident);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });
    //loading
    it ("renders loading", () => {
        const wrapper = getMountedComponent(groupPersonalAccident, { loading: false });
        wrapper.vm.retrieve();
        expect(wrapper.vm.loading).toBe(true);
    })
    //save changes
    it("save all changes", () => {
        const wrapper = getMountedComponent(groupPersonalAccident, {savingChanges: true});
        wrapper.vm.create();
        expect(wrapper.vm.savingChanges).toBe(false);
    })
    //headers
    it('contains name and assignment in headers', () => {
        expect(groupPersonalAccidentMounted.vm.headers).toEqual([
            { text: "Level", value: "Level" },
            { text: "Coverage", value: "Amount" },     
            { text: "Actions", value: "actions", sortable: false },
        ])
    });
    //groupPersonalAccident dictionary
    it('groupPersonalAccident declaration', () => {
        expect(groupPersonalAccidentMounted.vm.groupPersonalAccident).toEqual([]);
    });
    //edited Index
    it('editedIndex value', () => {
        expect(groupPersonalAccidentMounted.vm.editedIndex).toEqual(-1);
    });
    //input config
    it('input config', () => {
        expect(JSON.stringify(groupPersonalAccidentMounted.vm.inputConfig)).toStrictEqual(JSON.stringify([{
                inputLabel: "Level",
                inputType: "text",
                inputModel: "Level",
                rules: [(v) => Validation.required(v, "Level")],
              },
              {
                inputLabel: "Coverage",
                inputType: "text",
                inputModel: "Amount",
                rules: [(v) => Validation.required(v, "Coverage")],
              },
        ]))
    })
     //editedItem
     it('check editedItem object', () => {
        const wrapper = getMountedComponent(groupPersonalAccident, { editedItem: {} });

        const editedItem = {
            ID: null,
            Level: null,
            Amount: null,
            CreatedDate: null,
            ModifiedDate: null,
            ModifiedBy: null,
        }
        expect(typeof wrapper.vm.editedItem).toBe('object');
        expect(wrapper.vm.editedItem).toEqual(editedItem);
    });

    //defaultItem
    it('check defaultItem object', () => {
        const wrapper = getMountedComponent(groupPersonalAccident, { editedItem: {} });

        const defaultItem = {
            ID: null,
            Level: null,
            Amount: null,
            CreatedDate: null,
            ModifiedDate: null,
            ModifiedBy: null,
        };
        expect(typeof wrapper.vm.defaultItem).toBe('object');
        expect(wrapper.vm.defaultItem).toEqual(defaultItem);
    });

});
  


//Testing Methods
describe("test groupPersonalAccident method", () => {
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
        wrapper = shallowMount(groupPersonalAccident, { user_session, user_details, localVue });
    })
    //retrieveData function
    test("retrieve data spyOn()", async() => {
        const wrapper = shallowMount(groupPersonalAccident, {});
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
        component: groupPersonalAccident,
    }, ];

    const router = new VueRouter({
        routes,
    });

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(CRUD);
        cmp = mount(groupPersonalAccident, {
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

      //alert
      test("check if alert rendered and contains correct attributes", async() => {
        const wrapper = getMountedComponent(groupPersonalAccident);
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



