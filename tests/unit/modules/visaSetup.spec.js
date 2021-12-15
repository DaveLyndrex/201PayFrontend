const visa = require("../../../src/store/modules/human-resources/visaSetup");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, VisaPermitType: 'string', LegislationCode: 'string', CurrentVisaPermit: 'string', },
    { id: 2, VisaPermitType: 'string', LegislationCode: 'string', CurrentVisaPermit: 'string', },
    { id: 3, VisaPermitType: 'string', LegislationCode: 'string', CurrentVisaPermit: 'string', },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(visa.default.mutations.setVisaSetup).toBeTruthy();
    });

    it("Set Data: sets state.visaSetup to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { visaSetup: [] };

        visa.default.mutations.setVisaSetup(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.visaSetup).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(visa.default.getters.allVisaSetup).toBeTruthy();
    });

    it("returns all visa mock/fake data", () => {
        const state = {
            visaSetup: fakeData,
        };
        const actual = visa.default.getters.allVisaSetup(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getAllVisaSetup", () => {
            expect(visa.default.actions.getAllVisaSetup).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await visa.default.actions.getAllVisaSetup();
            expect(axios.get).toHaveBeenCalledWith("getAllVisaPermitType");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists visaSetupAction", () => {
            expect(visa.default.actions.visaSetupAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await visa.default.actions.visaSetupAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    visaSetup: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, VisaPermitType: 'test add', LegislationCode: 'string', CurrentVisaPermit: 'string', };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await visa.default.actions.visaSetupAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.visaSetup).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateVisaSetup", () => {
            expect(visa.default.actions.updateVisaSetup).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await visa.default.actions.updateVisaSetup()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, VisaPermitType: 'test update', LegislationCode: 'string', CurrentVisaPermit: 'string', },
                index: 1,
            };
            const state = { visaSetup: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await visa.default.actions.updateVisaSetup({ state }, fake);
            // console.log(result);
            // console.log(state.visaSetup);

            expect(axios.post).toHaveBeenCalledWith("visaSetupAction", fake.ciphertext);
            expect(state.visaSetup[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteVisaSetup", () => {
            expect(visa.default.actions.deleteVisaSetup).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await visa.default.actions.deleteVisaSetup()
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
                visaSetup: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await visa.default.actions.deleteVisaSetup({ state },
                fakeDataToBeDeleted
            );
            state.visaSetup.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteVisaSetup/" + fakeDataToBeDeleted.id
            );
        });
    })

});