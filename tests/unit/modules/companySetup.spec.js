const company = require("../../../src/store/modules/human-resources/company");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "test3" },
];

describe("mutations", () => {
    it("check if exists", () => {
        expect(company.default.mutations.setCompany).toBeTruthy();
    });

    it("Set Data: sets state.gender to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { company: [] };

        company.default.mutations.setCompany(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.company).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(company.default.getters.allCompanySetup).toBeTruthy();
    });

    it("returns all gender mock/fake data", () => {
        const dummy = {
            company: fakeData,
        };
        const actual = company.default.getters.allCompanySetup(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1], fakeData[2]]);
        expect(actual).toEqual(dummy.company);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getGenders", () => {
            expect(company.default.actions.getCompany).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await company.default.actions.getCompany();
            expect(axios.get).toHaveBeenCalledWith("getAllCompanySetup");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getGenders", () => {
            expect(company.default.actions.getCompany).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await company.default.actions.getCompany();

            expect(axios.get).toHaveBeenCalledWith("getAllCompanySetup");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock addGender function
    describe("Add Function", () => {

        it("check if exists gender", () => {
            expect(company.default.actions.createCompany).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await company.default.actions.createCompany()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                    company: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "UBISOFT" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await company.default.actions.createCompany(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("createCompany", dataToBeAdded);
            expect(context.state.company).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successfull", () => {

        it("check if exists gender", () => {
            expect(company.default.actions.updateCompany).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await company.default.actions.updateCompany()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated gender", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, company: "DNA Micro" },
                index: 1,
            };

            const state = { company: fakeData };

            axios.post.mockResolvedValueOnce(dummy);
            await company.default.actions.updateCompany({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.genders, "returned state after execution");

            expect(axios.post).toHaveBeenCalledWith("updateCompany", dummy.ciphertext);

        });

    });

    //mock delete function
    describe("when API mock delete is successfull", () => {

        it("check if exists deleteVisaSetup", () => {
            expect(company.default.actions.deleteCompany).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await company.default.actions.deleteCompany()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });
        it("should return gender list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { company: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await company.default.actions.deleteCompany({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.company.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteCompany/${dummy.id}`);

        });

    });
});