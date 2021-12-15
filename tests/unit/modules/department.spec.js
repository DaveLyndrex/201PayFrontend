// 11/18/2021 [C.RUBIO]
const department = require("../../../src/store/modules/human-resources/department");
const retrieveAll = require("../../../src/store/modules/leaveCredits");

const axios = require("axios");
jest.mock("axios");
const fakeData = [
    {
        id: 1,
        DepartmentCode: "ACCT",
        DepartmentName: "Accounting",
        EffectiveStartDate: "01/01/2021",
        EffectiveEndDate: "01/10/2021",
        ClassificationName: "CN",
        ClassificationEffectiveDate: "01/01/2021",
        ExtraInfoEffectiveStartDate: "01/01/2021",
        LegislationCode: "LC",
        LeiInformationCategory: "LIC",
        SetCode: "SC",
    },
    {
        id: 2,
        DepartmentCode: "ADM",
        DepartmentName: "Administration",
        EffectiveStartDate: "01/01/2021",
        EffectiveEndDate: "01/10/2021",
        ClassificationName: "CN",
        ClassificationEffectiveDate: "01/01/2021",
        ExtraInfoEffectiveStartDate: "01/01/2021",
        LegislationCode: "LC",
        LeiInformationCategory: "LIC",
        SetCode: "SC",
    },
    {
        id: 3,
        DepartmentCode: "BDT",
        DepartmentName: "Business Development Team - AEV",
        EffectiveStartDate: "01/01/2021",
        EffectiveEndDate: "01/10/2021",
        ClassificationName: "CN",
        ClassificationEffectiveDate: "01/01/2021",
        ExtraInfoEffectiveStartDate: "01/01/2021",
        LegislationCode: "LC",
        LeiInformationCategory: "LIC",
        SetCode: "SC",
    },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(department.default.mutations.setDepartment).toBeTruthy();
    });

    // it("Set Data: sets state.department to mock/fakeData", () => {
    //     const data = JSON.stringify({ data: fakeData });

    // });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(department.default.getters.getAllDepartment).toBeTruthy();
    });

    it("returns all department mock/fake data", () => {
        const state = {
            department: fakeData,
        };
        const actual = department.default.getters.getAllDepartment(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getDepartment", () => {
            expect(department.default.actions.getDepartment).toBeTruthy();
        });

        it("calls axios to fetch data", async () => {
            axios.get.mockResolvedValue(fakeData);
            const data = await department.default.actions.getDepartment();
            expect(axios.get).toHaveBeenCalledWith("getAllDepartments");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists createDepartment", () => {
            expect(department.default.actions.createDepartment).toBeTruthy();

        });

        it("throws an error when parameter is missing for add data", async () => {

            try {
                await department.default.actions.createDepartment()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async () => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    department: fakeData,
                },
            };
            const dataToBeAdded = {
                id: 4,
                DepartmentCode: "AF",
                DepartmentName: "Aboitiz Foundation",
                EffectiveStartDate: "01/10/2021",
                EffectiveEndDate: "01/18/2021",
                ClassificationName: "CN",
                ClassificationEffectiveDate: "01/15/2021",
                ExtraInfoEffectiveStartDate: "01/30/2021",
                LegislationCode: "Legislation Code",
                LeiInformationCategory: "LeiInformation Category",
                SetCode: "Set Code",
            };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await department.default.actions.createDepartment(
                context,
                dataToBeAdded
            );
            expect(context.state.department).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updateDepartmentData", () => {
            expect(department.default.actions.updateDepartmentData).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async () => {

            try {
                await department.default.actions.updateDepartmentData()
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
                    DepartmentCode: "ADM",
                    DepartmentName: "Administration",
                    EffectiveStartDate: "01/01/2021",
                    EffectiveEndDate: "01/10/2021",
                    ClassificationName: "CN",
                    ClassificationEffectiveDate: "01/01/2021",
                    ExtraInfoEffectiveStartDate: "01/01/2021",
                    LegislationCode: "Legislation Code",
                    LeiInformationCategory: "LeiInformation Category",
                    SetCode: "Set Code",
                },
                index: 1,
            };
            const state = { department: fakeData };

            axios.post.mockResolvedValue({
                id: 2,
                DepartmentCode: "ADM",
                DepartmentName: "Administration",
                EffectiveStartDate: "01/01/2021",
                EffectiveEndDate: "01/10/2021",
                ClassificationName: "CN",
                ClassificationEffectiveDate: "01/01/2021",
                ExtraInfoEffectiveStartDate: "01/01/2021",
                LegislationCode: "Legislation Code",
                LeiInformationCategory: "LeiInformation Category",
                SetCode: "Set Code",
            });
            const result = await department.default.actions.updateDepartmentData({ state }, fake);
            // console.log(result);
            // console.log(state.department);

            expect(axios.post).toHaveBeenCalledWith("updateDepartment", fake.ciphertext);
            expect(state.department[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteDepartment", () => {
            expect(department.default.actions.deleteDepartment).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async () => {

            try {
                await department.default.actions.deleteDepartment()
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
                department: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await department.default.actions.deleteDepartment({ state },
                fakeDataToBeDeleted
            );
            state.department.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteDepartment/" + fakeDataToBeDeleted.id
            );
        });
    })

});