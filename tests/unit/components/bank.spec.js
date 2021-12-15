import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import bankUI from "../../../src/views/human-resources/setups/Bank";
beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
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
      expect(wrapper).toBeTruthy();
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
      expect(wrapper.find("b-container")).toEqual({"selector": "b-container"});
    });
  
    it("should check the index before inserting or updating", async () => {
      const data = jest.spyOn(wrapper.vm, "retrieveData");
      await wrapper.vm.retrieveData();
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
        // console.log(wrapper.emitted().addNewItem[0][0][1]);
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
        // console.log(editedIndex);
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
        // console.log(wrapper.emitted().initializeData[0])
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
          
          {
            ID: 3,
            BankCode: "BDO",
            BankName: "Banco de Oro",
            ModifiedBy: "eleasar@virtuascript.com",
          },
        ]);
        await wrapper.vm.$nextTick();
        const itemToBeDeleted = wrapper.emitted().deleteItem[0][0][0];
        const ID = wrapper.emitted().deleteItem[0][0][1];
        // console.log(wrapper.emitted().deleteItem[0][0][1])
        const index = banks.indexOf(wrapper.emitted().deleteItem[0][0][1])
        expect()
        banks.forEach((bank) => {
            console.log(bank);
          });
        banks.splice(index, 1)
        console.log(banks.length)
        banks.forEach((bank) => {
            console.log(bank);
          });
      })
    });
  });