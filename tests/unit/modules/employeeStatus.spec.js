const employeeStatus = require("../../../src/store/modules/human-resources/employeeStatus");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, employeeStatus: "12345" },
    { id: 2, employeeStatus: "54321" },
  ];

  //test mutation
  describe("mutations", () => {
    it("check if exists", () => {
        expect(employeeStatus.default.mutations.setEmployeeStatus).toBeTruthy();
    });

    it("Set Data: sets state.employeeStatus to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { employeeStatus: [] };

        employeeStatus.default.mutations.setEmployeeStatus(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.employeeStatus).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(employeeStatus.default.getters.allEmployeeStatusGetters).toBeTruthy();
    });

    it("returns all employeeStatus mock/fake data", () => {
        const dummy = {
            employeeStatus: fakeData,
        };
        const actual = employeeStatus.default.getters.allEmployeeStatusGetters(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1]]);
        expect(actual).toEqual(dummy.employeeStatus);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getEmployeeStatusData", () => {
            expect(employeeStatus.default.actions.getEmployeeStatusData).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await employeeStatus.default.actions.getEmployeeStatusData();
            expect(axios.get).toHaveBeenCalledWith("getAllEmployeeStatus");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getEmployeeStatusData", () => {
            expect(employeeStatus.default.actions.getEmployeeStatusData).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await employeeStatus.default.actions.getEmployeeStatusData();

            expect(axios.get).toHaveBeenCalledWith("getAllEmployeeStatus");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock createEmployeeStatus function
    describe("Add Function", () => {

        it("check if exists employeeStatus", () => {
            expect(employeeStatus.default.actions.createEmployeeStatus).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await employeeStatus.default.actions.createEmployeeStatus()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                  employeeStatus: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "12122" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await employeeStatus.default.actions.createEmployeeStatus(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("createEmployeeStatus", dataToBeAdded);
            expect(context.state.employeeStatus).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successful", () => {

        it("check if exists employeeStatus", () => {
            expect(employeeStatus.default.actions.updateEmployeeStatus).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await employeeStatus.default.actions.updateEmployeeStatus()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated employeeStatus", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, employeeStatus: "Regular" },
                index: 1,
            };

            const state = { employeeStatus: fakeData };

            axios.put.mockResolvedValueOnce(dummy);
            await employeeStatus.default.actions.updateEmployeeStatus({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.employeeStatus, "returned state after execution");

            expect(axios.put).toHaveBeenCalledWith("updateEmployeeStatus", dummy.ciphertext);
        });
    });

    //mock delete function
    describe("when API mock delete is successful", () => {

        it("check if exists deleteEmployeeStatus", () => {
            expect(employeeStatus.default.actions.deleteEmployeeStatus).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await employeeStatus.default.actions.deleteEmployeeStatus()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });
        it("should return employeeStatus list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { employeeStatus: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await employeeStatus.default.actions.deleteEmployeeStatus({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.employeeStatus.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteEmployeeStatus/${dummy.id}`);

        });

    });
});

