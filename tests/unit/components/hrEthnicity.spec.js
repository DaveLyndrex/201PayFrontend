import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import ethnicity from "../../../src/views/human-resources/setups/HrEthnicity.vue";
import Validation from "@/utils/Validation";
import VueRouter from "vue-router";
import Vue from "vue";

import vuetify from "@/plugins/vuetify";
import Vuetify from "vuetify/lib";
import VueSweetalert2 from "vue-sweetalert2";

function getMountedComponent(Component, propsData) {
    return shallowMount(Component, { propsData });
}

describe("HrEthnicity.vue", () => {
    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "info").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("input config", () => {
        expect(JSON.stringify(getMountedComponent(ethnicity, {}).vm.inputConfig)).toBe(
            JSON.stringify(
            [
                {
                    inputLabel: "Legislation Code",
                    inputType: "text",
                    inputModel: "LegislationCode",
                    rules: [(v) => Validation.required(v, "Sex")],
                },
                {
                    inputLabel: "Declare Person Number",
                    inputType: "text",
                    inputModel: "DeclarePersonNumber",
                    rules: [(v) => Validation.required(v, "Declare Person Number")],
                },
                {
                    inputLabel: "Ethnicity",
                    inputType: "text",
                    inputModel: "Ethnicity",
                    rules: [(v) => Validation.required(v, "Ethnicity")],
                },
            ])
        );
    });

    it("contains name and assignment", () => {
        expect(getMountedComponent(ethnicity).vm.headers).toEqual([
            { text: "Legislation Code", value: "LegislationCode" },
            { text: "Declare Person Number", value: "DeclarePersonNumber" },
            { text: "Ethnicity", value: "Ethnicity" },
            { text: "Actions", value: "actions", sortable: false },
        ]);
    });



    it("should find and trigger button cancel", async() => {
        const wrapper = getMountedComponent(ethnicity, {});
        const button = wrapper.find('[data-test=cancel]')

        expect(button.exists()).toBeTruthy()
        expect(button.text()).toContain('Cancel')
        expect(wrapper.vm.index).toBe(1)
        button.trigger('click');
        expect(wrapper.vm.index).toBe(2)
    });

    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(ethnicity);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });

    it("check if form rendered => default is rendered but not show", () => {
        const wrapper = getMountedComponent(ethnicity);
        expect(wrapper.find(".default-form").exists()).toBe(false);
    });
    it("check if data table rendered", () => {
        const wrapper = getMountedComponent(ethnicity);
        expect(wrapper.find(".default-table").exists()).toBe(true);
    });

});

describe("test ethnicity method", () => {
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
        wrapper = shallowMount(ethnicity, { user_session, user_details, localVue });
    })

    test("retrieve data spyOn()", async() => {
        const wrapper = shallowMount(ethnicity, {});
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
        component: ethnicity,
    }, ];

    const router = new VueRouter({
        routes,
    });

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount(ethnicity, {
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