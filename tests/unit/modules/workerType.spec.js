const workerType = require("../../../src/store/modules/human-resources/workerType");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, WorkerType: "string" },
    { id: 2, WorkerType: "string" },
    { id: 3, WorkerType: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(workerType.default.mutations.setWorkerType).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { workerType: [] };

        workerType.default.mutations.setWorkerType(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.workerType).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(workerType.default.getters.allWorkerType).toBeTruthy();
    });

    it("returns all workerType mock/fake data", () => {
        const state = {
            workerType: fakeData,
        };
        const actual = workerType.default.getters.allWorkerType(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getWorkerType", () => {
            expect(workerType.default.actions.getWorkerType).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await workerType.default.actions.getWorkerType();
            expect(axios.get).toHaveBeenCalledWith("getAllWorkerTypes");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists workerTypeAction", () => {
            expect(workerType.default.actions.workerTypeAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await workerType.default.actions.workerTypeAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    workerType: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, WorkerType: 'test add' };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await workerType.default.actions.workerTypeAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.workerType).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateWorkerType", () => {
            expect(workerType.default.actions.updateWorkerType).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await workerType.default.actions.updateWorkerType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, WorkerType: 'workerType updated' },
                index: 1,
            };
            const state = { workerType: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await workerType.default.actions.updateWorkerType({ state }, fake);
            // console.log(result);
            // console.log(state.workerType);

            expect(axios.post).toHaveBeenCalledWith("workerTypeSetupAction", fake.ciphertext);
            expect(state.workerType[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteWorkerType", () => {
            expect(workerType.default.actions.deleteWorkerType).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await workerType.default.actions.deleteWorkerType()
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
                workerType: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await workerType.default.actions.deleteWorkerType({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.workerType.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteWorkerType/" + fakeDataToBeDeleted.id
            );
        });
    })

});