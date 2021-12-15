const customFields = require("../../../src/store/modules/human-resources/employeeCustomFields");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "test3" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(customFields.default.mutations.setCustomFields).toBeTruthy();
    });

    it("Set Data: sets state.customFields to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { customFields: [] };

        customFields.default.mutations.setCustomFields(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.customFields).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(customFields.default.getters.allCustomFieldSetup).toBeTruthy();
    });

    it("returns all customField mock/fake data", () => {
        const dummy = {
            customFields: fakeData,
        };
        const actual = customFields.default.getters.allCustomFieldSetup(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(dummy.customFields);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getcustomField", () => {
            expect(customFields.default.actions.getCustomFields).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await customFields.default.actions.getCustomFields();
            expect(axios.get).toHaveBeenCalledWith("getAllCustomFields");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getcustomField", () => {
            expect(customFields.default.actions.getCustomFields).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await customFields.default.actions.getCustomFields();

            expect(axios.get).toHaveBeenCalledWith("getAllCustomFields");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock addcustomField function
    describe("Add Function", () => {

        it("check if exists customField", () => {
            expect(customFields.default.actions.addCustomFields).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await customFields.default.actions.addCustomFields()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    customFields: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "Regular" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await customFields.default.actions.addCustomFields(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("addCustomField", dataToBeAdded);
            expect(context.state.customFields).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successfull", () => {

        it("check if exists customField", () => {
            expect(customFields.default.actions.updateCustomFields).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await customFields.default.actions.updateCustomFields()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated customField", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, customFields: "Partime" },
                index: 1,
            };

            const state = { customFields: fakeData };

            axios.put.mockResolvedValueOnce(dummy);
            await customFields.default.actions.updateCustomFields({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.customFields, "returned state after execution");

            expect(axios.put).toHaveBeenCalledWith("updateCustomField", dummy.ciphertext);

        });

    });

    //mock delete function
    describe("when API mock delete is successfull", () => {

        it("check if exists deleteVisaSetup", () => {
            expect(customFields.default.actions.deleteCustomFields).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await customFields.default.actions.deleteCustomFields()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("should return customField list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { customFields: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await customFields.default.actions.deleteCustomFields({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.customFields.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteCustomField/${dummy.id}`);

        });

    });
});