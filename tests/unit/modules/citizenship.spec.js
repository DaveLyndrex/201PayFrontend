const citizenship = require("../../../src/store/modules/human-resources/citizenship");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, LegislationCode: "string", CitizenshipStatus: "string" },
    { id: 2, LegislationCode: "string", CitizenshipStatus: "string" },
    { id: 3, LegislationCode: "string", CitizenshipStatus: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(citizenship.default.mutations.setCitizenshipSetup).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { citizenshipSetup: [] };

        citizenship.default.mutations.setCitizenshipSetup(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.citizenshipSetup).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(citizenship.default.getters.allCitizenshipSetup).toBeTruthy();
    });

    it("returns all citizenship mock/fake data", () => {
        const state = {
            citizenshipSetup: fakeData,
        };
        const actual = citizenship.default.getters.allCitizenshipSetup(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getCitizenshipSetup", () => {
            expect(citizenship.default.actions.getCitizenshipSetup).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await citizenship.default.actions.getCitizenshipSetup();
            expect(axios.get).toHaveBeenCalledWith("getAllCitizenshipStatus");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists citizenshipSetupAction", () => {
            expect(citizenship.default.actions.citizenshipSetupAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await citizenship.default.actions.citizenshipSetupAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    citizenshipSetup: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, LegislationCode: "test add", CitizenshipStatus: "string" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await citizenship.default.actions.citizenshipSetupAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.citizenshipSetup).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateCitizenshipSetup", () => {
            expect(citizenship.default.actions.updateCitizenshipSetup).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await citizenship.default.actions.updateCitizenshipSetup()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, LegislationCode: "update citizenship", CitizenshipStatus: "string" },
                index: 1,
            };
            const state = { citizenshipSetup: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await citizenship.default.actions.updateCitizenshipSetup({ state }, fake);
            // console.log(result);
            // console.log(state.citizenshipSetup);

            expect(axios.post).toHaveBeenCalledWith("citizenshipSetupAction", fake.ciphertext);
            expect(state.citizenshipSetup[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteCitizenshipSetup", () => {
            expect(citizenship.default.actions.deleteCitizenshipSetup).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await citizenship.default.actions.deleteCitizenshipSetup()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to delete data", async() => {
            const fakeDataToBeDeleted = {
                id: 3,
                item: fakeData
                    .map((data) => (3 == data.id ? data : ""))
                    .filter((n) => n)[0],
            };
            const state = {
                citizenshipSetup: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await citizenship.default.actions.deleteCitizenshipSetup({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.citizenshipSetup.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteCitizenshipSetup/" + fakeDataToBeDeleted.id
            );
        });
    })

});