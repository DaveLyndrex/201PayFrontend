const groupPersonalAccident = require("../../../src/store/modules/human-resources/groupPersonalAccident");
const retrieveAll = require("../../../src/store/modules/basicInfo");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, Level: "1", Amount: "1000" },
    { id: 2, Level: "2", Amount: "2000" },
    { id: 3, Level: "4", Amount: "4000" },
];

//test mutation
describe("mutations", () => {
    it("check if exists", () => {
        expect(groupPersonalAccident.default.mutations.setGroupPersonalAccident).toBeTruthy();
    });

    it("Set Data: sets state.groupPersonalAccident to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { GroupPersonalAccidentSetup: [] };

        groupPersonalAccident.default.mutations.setGroupPersonalAccident(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.GroupPersonalAccidentSetup).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(groupPersonalAccident.default.getters.allGroupPersonalAccidentGetters).toBeTruthy();
    });

    it("returns all allGroupPersonalAccidentGetters mock/fake data", () => {
        const state = {
            GroupPersonalAccidentSetup: fakeData,
        };
        const actual = groupPersonalAccident.default.getters.allGroupPersonalAccidentGetters(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists retrieveAllGPASMasterData", () => {
            expect(retrieveAll.default.actions.retrieveAllGPASMasterData).toBeTruthy();
        });


        it("calls axios to fetch data", async () => {
            axios.get.mockResolvedValue(fakeData);
            const data = await retrieveAll.default.actions.retrieveAllGPASMasterData();
            expect(axios.get).toHaveBeenCalledWith("getAllGPAS");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists retrieveAllGPASMasterData", () => {
            expect(retrieveAll.default.actions.retrieveAllGPASMasterData).toBeTruthy();
        });


        it("should return empty users list", async () => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await retrieveAll.default.actions.retrieveAllGPASMasterData();

            expect(axios.get).toHaveBeenCalledWith("getAllGPAS");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock createGroupPersonalAccident function
    describe("Add Function", () => {

        it("check if exists groupPersonalAccident", () => {
            expect(groupPersonalAccident.default.actions.createGroupPersonalAccident).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async () => {

            try {
                await groupPersonalAccident.default.actions.createGroupPersonalAccident()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async () => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    groupPersonalAccident: fakeData,
                },
            };
            const dataToBeAdded = { id: 3, Level: "3", Amount: "3000" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await groupPersonalAccident.default.actions.createGroupPersonalAccident(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("createGroupPersonalAccident", dataToBeAdded);
            expect(context.state.groupPersonalAccident).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successful", () => {

        it("check if exists groupPersonalAccident", () => {
            expect(groupPersonalAccident.default.actions.updateGroupPersonalAccident).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async () => {

            try {
                await groupPersonalAccident.default.actions.updateGroupPersonalAccident()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated groupPersonalAccident", async () => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, Level: "10", Amount: "5000" },
                index: 1,
            };

            const state = { groupPersonalAccident: fakeData };

            axios.put.mockResolvedValueOnce(dummy);
            await groupPersonalAccident.default.actions.updateGroupPersonalAccident({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.GroupPersonalAccidentSetup, "returned state after execution");

            expect(axios.put).toHaveBeenCalledWith("updateGroupPersonalAccident", dummy.ciphertext);
        });
    });

    //mock delete function
    describe("when API mock delete is successful", () => {

        it("check if exists deleteGroupPersonalAccident", () => {
            expect(groupPersonalAccident.default.actions.deleteGroupPersonalAccident).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async () => {

            try {
                await groupPersonalAccident.default.actions.deleteGroupPersonalAccident()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });
        it("should return groupPersonalAccident list without the deleted data", async () => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { groupPersonalAccident: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await groupPersonalAccident.default.actions.deleteGroupPersonalAccident({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.groupPersonalAccident.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteGroupPersonalAccident/${dummy.id}`);

        });

    });
});

