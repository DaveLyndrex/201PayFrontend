// 11/1712021 [C.RUBIO]
const employmenttype = require("../../../src/store/modules/human-resources/employmenttype");

const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, text: "Consultant" },
    { id: 2, text: "Project Based" },
    { id: 3, text: "Contractual" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(employmenttype.default.mutations.setEmploymentType).toBeTruthy();
    });

    it("Set Data: sets state.employmenttype to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(employmenttype.default.getters.allEmploymentTypeGetter).toBeTruthy();
    });

    it("returns all employmenttype mock/fake data", () => {
        const state = {
            employmenttype: fakeData,
        };
        const actual = employmenttype.default.getters.allEmploymentTypeGetter(state);
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
            expect(employmenttype.default.actions.getEmploymentTypes).toBeTruthy();
        });

        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await employmenttype.default.actions.getEmploymentTypes();
            expect(axios.get).toHaveBeenCalledWith("getAllEmploymentType");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists createEmploymentType", () => {
            expect(employmenttype.default.actions.createEmploymentType).toBeTruthy();

        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await employmenttype.default.actions.createEmploymentType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    employmenttype: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, text: "Management Associate" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await employmenttype.default.actions.createEmploymentType(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.employmenttype).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateEmploymentType", () => {
            expect(employmenttype.default.actions.updateEmploymentType).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await employmenttype.default.actions.updateEmploymentType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "cipher",
                editedData: { id: 2, text: "Remote Based" },
                index: 1,
            };
            const state = { employmenttype: fakeData };

            axios.post.mockResolvedValue({ id: 2, text: "Remote Based" });
            const result = await employmenttype.default.actions.updateEmploymentType({ state }, fake);
            // console.log(result);
            // console.log(state.employmenttype);

            expect(axios.post).toHaveBeenCalledWith("updateEmploymentType", fake.ciphertext);
            expect(state.employmenttype[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteEmploymentType", () => {
            expect(employmenttype.default.actions.deleteEmploymentType).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await employmenttype.default.actions.deleteEmploymentType()
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
                employmenttype: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await employmenttype.default.actions.deleteEmploymentType({ state },
                fakeDataToBeDeleted
            );
            state.employmenttype.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteEmploymentType/" + fakeDataToBeDeleted.id
            );
        });
    })

});