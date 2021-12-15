// 11/18/2021 [C.RUBIO]
const leaveCreditYear = require("../../../src/store/modules/human-resources/leaveCreditYear");
const retrieveAll = require("../../../src/store/modules/leaveCredits");

const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, Year: "2021" , StartDate: "11/18/2021", EndDate: "11/25/2021"},
    { id: 2, Year: "2025" , StartDate: "11/19/2021", EndDate: "11/20/2021" },
    { id: 3, Year: "2029" , StartDate: "11/20/2021", EndDate: "11/30/2021" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(leaveCreditYear.default.mutations.setLeaveCreditYear).toBeTruthy();
    });

    // it("Set Data: sets state.leaveCreditYear to mock/fakeData", () => {
    //     const data = JSON.stringify({ data: fakeData });

    // });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(leaveCreditYear.default.getters.allLeaveCreditYearGetters).toBeTruthy();
    });

    it("returns all leaveCreditYear mock/fake data", () => {
        const state = {
            leaveCreditYear: fakeData,
        };
        const actual = leaveCreditYear.default.getters.allLeaveCreditYearGetters(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getEmploymentType", () => {
            expect(retrieveAll.default.actions.retrieveAllLeaveCreditYears).toBeTruthy();
        });

        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await retrieveAll.default.actions.retrieveAllLeaveCreditYears();
            expect(axios.get).toHaveBeenCalledWith("getAllLeaveCreditYears");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists createLeaveCreditsYear", () => {
            expect(leaveCreditYear.default.actions.createLeaveCreditsYear).toBeTruthy();

        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await leaveCreditYear.default.actions.createLeaveCreditsYear()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    leaveCreditYear: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, Year: "2027" , StartDate: "01/20/2027", EndDate: "01/30/2027"};
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await leaveCreditYear.default.actions.createLeaveCreditsYear(
                context,
                dataToBeAdded
            );
            expect(context.state.leaveCreditYear).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateLeaveCreditYear", () => {
            expect(leaveCreditYear.default.actions.updateLeaveCreditYear).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await leaveCreditYear.default.actions.updateLeaveCreditYear()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "cipher",
                editedData: { id: 2, Year: "2025" , StartDate: "11/10/2025", EndDate: "11/20/2025" },
                index: 1,
            };
            const state = { leaveCreditYear: fakeData };

            axios.post.mockResolvedValue({ id: 2, Year: "2025" , StartDate: "11/10/2025", EndDate: "11/20/2025" });
            const result = await leaveCreditYear.default.actions.updateLeaveCreditYear({ state }, fake);
            // console.log(result);
            // console.log(state.leaveCreditYear);

            expect(axios.post).toHaveBeenCalledWith("updateLeaveCreditYear", fake.ciphertext);
            expect(state.leaveCreditYear[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteLeaveCreditYear", () => {
            expect(leaveCreditYear.default.actions.deleteLeaveCreditYear).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await leaveCreditYear.default.actions.deleteLeaveCreditYear()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to delete data", async() => {
            const fakeDataToBeDeleted = {
                id: 4,
                item: fakeData
                    .map((data) => (3 == data.id ? data : ""))
                    .filter((n) => n)[0],
            };
            const state = {
                leaveCreditYear: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await leaveCreditYear.default.actions.deleteLeaveCreditYear({ state },
                fakeDataToBeDeleted
            );
            state.leaveCreditYear.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteLeaveCreditYear/" + fakeDataToBeDeleted.id
            );
        });
    })

});