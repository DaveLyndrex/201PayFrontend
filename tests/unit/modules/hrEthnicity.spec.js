const ethnicity = require("../../../src/store/modules/human-resources/ethnicitySetup");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "test3" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(ethnicity.default.mutations.setEthnicity).toBeTruthy();
    });

    it("Set Data: sets state.ethnicity to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { ethnicity: [] };

        ethnicity.default.mutations.setEthnicity(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.ethnicity).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(ethnicity.default.getters.allEthnicitySetup).toBeTruthy();
    });

    it("returns all ethnicity mock/fake data", () => {
        const dummy = {
            ethnicity: fakeData,
        };
        const actual = ethnicity.default.getters.allEthnicitySetup(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(dummy.ethnicity);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getethnicity", () => {
            expect(ethnicity.default.actions.getEthnicity).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await ethnicity.default.actions.getEthnicity();
            expect(axios.get).toHaveBeenCalledWith("getAllEthnicity");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getethnicity", () => {
            expect(ethnicity.default.actions.getEthnicity).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await ethnicity.default.actions.getEthnicity();

            expect(axios.get).toHaveBeenCalledWith("getAllEthnicity");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock addethnicity function
    describe("Add Function", () => {

        it("check if exists ethnicity", () => {
            expect(ethnicity.default.actions.addEthnicity).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await ethnicity.default.actions.addEthnicity()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    ethnicity: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "Filipino" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await ethnicity.default.actions.addEthnicity(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("addEthnicity", dataToBeAdded);
            expect(context.state.ethnicity).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successfull", () => {

        it("check if exists ethnicity", () => {
            expect(ethnicity.default.actions.updateEthnicity).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await ethnicity.default.actions.updateEthnicity()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated ethnicity", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, ethnicity: "Muslim" },
                index: 1,
            };

            const state = { ethnicity: fakeData };

            axios.put.mockResolvedValueOnce(dummy);
            await ethnicity.default.actions.updateEthnicity({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.ethnicity, "returned state after execution");

            expect(axios.put).toHaveBeenCalledWith("updateEthnicity", dummy.ciphertext);

        });

    });

    //mock delete function
    describe("when API mock delete is successfull", () => {

        it("check if exists deleteVisaSetup", () => {
            expect(ethnicity.default.actions.deleteEthnicity).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await ethnicity.default.actions.deleteEthnicity()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("should return ethnicity list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { ethnicity: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await ethnicity.default.actions.deleteEthnicity({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.ethnicity.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteEthnicity/${dummy.id}`);

        });

    });
});