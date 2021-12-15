import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import axios from 'axios';
const bank = require("../../../src/store/modules/human-resources/bank")
jest.mock("axios");

const fakeData = [
    { id: 1, BankName: "test1", BankCode: "test1" },
    { id: 2, BankName: "test2", BankCode: "test2"},
    { id: 3, BankName: "test3", BankCode: "test3" }
];
const state = { banks: [] };
describe('add',()=>{
    it("should add two number",()=>{
        expect(2 + 2).toBe(4);
      })
})

describe('bank.js should work just fine',()=>{
    beforeEach(()=> {
        jest.resetAllMocks();
    })
    afterAll(() => {
        jest.resetAllMocks();
    });

    test('should set mutations', ()=>{
    
        const data = JSON.stringify({ data: fakeData });
        console.log(data)
        bank.default.mutations.setBanks(state, data);
    
        const expectedResult = JSON.parse(data).data;
        console.log(expectedResult)
        expect(state.banks).toStrictEqual(expectedResult);
    })

    it('should  get data from api', async ()=>{
        try{
            axios.get.mockResolvedValue(fakeData);
            const data = await bank.default.actions.getBanks();
            expect(axios.get).toHaveBeenCalledWith("getAllBanks")
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(data).toEqual(fakeData);
        }catch(e){
            expect(e).toBeTruthy()
        }
    })
    describe("evaluates when API call fails", () => {
        it("should return empty users list", async () => {
          const message = "Network Error";
          axios.get.mockRejectedValueOnce(new Error(message));
    
          const result = await bank.default.actions.getBanks();
          expect(axios.get).toHaveBeenCalledWith("getAllBanks");
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(result === undefined).toBe(true);
        });
      });

      it('should add new data for banks', async ()=>{
        const context = {
            dispatch: jest.fn(),
            
        };
        const dataToBeAdded = { id: 17, BankCode: "Banco de Oro", BankName: "BDO" }
        axios.post.mockResolvedValue(dataToBeAdded);
        const result = await bank.default.actions.createBanks(context, dataToBeAdded);
        state.banks.push(result)
        expect(state.banks).toEqual(
            expect.arrayContaining([
                expect.objectContaining(result)
            ])
        );
        expect(axios.post).toHaveBeenCalledTimes(1);
      })

      it('should update data in banks', async ()=>{
        const fake = {
            ciphertext: "",
            editedData: { id: 2, BankName: "Central Bank of the Philippines", BankCode: "BSP" },
            index: 1,
        };
        const state = { banks: fakeData };

        axios.post.mockResolvedValue({id: 2, BankName: "Central Bank of the Philippines", BankCode: "BSP" });
        const result = await bank.default.actions.updateBanks({ state },
            fake
        );
        // console.log(result);
        // console.log(state.visaSetup);

        expect(axios.post).toHaveBeenCalledWith("updateBanks",fake.ciphertext);
        expect(state.banks[fake.index]).toEqual(result)
      })

      it('should delete from the banks',async () => {
        const fakeDataToBeDeleted = {
            id: 1,
            item: fakeData.map((data) => 1 == data.id ? data : "").filter((n) => n)[0]

        };
        const state = {
            banks: fakeData
        }
        axios.delete.mockResolvedValue(fakeDataToBeDeleted);
        const result = await bank.default.actions.deleteBanks({ state }, fakeDataToBeDeleted)
        console.log(result)
        state.banks.map(m => expect(result.item).not.toContain(m))
        expect(axios.delete).toHaveBeenCalledWith("deleteBanks/" + fakeDataToBeDeleted.id);
      } )

      it('should be able to access the getters', () => {
          const state={
              banks:fakeData
          }
          const data = jest.spyOn(bank.default.getters, 'allBanks' );
          bank.default.getters.allBanks(state);
          expect(bank.default.getters.allBanks(state)).toEqual(expect.arrayContaining(state.banks));
          expect(data).toHaveBeenCalledTimes(2)
      })
})
