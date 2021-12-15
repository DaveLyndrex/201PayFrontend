const suffixType = require("../../../src/store/modules/human-resources/suffixType");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, Suffix: "string" },
    { id: 2, Suffix: "string" },
    { id: 3, Suffix: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(suffixType.default.mutations.setSuffixType).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { suffixType: [] };

        suffixType.default.mutations.setSuffixType(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.suffixType).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(suffixType.default.getters.allSuffixType).toBeTruthy();
    });

    it("returns all suffixType mock/fake data", () => {
        const state = {
            suffixType: fakeData,
        };
        const actual = suffixType.default.getters.allSuffixType(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getSuffixType", () => {
            expect(suffixType.default.actions.getSuffixType).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await suffixType.default.actions.getSuffixType();
            expect(axios.get).toHaveBeenCalledWith("getAllSuffixes");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists suffixTypeAction", () => {
            expect(suffixType.default.actions.suffixTypeAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await suffixType.default.actions.suffixTypeAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    suffixType: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, Suffix: 'test add' };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await suffixType.default.actions.suffixTypeAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.suffixType).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateSuffixType", () => {
            expect(suffixType.default.actions.updateSuffixType).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await suffixType.default.actions.updateSuffixType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, Suffix: 'suffixType updated' },
                index: 1,
            };
            const state = { suffixType: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await suffixType.default.actions.updateSuffixType({ state }, fake);
            // console.log(result);
            // console.log(state.suffixType);

            expect(axios.post).toHaveBeenCalledWith("suffixSetupAction", fake.ciphertext);
            expect(state.suffixType[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteSuffixType", () => {
            expect(suffixType.default.actions.deleteSuffixType).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await suffixType.default.actions.deleteSuffixType()
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
                suffixType: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await suffixType.default.actions.deleteSuffixType({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.suffixType.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteSuffixType/" + fakeDataToBeDeleted.id
            );
        });
    })

});