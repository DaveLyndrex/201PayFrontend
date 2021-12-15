const gender = require("../../../src/store/modules/human-resources/gender");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "test3" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(gender.default.mutations.setGender).toBeTruthy();
    });

    it("Set Data: sets state.gender to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { genders: [] };

        gender.default.mutations.setGender(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.genders).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(gender.default.getters.allGenders).toBeTruthy();
    });

    it("returns all gender mock/fake data", () => {
        const dummy = {
            genders: fakeData,
        };
        const actual = gender.default.getters.allGenders(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(dummy.genders);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getGenders", () => {
            expect(gender.default.actions.getGenders).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await gender.default.actions.getGenders();
            expect(axios.get).toHaveBeenCalledWith("getAllSex");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getGenders", () => {
            expect(gender.default.actions.getGenders).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await gender.default.actions.getGenders();

            expect(axios.get).toHaveBeenCalledWith("getAllSex");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock addGender function
    describe("Add Function", () => {

        it("check if exists gender", () => {
            expect(gender.default.actions.addGender).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await gender.default.actions.addGender()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    gender: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "Homosexual" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await gender.default.actions.addGender(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("insertSex", dataToBeAdded);
            expect(context.state.gender).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successfull", () => {

        it("check if exists gender", () => {
            expect(gender.default.actions.updateGender).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await gender.default.actions.updateGender()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated gender", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, gender: "gay" },
                index: 1,
            };

            const state = { genders: fakeData };

            axios.put.mockResolvedValueOnce(dummy);
            await gender.default.actions.updateGender({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.genders, "returned state after execution");

            expect(axios.put).toHaveBeenCalledWith("updateSex", dummy.ciphertext);

        });

    });

    //mock delete function
    describe("when API mock delete is successfull", () => {

        it("check if exists deleteVisaSetup", () => {
            expect(gender.default.actions.deleteGender).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await gender.default.actions.deleteGender()
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
            const state = { genders: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await gender.default.actions.deleteGender({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.genders.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteSex/${dummy.id}`);

        });

    });
});