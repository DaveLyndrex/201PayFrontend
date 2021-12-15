const religion = require("../../../src/store/modules/human-resources/religion");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "test3" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(religion.default.mutations.setReligion).toBeTruthy();
    });

    it("Set Data: sets state.religion to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { religion: [] };

        religion.default.mutations.setReligion(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.religion).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(religion.default.getters.allReligion).toBeTruthy();
    });

    it("returns all religion mock/fake data", () => {
        const dummy = {
            religion: fakeData,
        };
        const actual = religion.default.getters.allReligion(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(dummy.religion);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getreligion", () => {
            expect(religion.default.actions.getReligion).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await religion.default.actions.getReligion();
            expect(axios.get).toHaveBeenCalledWith("getAllReligion");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getReligion", () => {
            expect(religion.default.actions.getReligion).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await religion.default.actions.getReligion();

            expect(axios.get).toHaveBeenCalledWith("getAllReligion");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock addreligion function
    describe("Add Function", () => {

        it("check if exists religion", () => {
            expect(religion.default.actions.addReligion).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await religion.default.actions.addReligion()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    religion: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "Catholic" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await religion.default.actions.addReligion(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("addReligion", dataToBeAdded);
            expect(context.state.religion).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successfull", () => {

        it("check if exists religion", () => {
            expect(religion.default.actions.updateReligion).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await religion.default.actions.updateReligion()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated religion", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, religion: "Hindu" },
                index: 1,
            };

            const state = { religion: fakeData };

            axios.put.mockResolvedValueOnce(dummy);
            await religion.default.actions.updateReligion({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.religion, "returned state after execution");

            expect(axios.put).toHaveBeenCalledWith("updateReligion", dummy.ciphertext);

        });

    });

    //mock delete function
    describe("when API mock delete is successfull", () => {

        it("check if exists deleteVisaSetup", () => {
            expect(religion.default.actions.deleteReligion).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await religion.default.actions.deleteReligion()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("should return religion list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { religion: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await religion.default.actions.deleteReligion({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.religion.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteReligion/${dummy.id}`);

        });

    });
});