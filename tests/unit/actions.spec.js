import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import visaSetup from "../../src/store/modules/human-resources/visaSetup";
// import Actions from '../../../src/components/Actions'
const visa = require("../../src/store/modules/human-resources/visaSetup");
const bank = require("../../src/store/modules/human-resources/bank");
import bankUI from "../../src/views/human-resources/setups/Bank";
import {EventBus} from "../../src/bus/bus"
// const CRUD = require("../../src/utils/CRUD")
// const decryption = require("../../src/utils/Decryption")
// const encryption = require("../../src/utils/Encryption")
// const sampleData = {
//     BankName: "CBD",
//     BankCode: "CBD"
// }
const validation = require("../../src/utils/Validation");
const axios = require("axios");
const request = require("supertest");
jest.mock("axios");
const gender = require("../../src/store/modules/human-resources/gender");
const localVue = createLocalVue();
localVue.use(Vuex);

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
describe("create state successfully", () => {
  it("returns true for state of bank", () => {
    console.log(EventBus)
    expect(bank.default.state).toBeTruthy();
    expect(bank.default.state).not.toBeNull();
    console.log(bank.default.state);
  });
});
describe("Actions should not throw error", () => {
  // const vm = this
  it("should return true to get All data", async () => {
    expect(visa.default.actions.getAllVisaSetup).toBeTruthy;
  });

  describe("when API call is successful", () => {
    it("should return gender list", async () => {
      const genders = [
        { id: 1, gender: "Male" },
        { id: 2, gender: "Female" },
      ];
      axios.get.mockResolvedValueOnce(genders);
      const result = await gender.default.actions.getGenders();

      console.log(result);

      expect(axios.get).toHaveBeenCalledWith("getAllSex");
      expect(result).toEqual(genders);
      expect(result && typeof result === "object").toBe(true);
    });
  });
});
describe("when API call fails", () => {
  it("should return empty users list", async () => {
    const message = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(message));

    const result = await gender.default.actions.getGenders();

    expect(axios.get).toHaveBeenCalledWith("getAllSex");
    expect(result === undefined).toBe(true);
  });
});

describe("generate data API call", () => {
  it("should add two number", () => {
    expect(2 + 2).toBe(4);
  });
  it("should get all the banks without error", async () => {
    expect.assertions(1);
    try {
      const data0 = await bank.default.actions.getSample();
      const data = await bank.default.actions.getBanks();
      expect(data).toBeUndefined();
      expect(typeof data0).toBe(object);
    } catch (error) {
      expect(error.message).toBe("Cannot read property 'then' of undefined");
    }
  });
  {
  }

  const genders = [
    { id: 3, gender: "Lesbian" },
    { id: 4, gender: "Gay" },
  ];

  let mock;
  beforeEach(() => {
    mock = jest.spyOn(axios, "post");
  });
  afterEach(() => {
    mock.mockRestore();
  });
  it("should add gender in mock post api call", async () => {
    const dispatch = jest.fn();
    mock.mockResolvedValue();

    await gender.default.actions.addGender(dispatch, genders);
    expect(mock).toHaveBeenCalledWith("insertSex", genders);
  });
});

describe("test for Bank UI", () => {
  it("should access the components", () => {
    expect(bankUI).not.toBeFalsy();
  });
});

test("mock functions", async () => {
  const mockFunction = jest.fn();
  console.log(mockFunction.mock);
});

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

//test for Validation.js
describe("tests for validation", () => {
  console.log(validation.default);
  it("should be a valid email", () => {
    expect(validation.default.email).not.toBeNull();
    const data = validation.default.email("eleasar@virtuascript.com", "Bank");
    expect(data).toBe(true);
  });

  it("should be a required field", () => {
    expect(validation.default.required).not.toBeNull();
    expect(validation.default.required("BDO", "Bank Name")).toBe(true);
  });

  it("should have the minimum characters in a field", () => {
    expect(validation.default.min).not.toBeNull();
    expect(validation.default.min("BDO", "Bank Name", 1)).toBe(true);
  });

  it("should be a valid date", () => {
    expect(validation.default.date).not.toBeNull();
    expect(validation.default.date("08/01/2021", "Start Date")).toBe(true);
  });

  it("should be a valid integer", () => {
    expect(validation.default.integer).not.toBeNull();
    expect(validation.default.integer(21, "Price")).toBe(true);
  });
});

describe("rendering the vue", () => {
  let openForm = false;
  let editedItem = [];
  let editedIndex = 1;
  let edit = false;
  let savingChanges =false;
  let banks = [
    {
      ID: 1,
      BankName: "test",
      BankCode: "test",
      ModifiedBy: "",
    },
    {
      ID: 2,
      BankName: "test2",
      BankCode: "test2",
      ModifiedBy: "",
    },
  ];
  let props = {
    index: 1,
    item: {
      ID: banks.length+1,
      BankCode: "CDO",
      BankName: "Cagayan de Oro",
      ModifiedBy: "eleasar@virtuascript.com",
    },
  };
 
  const wrapper = shallowMount(bankUI, {
    propsData: {
      openForm: true,
      editedItem: [],
      editedIndex: 0,
      data: {
        BankCode: "LBC",
        BankName: "LBC",
        ModifiedBy: "eleasar@virtuascript.com",
      },
    },
  });

  it("renders the vue component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <v-app openform="true" editeditem="" editedindex="0" data="[object Object]">
        <b-container>
          <alert-stub message="" response="" id="alert" style="display: none;"></alert-stub>
          <breadcrumb-stub></breadcrumb-stub>
          <defaultdatatable-stub headers="[object Object],[object Object],[object Object]" items="" editeditem="[object Object]" defaultitem="[object Object]"></defaultdatatable-stub>
        </b-container>
      </v-app>
    `);
  });

  it("has a container", () => {
    expect(wrapper.contains("b-container")).toBe(true);
  });

  it("should check the index before inserting or updating", async () => {
    const data = jest.spyOn(wrapper.vm, "retrieveData");
    await wrapper.vm.retrieveData();
    console.log(data.mock.instances);
    console.log(data.mock.calls);
    console.log(data.mock.results);
    expect(data).toHaveBeenCalledTimes(1);
    expect(typeof data).toBe("function");
  });
  it("should close the form and set the items and index", () => {
    wrapper.vm.close();
    expect(wrapper.vm.savingChanges).toBe(false);
    expect(wrapper.vm.openForm).toBe(false);
    expect(wrapper.vm.editedItem).toMatchObject({
      BankCode: null,
      BankName: null,
      CreatedDate: null,
      ID: null,
      ModifiedBy: null,
      ModifiedDate: null,
    });
    expect(wrapper.vm.editedIndex).toBe(-1);
  });

  describe("should emit events", () => {
    it("emits event to add new item", async () => {
      wrapper.vm.$emit("addNewItem", [
        { edit: props.index !== -1 ? (edit = true) : (edit = false) },
        {
          ID:banks.length+1,
          BankCode: "BDO",
          BankName: "Banco de Oro",
          ModifiedBy: "eleasar@virtuascript.com",
        },
        { index: props.index },
        { openForm: openForm },
      ]);
      await wrapper.vm.$nextTick();
      console.log(wrapper.emitted().addNewItem[0][0][1]);
      expect(wrapper.emitted().addNewItem).toMatchObject([
        [
          [
            { edit: true },
            {
              ID: 3,
              BankCode: "BDO",
              BankName: "Banco de Oro",
              ModifiedBy: "eleasar@virtuascript.com",
            },
            { index: 1 },
            { openForm: false },
          ],
        ],
      ]);

      banks.push(wrapper.emitted().addNewItem[0][0][1]);
      banks.forEach((bank) => {
        console.log(bank);
      });
      expect(banks).toMatchObject([
        {
          ID: 1,
          BankCode: "test",
          BankName: "test",
          ModifiedBy: "",
        },
        {
          ID: 2,
          BankCode: "test2",
          BankName: "test2",
          ModifiedBy: "",
        },
        {
          ID: 3,
          BankCode: "BDO",
          BankName: "Banco de Oro",
          ModifiedBy: "eleasar@virtuascript.com",
        },
      ]);
    });

    it("emits event to save new item", async () => {
      console.log(editedIndex);
      wrapper.vm.$emit(
        "saveItem",
        editedIndex > -1
          ? (props.item = {
              ID: editedIndex+1,
              BankCode: "BSP",
              BankName: "Bangko Sentral ng Pilipinas",
              ModifiedBy: "junmar@virtuascript.com",
            })
          : props.item
      );
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().saveItem).toMatchObject([
        [
          {
            ID: 2,
            BankCode: "BSP",
            BankName: "Bangko Sentral ng Pilipinas",
            ModifiedBy: "junmar@virtuascript.com",
          },
        ],
      ]);
      const data = wrapper.emitted().saveItem[0][0];
      function saveItem(data) {
        if (editedIndex > -1) {
          banks[editedIndex] = data;
          
        } else {
          banks.push(data);
        }
      }
      saveItem(data);

      banks.forEach((bank) => {
        console.log(bank);
      });

      expect(banks).toMatchObject([
        {
          ID: 1,
          BankCode: "test",
          BankName: "test",
          ModifiedBy: "",
        },
        {
          ID: 2,
          BankCode: "BSP",
          BankName: "Bangko Sentral ng Pilipinas",
          ModifiedBy: "junmar@virtuascript.com",
        },
        {
          ID: 3,
          BankCode: "BDO",
          BankName: "Banco de Oro",
          ModifiedBy: "eleasar@virtuascript.com",
        },
      ]);
      // saveItem(data);
      // banks.forEach((bank) => {
      //   console.log(bank);
      // });
      // expect(banks).toMatchObject([
      //   {
      //     ID: 1,
      //     BankCode: "test",
      //     BankName: "test",
      //     ModifiedBy: "",
      //   },
      //   {
      //     ID: 2,
      //     BankCode: "BSP",
      //     BankName: "Bangko Sentral ng Pilipinas",
      //     ModifiedBy: "junmar@virtuascript.com",
      //   },
      //   {
      //     ID: 3,
      //     BankCode: "BDO",
      //     BankName: "Banco de Oro",
      //     ModifiedBy: "eleasar@virtuascript.com",
      //   },
      //   {
      //     ID: 4,
      //     BankCode: "BSP",
      //     BankName: "Bangko Sentral ng Pilipinas",
      //     ModifiedBy: "junmar@virtuascript.com",
      //   },
      // ]);
    });

    it('emit event to retrieve data', async () =>{
      wrapper.vm.$emit("initializeData", 
        banks
      )
      await wrapper.vm.$nextTick();
      console.log(wrapper.emitted().initializeData[0])
      expect(wrapper.emitted().initializeData[0]).toMatchObject([[
        {
          ID: 1,
          BankCode: "test",
          BankName: "test",
          ModifiedBy: "",
        },
        {
          ID: 2,
          BankCode: "BSP",
          BankName: "Bangko Sentral ng Pilipinas",
          ModifiedBy: "junmar@virtuascript.com",
        },
        {
          ID: 3,
          BankCode: "BDO",
          BankName: "Banco de Oro",
          ModifiedBy: "eleasar@virtuascript.com",
        },
        
      ]])
    })

    it('emits event to delete item', async () =>{
      wrapper.vm.$emit("deleteItem", [
        {id: 1},
        {
          BankCode: "BDO",
          BankName: "Banco de Oro",
          ModifiedBy: "eleasar@virtuascript.com",
        },
      ]);
      await wrapper.vm.$nextTick();
      const itemToBeDeleted = wrapper.emitted().deleteItem[0][0][0];
      const ID = wrapper.emitted().deleteItem[0][0][1];
      console.log(wrapper.emitted().deleteItem[0][0][1])
      const index = banks.indexOf(wrapper.emitted().deleteItem[0][0][1])
      console.log(index)
      banks.splice(index, 1)
      console.log(banks.length)
    })
  });
});
