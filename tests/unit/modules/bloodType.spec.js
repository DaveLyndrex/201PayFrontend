const bloodType = require("../../../src/store/modules/human-resources/bloodType");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "test3" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(bloodType.default.mutations.setBloodType).toBeTruthy();
    });

    it("Set Data: sets state.bloodtype to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { bloodtypes: [] };

        bloodType.default.mutations.setBloodType(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.bloodtypes).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(bloodType.default.getters.allBloodTypes).toBeTruthy();
    });

    it("returns all bloodtype mock/fake data", () => {
        const dummy = {
            bloodtypes: fakeData,
        };
        const actual = bloodType.default.getters.allBloodTypes(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(dummy.bloodtypes);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists bloodtype", () => {
            expect(bloodType.default.actions.getBloodTypes).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await bloodType.default.actions.getBloodTypes();
            expect(axios.get).toHaveBeenCalledWith("getBloodList");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists bloodtype", () => {
            expect(bloodType.default.actions.getBloodTypes).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await bloodType.default.actions.getBloodTypes();

            expect(axios.get).toHaveBeenCalledWith("getBloodList");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock addBloodType function
    describe("Add Function", () => {

        it("check if exists bloodType", () => {
            expect(bloodType.default.actions.addBloodType).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await bloodType.default.actions.addBloodType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    bloodtypes: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "AB+" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await bloodType.default.actions.addBloodType(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("addBloodType", dataToBeAdded);
            expect(context.state.bloodtypes).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successfull", () => {

        it("check if exists bloodType", () => {
            expect(bloodType.default.actions.updateBloodType).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await bloodType.default.actions.updateBloodType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated bloodType", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, bloodType: "O" },
                index: 1,
            };

            const state = { bloodtypes: fakeData };

            axios.post.mockResolvedValueOnce(dummy);
            await bloodType.default.actions.updateBloodType({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.bloodtypes, "returned state after execution");

            expect(axios.post).toHaveBeenCalledWith("updateBloodType", dummy.ciphertext);

        });

    });

    //mock delete function
    describe("when API mock delete is successfull", () => {

        it("check if exists deleteVisaSetup", () => {
            expect(bloodType.default.actions.deleteBLoodType).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await bloodType.default.actions.deleteBLoodType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("should return bloodtypes list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { bloodtypes: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await bloodType.default.actions.deleteBLoodType({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.bloodtypes.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteBLoodType/${dummy.id}`);

        });

    });
});