const training = require("../../../src/store/modules/human-resources/training");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, Description: "string" },
    { id: 2, Description: "string" },
    { id: 3, Description: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(training.default.mutations.setTrainingType).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { trainingType: [] };

        training.default.mutations.setTrainingType(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.trainingType).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(training.default.getters.allTrainingType).toBeTruthy();
    });

    it("returns all training mock/fake data", () => {
        const state = {
            trainingType: fakeData,
        };
        const actual = training.default.getters.allTrainingType(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getTrainingType", () => {
            expect(training.default.actions.getTrainingType).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await training.default.actions.getTrainingType();
            expect(axios.get).toHaveBeenCalledWith("getAllTrainingTypes");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists trainingTypeAction", () => {
            expect(training.default.actions.trainingTypeAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await training.default.actions.trainingTypeAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    trainingType: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, Description: 'test add' };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await training.default.actions.trainingTypeAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.trainingType).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateTrainingType", () => {
            expect(training.default.actions.updateTrainingType).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await training.default.actions.updateTrainingType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, Description: 'training updated' },
                index: 1,
            };
            const state = { trainingType: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await training.default.actions.updateTrainingType({ state }, fake);
            // console.log(result);
            // console.log(state.trainingType);

            expect(axios.post).toHaveBeenCalledWith("trainingSetupAction", fake.ciphertext);
            expect(state.trainingType[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteTrainingType", () => {
            expect(training.default.actions.deleteTrainingType).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await training.default.actions.deleteTrainingType()
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
                trainingType: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await training.default.actions.deleteTrainingType({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.trainingType.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteTrainingSetup/" + fakeDataToBeDeleted.id
            );
        });
    })

});