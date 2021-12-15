import addressType from '../../../src/views/human-resources/setups/AddressType';
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
describe('ADDRESSTYPE FUNCTIONS', () => {
    it('data is a function', () => {
        expect(typeof addressType.data).toBe('function');
    });

    it('created is a function', () => {
        expect(typeof addressType.created).toBe('function');
    });
});

//Testing Data Returns
describe("DATA RETURNS", () => {
    let addressTypeMounted;
    //this will execute first before all testings.
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, "info").mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    })
    beforeEach(() => {
        addressTypeMounted = shallowMount(addressType, {
            // Create a shallow instance of the component
            data: {
                message: "",
                response: "",
                openForm: false,
                loading: true,
                savingChanges: false,
                headers: [],
                addressType: [],
                editedIndex: -1,
                inputConfig: [],
            }
        });
    });

    //message
    it('check if it renders a message', () => {
        // Within mounted.vm, we can access all Vue instance methods
        expect(addressTypeMounted.vm.message).toEqual("");
    });
    //response
    it('response is an empty string', () => {
        expect(addressTypeMounted.vm.response).toEqual("");
    });
    //form
    it("render data form", () => {
        const wrapper = getMountedComponent(addressType, { openForm: true });
        wrapper.vm.close();
        expect(wrapper.vm.openForm).toBe(false);
    });
    //defaultForm
    it("check if form rendered => default is rendered but not show", () => {
        const wrapper = getMountedComponent(addressType);
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    //defaultTable
    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(addressType);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });
    //loading
    it ("renders loading", () => {
        const wrapper = getMountedComponent(addressType, { loading: false });
        wrapper.vm.retrieve();
        expect(wrapper.vm.loading).toBe(true);
    })
    //save changes
    it("save all changes", () => {
        const wrapper = getMountedComponent(addressType, {savingChanges: true});
        wrapper.vm.create();
        expect(wrapper.vm.savingChanges).toBe(false);
    })
    //headers
    it('contains name and assignment in headers', () => {
        expect(addressTypeMounted.vm.headers).toEqual([
            { text: "Address Type", value: "Description" },
            { text: "Actions", value: "actions", sortable: false },
        ])
    });
    //addressType dictionary
    it('addressType declaration', () => {
        expect(addressTypeMounted.vm.addressType).toEqual([]);
    });
    //edited Index
    it('editedIndex value', () => {
        expect(addressTypeMounted.vm.editedIndex).toEqual(-1);
    });
    //input config
    it('input config', () => {
        expect(JSON.stringify(addressTypeMounted.vm.inputConfig)).toStrictEqual(JSON.stringify([{
                inputLabel: "Address Type",
                inputType: "text",
                inputModel: "Description",
                rules: [(v) => Validation.required(v, "Address Type")],
            },
        ]))
    })

    //editedItem
    it('check editedItem object', () => {
        const wrapper = getMountedComponent(addressType, { editedItem: {} });

        const editedItem = {
            ID: null,
            Description: null,
            CreatedDate: null,
            ModifiedDate: null,
            ModifiedBy: null,
        }
        expect(typeof wrapper.vm.editedItem).toBe('object');
        expect(wrapper.vm.editedItem).toEqual(editedItem);
    });

    //defaultItem
    it('check defaultItem object', () => {
        const wrapper = getMountedComponent(addressType, { editedItem: {} });

        const defaultItem = {
            ID: null,
            Description: null,
            CreatedDate: null,
            ModifiedDate: null,
            ModifiedBy: null,
        };
        expect(typeof wrapper.vm.defaultItem).toBe('object');
        expect(wrapper.vm.defaultItem).toEqual(defaultItem);
    });
});
  


//Testing Methods
describe("test addressType method", () => {
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
        wrapper = shallowMount(addressType, { user_session, user_details, localVue });
    })
    //retrieveData function
    test("retrieve data spyOn()", async() => {
        const wrapper = shallowMount(addressType, {});
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


//Testing Alert
describe("test alert and button child component", () => {
    let cmp;
    Vue.use(VueRouter);
    Vue.use(Vuetify)
    const routes = [{
        path: "/",
        component: addressType,
    }, ];

    const router = new VueRouter({
        routes,
    });

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(CRUD);
        cmp = mount(addressType, {
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
        const wrapper = getMountedComponent(addressType);
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

    const componentTest = {
        template: `
    <template v-slot:actionBtns>
    <v-btn class="mb-2 px-8 font-color" color="whitesmoke" @click="close">
      Cancel
    </v-btn>
    <v-btn
      :loading="savingChanges"
      class="mb-2 px-8"
      dark
      color="blue"
      @click="saveItem(editedItem)"
    >
      Save
    </v-btn>
  </template>
    `,

    }
    console.log(componentTest);
    // test('button contains cancel and save button', async() => {
    //     Vue.use(VueRouter);
    //     const routes = [{
    //         path: "/",
    //         component: addressType,
    //     }, ];

    //     const router = new VueRouter({
    //         routes,
    //     });
    //     const localVue = new createLocalVue()
    //     const wrapper = mount(addressType, { localVue, router })
    //     const cancel = wrapper.findAll('v-btn').at(0)
    //     const save = wrapper.findAll('v-btn').at(1)

    //     expect(cancel.text()).toContain('Cancel')
    //     expect(save.text()).toContain('Save')

    //     // const close=jest.spyOn(wrapper.vm,'close')
    //     expect(wrapper.vm.$data.index).toBe(1)
    //     await cancel.trigger('click')
    //         // expect(wrapper.vm.$data.index).toBe(2)

    //     // expect(button.text()).toContain('Cancel')
    // })


    //   expect(button.text()).toContain('Cancel');
    // })
});

