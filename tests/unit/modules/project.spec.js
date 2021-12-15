const project = require("../../../src/store/modules/human-resources/project");
const axios = require("axios");
jest.mock("axios");
const fakeData = [
    { id: 1, ProjectCode: "string", ProjectName: "string" },
    { id: 2, ProjectCode: "string", ProjectName: "string" },
    { id: 3, ProjectCode: "string", ProjectName: "string" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(project.default.mutations.setProjectSetup).toBeTruthy();
    });

    it("Set Data: sets state to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { projectSetup: [] };

        project.default.mutations.setProjectSetup(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.projectSetup).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(project.default.getters.AllProjectSetup).toBeTruthy();
    });

    it("returns all project mock/fake data", () => {
        const state = {
            projectSetup: fakeData,
        };
        const actual = project.default.getters.AllProjectSetup(state);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(fakeData);
    });
});

describe("actions", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getProjectSetup", () => {
            expect(project.default.actions.getProjectSetup).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await project.default.actions.getProjectSetup();
            expect(axios.get).toHaveBeenCalledWith("getAllProjects");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    })


    describe("Add Function", () => {

        it("check if exists projectSetupAction", () => {
            expect(project.default.actions.projectSetupAction).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await project.default.actions.projectSetupAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    projectSetup: fakeData,
                },
            };
            const dataToBeAdded = { id: 17, ProjectCode: "tes add", ProjectName: "string" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await project.default.actions.projectSetupAction(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(context.state.projectSetup).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })


    describe("Update Function", () => {


        it("check if exists updatetProjectSetupAction", () => {
            expect(project.default.actions.updatetProjectSetupAction).toBeTruthy();
        });



        it("throws an error when parameter is missing for update data", async() => {

            try {
                await project.default.actions.updatetProjectSetupAction()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("calls axios to update data", async() => {
            const fake = {
                ciphertext: "",
                editedData: { id: 2, ProjectCode: "project updated", ProjectName: "string" },
                index: 1,
            };
            const state = { projectSetup: fakeData };

            axios.post.mockResolvedValue(fake.editedData);
            const result = await project.default.actions.updatetProjectSetupAction({ state }, fake);
            // console.log(result);
            // console.log(state.projectSetup);

            expect(axios.post).toHaveBeenCalledWith("projectSetupAction", fake.ciphertext);
            expect(state.projectSetup[fake.index]).toEqual(result);
        });

    })
    describe("Delete Function", () => {

        it("check if exists deleteProjectSetup", () => {
            expect(project.default.actions.deleteProjectSetup).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await project.default.actions.deleteProjectSetup()
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
                projectSetup: fakeData,
            };
            axios.delete.mockResolvedValue(fakeDataToBeDeleted);
            const result = await project.default.actions.deleteProjectSetup({ state },
                fakeDataToBeDeleted
            );
            // console.log(result);
            // console.log(state);
            state.projectSetup.map((m) => expect(result.item).not.toContain(m));
            expect(axios.delete).toHaveBeenCalledWith(
                "deleteProjectSetup/" + fakeDataToBeDeleted.id
            );
        });
    })

});