// 11/18/2021 [C.RUBIO]
const location = require("../../../src/store/modules/human-resources/location");

const axios = require("axios");
jest.mock("axios");
const fakeData = [
    {
        id: 1,
        EffectiveStartDate: "11/18/2021",
        EffectiveEndDate: "11/25/2021",
        SetCode: "SC",
        ActiveStatus: "Active",
        MainPhoneAreaCode: null,
        MainPhoneCountryCode: null,
        MainPhoneExtension: null,
        Location: "Manila",
        AddressLine1: "Cebu",
        AddressLine2: "Mandaue",
        AddressLine3: "Talamban",
        AddressLine4: "Banawa",
        City: "Cebu",
        Province: "Cebu",
        Country: null,
        LeiInformationCategory: "LIC",
        LegislationCode: "LC",
    },
    {
        id: 2,
        EffectiveStartDate: "11/19/2021",
        EffectiveEndDate: "11/26/2021",
        SetCode: "SC",
        ActiveStatus: "Active",
        MainPhoneAreaCode: null,
        MainPhoneCountryCode: null,
        MainPhoneExtension: null,
        Location: "Manila",
        AddressLine1: "Cebu",
        AddressLine2: "Mandaue",
        AddressLine3: "Talamban",
        AddressLine4: "Banawa",
        City: "Cebu",
        Province: "Cebu",
        Country: null,
        LeiInformationCategory: "LIC",
        LegislationCode: "Legislation Code",
    },
    {
        id: 3,
        EffectiveStartDate: "11/20/2021",
        EffectiveEndDate: "11/30/2021",
        SetCode: "Set Code",
        ActiveStatus: "Inactive",
        MainPhoneAreaCode: null,
        MainPhoneCountryCode: null,
        MainPhoneExtension: null,
        Location: "Manila",
        AddressLine1: "Cebu",
        AddressLine2: "Mandaue",
        AddressLine3: "Talamban",
        AddressLine4: "Banawa",
        City: "Cebu",
        Province: "Cebu",
        Country: null,
        LeiInformationCategory: "LIC",
        LegislationCode: "LC",
    },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(location.default.mutations.setLocation).toBeTruthy();
    });

    // it("Set Data: sets state.location to mock/fakeData", () => {
    //     const data = JSON.stringify({ data: fakeData });

    // });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(location.default.getters.allLocation).toBeTruthy();
    });

    it("returns all location mock/fake data", () => {
        const state = {
            location: fakeData,
        };
        const actual = location.default.getters.allLocation(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getLocation", () => {
            expect(location.default.actions.getLocation).toBeTruthy();
        });

        it("calls axios to fetch data", async () => {
            axios.get.mockResolvedValue(fakeData);
            const data = await location.default.actions.getLocation();
            expect(axios.get).toHaveBeenCalledWith("getAllLocations");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists createLocation", () => {
            expect(location.default.actions.createLocation).toBeTruthy();

        });

        it("throws an error when parameter is missing for add data", async () => {

            try {
                await location.default.actions.createLocation()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async () => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    location: fakeData,
                },
            };
            const dataToBeAdded = {
                id: 4,
                EffectiveStartDate: "11/25/2021",
                EffectiveEndDate: "11/28/2021",
                SetCode: "Set Code",
                ActiveStatus: "Active",
                MainPhoneAreaCode: null,
                MainPhoneCountryCode: null,
                MainPhoneExtension: null,
                Location: "Manila",
                AddressLine1: "Cebu",
                AddressLine2: "Mandaue",
                AddressLine3: "Talamban",
                AddressLine4: "Banawa",
                City: "Cebu",
                Province: "Cebu",
                Country: null,
                LeiInformationCategory: "Lei Information Category",
                LegislationCode: "Legislation Code",
            };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await location.default.actions.createLocation(
                context,
                dataToBeAdded
            );
            expect(context.state.location).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateLocation", () => {
            expect(location.default.actions.updateLocation).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async () => {

            try {
                await location.default.actions.updateLocation()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async () => {
            const fake = {
                ciphertext: "cipher",
                editedData: {
                    id: 2,
                    EffectiveStartDate: "11/11/2021",
                    EffectiveEndDate: "11/30/2021",
                    SetCode: "Set Code",
                    ActiveStatus: "Inactive",
                    MainPhoneAreaCode: null,
                    MainPhoneCountryCode: null,
                    MainPhoneExtension: null,
                    Location: "Manila",
                    AddressLine1: "Cebu",
                    AddressLine2: "Mandaue",
                    AddressLine3: "Talamban",
                    AddressLine4: "Banawa",
                    City: "Cebu",
                    Province: "Cebu",
                    Country: null,
                    LeiInformationCategory: "Lei Information Category",
                    LegislationCode: "Legislation Code",
                },
                index: 1,
            };
            const state = { location: fakeData };

            axios.post.mockResolvedValue({
                id: 2,
                EffectiveStartDate: "11/11/2021",
                EffectiveEndDate: "11/30/2021",
                SetCode: "Set Code",
                ActiveStatus: "Inactive",
                MainPhoneAreaCode: null,
                MainPhoneCountryCode: null,
                MainPhoneExtension: null,
                Location: "Manila",
                AddressLine1: "Cebu",
                AddressLine2: "Mandaue",
                AddressLine3: "Talamban",
                AddressLine4: "Banawa",
                City: "Cebu",
                Province: "Cebu",
                Country: null,
                LeiInformationCategory: "Lei Information Category",
                LegislationCode: "Legislation Code",
            });
            const result = await location.default.actions.updateLocation({ state }, fake);

            expect(axios.post).toHaveBeenCalledWith("updateLocation", fake.ciphertext);
            expect(state.location[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteLocation", () => {
            expect(location.default.actions.deleteLocation).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async () => {

            try {
                await location.default.actions.deleteLocation()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to delete data", async () => {
            const fakeDataToBeDeleted = {
                id: 4,
                item: fakeData
                    .map((data) => (3 == data.id ? data : ""))
                    .filter((n) => n)[0],
            };
            const state = {
                location: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await location.default.actions.deleteLocation({ state },
                fakeDataToBeDeleted
            );
            state.location.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteLocation/" + fakeDataToBeDeleted.id
            );
        });
    })

});