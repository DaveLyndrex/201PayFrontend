import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import religion from "../../../src/views/human-resources/setups/Religion.vue";
import Validation from "@/utils/Validation";
import VueRouter from "vue-router";
import Vue from "vue";

import vuetify from "@/plugins/vuetify";
import Vuetify from "vuetify/lib";
import VueSweetalert2 from "vue-sweetalert2";

function getMountedComponent(Component, propsData) {
    return shallowMount(Component, { propsData });
}

describe("Religion.vue", () => {
    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "info").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("input config", () => {
        expect(JSON.stringify(getMountedComponent(religion, {}).vm.inputConfig)).toBe(
            JSON.stringify(
            [
                {
                    inputLabel: "Legislation Code",
                    inputType: "text",
                    inputModel: "LegislationCode",
                    rules: [(v) => Validation.required(v, "Legislation Code")],
                },
                {
                    inputLabel: "Religion",
                    inputType: "text",
                    inputModel: "Religion",
                    rules: [(v) => Validation.required(v, "Religion")],
                },
            ])
        );
    });

    it("contains name and assignment", () => {
        expect(getMountedComponent(religion).vm.headers).toEqual([
            { text: "Legislation Code", value: "LegislationCode" },
            { text: "Religion", value: "Religion" },
            { text: "Actions", value: "actions", sortable: false },
        ]);
    });



    it("should find and trigger button cancel", async() => {
        const wrapper = getMountedComponent(religion, {});
        const button = wrapper.find('[data-test=cancel]')

        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Cancel')
        expect(wrapper.vm.index).toBe(1)
        button.trigger('click');
        expect(wrapper.vm.index).toBe(2)
    });

    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(religion);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });

    it("check if form rendered => default is rendered but not show", () => {
        const wrapper = getMountedComponent(religion);
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(religion);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });

});

describe("test religion method", () => {
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
        wrapper = shallowMount(religion, { user_session, user_details, localVue });
    })

    test("retrieve data spyOn()", async() => {
        const wrapper = shallowMount(religion, {});
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
        component: religion,
    }, ];

    const router = new VueRouter({
        routes,
    });

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount(religion, {
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