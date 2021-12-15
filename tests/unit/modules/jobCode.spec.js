const jobCode = require("../../../src/store/modules/human-resources/jobCode");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, jobCode: "12345" },
    { id: 2, jobCode: "54321" },
  ];

  //test mutation
  describe("mutations", () => {
    it("check if exists", () => {
        expect(jobCode.default.mutations.setJobCode).toBeTruthy();
    });

    it("Set Data: sets state.jobCode to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { jobCode: [] };

        jobCode.default.mutations.setJobCode(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.jobCode).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(jobCode.default.getters.allJobCode).toBeTruthy();
    });

    it("returns all jobCode mock/fake data", () => {
        const dummy = {
            jobCode: fakeData,
        };
        const actual = jobCode.default.getters.allJobCode(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1]]);
        expect(actual).toEqual(dummy.jobCode);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getJobCode", () => {
            expect(jobCode.default.actions.getJobCode).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await jobCode.default.actions.getJobCode();
            expect(axios.get).toHaveBeenCalledWith("getAllJobCodes");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getJobCode", () => {
            expect(jobCode.default.actions.getJobCode).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await jobCode.default.actions.getJobCode();

            expect(axios.get).toHaveBeenCalledWith("getAllJobCodes");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock createJobCode function
    describe("Add Function", () => {

        it("check if exists jobCode", () => {
            expect(jobCode.default.actions.createJobCode).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await jobCode.default.actions.createJobCode()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                  jobCode: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "12122" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await jobCode.default.actions.createJobCode(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("createJobCode", dataToBeAdded);
            expect(context.state.jobCode).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successful", () => {

        it("check if exists jobCode", () => {
            expect(jobCode.default.actions.updateJobCode).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await jobCode.default.actions.updateJobCode()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated jobCode", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, jobCode: "10000" },
                index: 1,
            };

            const state = { jobCode: fakeData };

            axios.post.mockResolvedValueOnce(dummy);
            await jobCode.default.actions.updateJobCode({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.jobCode, "returned state after execution");

            expect(axios.post).toHaveBeenCalledWith("updateJobCode", dummy.ciphertext);
        });
    });

    //mock delete function
    describe("when API mock delete is successful", () => {

        it("check if exists deleteJobCode", () => {
            expect(jobCode.default.actions.deleteJobCode).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await jobCode.default.actions.deleteJobCode()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("should return jobCode list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { jobCode: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await jobCode.default.actions.deleteJobCode({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.jobCode.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteJobCode/${dummy.id}`);

        });

    });
});

