const timekeeping = require("../../../src/store/modules/human-resources/timekeeping");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, Timekeeping: "string" },
    { id: 2, Timekeeping: "string" },
    { id: 3, Timekeeping: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(timekeeping.default.mutations.setTimekeepingSetup).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { timekeepingSetup: [] };

        timekeeping.default.mutations.setTimekeepingSetup(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.timekeepingSetup).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(timekeeping.default.getters.allTimekeepingSetup).toBeTruthy();
    });

    it("returns all timekeeping mock/fake data", () => {
        const state = {
            timekeepingSetup: fakeData,
        };
        const actual = timekeeping.default.getters.allTimekeepingSetup(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getTimekeepingSetup", () => {
            expect(timekeeping.default.actions.getTimekeepingSetup).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await timekeeping.default.actions.getTimekeepingSetup();
            expect(axios.get).toHaveBeenCalledWith("getAllTimekeeping");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists timekeepingSetupAction", () => {
            expect(timekeeping.default.actions.timekeepingSetupAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await timekeeping.default.actions.timekeepingSetupAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    timekeepingSetup: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, Timekeeping: 'test add' };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await timekeeping.default.actions.timekeepingSetupAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.timekeepingSetup).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateTimekeepingSetup", () => {
            expect(timekeeping.default.actions.updateTimekeepingSetup).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await timekeeping.default.actions.updateTimekeepingSetup()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, Timekeeping: 'timekeeping updated' },
                index: 1,
            };
            const state = { timekeepingSetup: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await timekeeping.default.actions.updateTimekeepingSetup({ state }, fake);
            // console.log(result);
            // console.log(state.timekeepingSetup);

            expect(axios.post).toHaveBeenCalledWith("timekeepingSetupAction", fake.ciphertext);
            expect(state.timekeepingSetup[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteTimekeepingSetup", () => {
            expect(timekeeping.default.actions.deleteTimekeepingSetup).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await timekeeping.default.actions.deleteTimekeepingSetup()
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
                timekeepingSetup: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await timekeeping.default.actions.deleteTimekeepingSetup({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.timekeepingSetup.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteTimekeepingSetup/" + fakeDataToBeDeleted.id
            );
        });
    })

});