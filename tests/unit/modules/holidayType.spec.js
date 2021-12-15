const holidayType = require("../../../src/store/modules/human-resources/holidayType");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, HolidayType: "string" },
    { id: 2, HolidayType: "string" },
    { id: 3, HolidayType: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(holidayType.default.mutations.setHolidayTypeSetup).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { holidayTypeSetup: [] };

        holidayType.default.mutations.setHolidayTypeSetup(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.holidayTypeSetup).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(holidayType.default.getters.allHolidayTypeSetup).toBeTruthy();
    });

    it("returns all holidayType mock/fake data", () => {
        const state = {
            holidayTypeSetup: fakeData,
        };
        const actual = holidayType.default.getters.allHolidayTypeSetup(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getHolidayTypeSetup", () => {
            expect(holidayType.default.actions.getHolidayTypeSetup).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await holidayType.default.actions.getHolidayTypeSetup();
            expect(axios.get).toHaveBeenCalledWith("getHolidayType");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists holidayTypeSetupAction", () => {
            expect(holidayType.default.actions.holidayTypeSetupAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await holidayType.default.actions.holidayTypeSetupAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    holidayTypeSetup: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, HolidayType: 'test add' };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await holidayType.default.actions.holidayTypeSetupAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.holidayTypeSetup).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateHolidayTypeSetup", () => {
            expect(holidayType.default.actions.updateHolidayTypeSetup).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await holidayType.default.actions.updateHolidayTypeSetup()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, HolidayType: 'holidayType updated' },
                index: 1,
            };
            const state = { holidayTypeSetup: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await holidayType.default.actions.updateHolidayTypeSetup({ state }, fake);
            // console.log(result);
            // console.log(state.holidayTypeSetup);

            expect(axios.post).toHaveBeenCalledWith("holidayTypeSetupAction", fake.ciphertext);
            expect(state.holidayTypeSetup[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteHolidayTypeSetup", () => {
            expect(holidayType.default.actions.deleteHolidayTypeSetup).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await holidayType.default.actions.deleteHolidayTypeSetup()
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
                holidayTypeSetup: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await holidayType.default.actions.deleteHolidayTypeSetup({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.holidayTypeSetup.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteHolidayType/" + fakeDataToBeDeleted.id
            );
        });
    })

});