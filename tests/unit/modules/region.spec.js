const region = require("../../../src/store/modules/human-resources/region");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "test3" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(region.default.mutations.setRegion).toBeTruthy();
    });

    it("Set Data: sets state.gender to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { region: [] };

        region.default.mutations.setRegion(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.region).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(region.default.getters.allRegion).toBeTruthy();
    });

    it("returns all gender mock/fake data", () => {
        const dummy = {
            region: fakeData,
        };
        const actual = region.default.getters.allRegion(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(dummy.region);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getGenders", () => {
            expect(region.default.actions.getRegion).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await region.default.actions.getRegion();
            expect(axios.get).toHaveBeenCalledWith("getAllRegions");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getGenders", () => {
            expect(region.default.actions.getRegion).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await region.default.actions.getRegion();

            expect(axios.get).toHaveBeenCalledWith("getAllRegions");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock addGender function
    describe("Add Function", () => {

        it("check if exists gender", () => {
            expect(region.default.actions.addRegion).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await region.default.actions.addRegion()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    region: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "CAR" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await region.default.actions.addRegion(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("addRegion", dataToBeAdded);
            expect(context.state.region).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successfull", () => {

        it("check if exists gender", () => {
            expect(region.default.actions.updateRegion).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await region.default.actions.updateRegion()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated gender", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, region: "CALABARZON" },
                index: 1,
            };

            const state = { region: fakeData };

            axios.put.mockResolvedValueOnce(dummy);
            await region.default.actions.updateRegion({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.genders, "returned state after execution");

            expect(axios.put).toHaveBeenCalledWith("updateRegion", dummy.ciphertext);

        });

    });

    //mock delete function
    describe("when API mock delete is successfull", () => {

        it("check if exists deleteVisaSetup", () => {
            expect(region.default.actions.deleteRegion).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await region.default.actions.deleteRegion()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("should return gender list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { region: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await region.default.actions.deleteRegion({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.region.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteRegion/${dummy.id}`);

        });

    });
});