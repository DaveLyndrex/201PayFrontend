const costCenter = require("../../../src/store/modules/human-resources/costCenter");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, CostCenterCode: "string", CostCenterName: "string" },
    { id: 2, CostCenterCode: "string", CostCenterName: "string" },
    { id: 3, CostCenterCode: "string", CostCenterName: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(costCenter.default.mutations.setCostCenterSetups).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { costCenter: [] };

        costCenter.default.mutations.setCostCenterSetups(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.costCenter).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(costCenter.default.getters.allCostCenterSetups).toBeTruthy();
    });

    it("returns all costCenter mock/fake data", () => {
        const state = {
            costCenter: fakeData,
        };
        const actual = costCenter.default.getters.allCostCenterSetups(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getCostCenterSetups", () => {
            expect(costCenter.default.actions.getCostCenterSetups).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await costCenter.default.actions.getCostCenterSetups();
            expect(axios.get).toHaveBeenCalledWith("getAllCostCenterSetup");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists costCenterAction", () => {
            expect(costCenter.default.actions.costCenterAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await costCenter.default.actions.costCenterAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    costCenter: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, CostCenterCode: "test add", CostCenterName: "string" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await costCenter.default.actions.costCenterAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.costCenter).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updatetCostCenterSetups", () => {
            expect(costCenter.default.actions.updatetCostCenterSetups).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await costCenter.default.actions.updatetCostCenterSetups()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, CostCenterCode: "updated data", CostCenterName: "string" },
                index: 1,
            };
            const state = { costCenter: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await costCenter.default.actions.updatetCostCenterSetups({ state }, fake);
            // console.log(result);
            // console.log(state.costCenter);

            expect(axios.post).toHaveBeenCalledWith("costCenterAction", fake.ciphertext);
            expect(state.costCenter[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteCostCenterSetup", () => {
            expect(costCenter.default.actions.deleteCostCenterSetup).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await costCenter.default.actions.deleteCostCenterSetup()
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
                costCenter: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await costCenter.default.actions.deleteCostCenterSetup({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.costCenter.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteCostCenterSetup/" + fakeDataToBeDeleted.id
            );
        });
    })

});