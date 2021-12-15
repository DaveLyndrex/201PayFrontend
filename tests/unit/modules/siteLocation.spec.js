const siteLocation = require("../../../src/store/modules/human-resources/siteLocation");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, Site: "string" },
    { id: 2, Site: "string" },
    { id: 3, Site: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(siteLocation.default.mutations.setSiteType).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { siteType: [] };

        siteLocation.default.mutations.setSiteType(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.siteType).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(siteLocation.default.getters.allSiteType).toBeTruthy();
    });

    it("returns all siteLocation mock/fake data", () => {
        const state = {
            siteType: fakeData,
        };
        const actual = siteLocation.default.getters.allSiteType(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getSiteType", () => {
            expect(siteLocation.default.actions.getSiteType).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await siteLocation.default.actions.getSiteType();
            expect(axios.get).toHaveBeenCalledWith("getAllSites");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists siteTypeAction", () => {
            expect(siteLocation.default.actions.siteTypeAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await siteLocation.default.actions.siteTypeAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    siteType: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, Site: 'test add' };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await siteLocation.default.actions.siteTypeAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.siteType).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateSiteType", () => {
            expect(siteLocation.default.actions.updateSiteType).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await siteLocation.default.actions.updateSiteType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, Site: 'siteLocation updated' },
                index: 1,
            };
            const state = { siteType: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await siteLocation.default.actions.updateSiteType({ state }, fake);
            // console.log(result);
            // console.log(state.siteType);

            expect(axios.post).toHaveBeenCalledWith("siteSetupAction", fake.ciphertext);
            expect(state.siteType[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteSiteType", () => {
            expect(siteLocation.default.actions.deleteSiteType).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await siteLocation.default.actions.deleteSiteType()
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
                siteType: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await siteLocation.default.actions.deleteSiteType({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.siteType.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteSiteType/" + fakeDataToBeDeleted.id
            );
        });
    })

});