const regularization = require("../../../src/store/modules/human-resources/regularization");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, Description: "string", Default: 17 },
    { id: 2, Description: "string", Default: 17 },
    { id: 3, Description: "string", Default: 17 },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(regularization.default.mutations.setRegularizationSetup).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { regularizationSetup: [] };

        regularization.default.mutations.setRegularizationSetup(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.regularizationSetup).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(regularization.default.getters.allRegularizationSetup).toBeTruthy();
    });

    it("returns all regularization mock/fake data", () => {
        const state = {
            regularizationSetup: fakeData,
        };
        const actual = regularization.default.getters.allRegularizationSetup(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getRegularizationSetup", () => {
            expect(regularization.default.actions.getRegularizationSetup).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await regularization.default.actions.getRegularizationSetup();
            expect(axios.get).toHaveBeenCalledWith("getRegularizationPA");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists regularizationSetupAction", () => {
            expect(regularization.default.actions.regularizationSetupAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await regularization.default.actions.regularizationSetupAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    regularizationSetup: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, Description: 'test add', Default: 17 };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await regularization.default.actions.regularizationSetupAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.regularizationSetup).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateRegularizationSetup", () => {
            expect(regularization.default.actions.updateRegularizationSetup).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await regularization.default.actions.updateRegularizationSetup()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, Description: 'regularization updated', Default: 7 },
                index: 1,
            };
            const state = { regularizationSetup: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await regularization.default.actions.updateRegularizationSetup({ state }, fake);
            // console.log(result);
            // console.log(state.regularizationSetup);

            expect(axios.post).toHaveBeenCalledWith("regularizationAction", fake.ciphertext);
            expect(state.regularizationSetup[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteRegularizationPASetup", () => {
            expect(regularization.default.actions.deleteRegularizationPASetup).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await regularization.default.actions.deleteRegularizationPASetup()
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
                regularizationSetup: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await regularization.default.actions.deleteRegularizationPASetup({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.regularizationSetup.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteRegularizationPA/" + fakeDataToBeDeleted.id
            );
        });
    })

});