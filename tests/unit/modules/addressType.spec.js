const addressType = require("../../../src/store/modules/human-resources/addressType");
const axios = require("axios");
jest.mock("axios");

const fakeData = [
    { id: 1, addressType: "Email Address" },
    { id: 2, addressType: "Home Address" },
  ];

  //test mutation
  describe("mutations", () => {
    it("check if exists", () => {
        expect(addressType.default.mutations.setAddressTypes).toBeTruthy();
    });

    it("Set Data: sets state.addressType to mock/fakeData", () => {
        const data = JSON.stringify({ data: fakeData });

        const state = { addressType: [] };

        addressType.default.mutations.setAddressTypes(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.addressType).toStrictEqual(expectedResult);
    });
});

describe("getters", () => {
    it("check if exists", () => {
        expect(addressType.default.getters.allAddressTypesGetters).toBeTruthy();
    });

    it("returns all addressType mock/fake data", () => {
        const dummy = {
            addressType: fakeData,
        };
        const actual = addressType.default.getters.allAddressTypesGetters(dummy);
        expect(actual).toEqual([fakeData[0], fakeData[1]]);
        expect(actual).toEqual(dummy.addressType);
    });
});


describe("actions", () => {

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("Get or Fetch Data Function", () => {
        it("check if exists getAllDefaultAddressType", () => {
            expect(addressType.default.actions.getAllDefaultAddressType).toBeTruthy();
        });


        it("calls axios to fetch data", async() => {
            axios.get.mockResolvedValue(fakeData);
            const data = await addressType.default.actions.getAllDefaultAddressType();
            expect(axios.get).toHaveBeenCalledWith("getAllDefaultAddressType");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(data).toEqual(fakeData);
        });
    });

    // test when the Network failed and returns an empty list
    describe("when API call fails", () => {
        it("check if exists getAllDefaultAddressType", () => {
            expect(addressType.default.actions.getAllDefaultAddressType).toBeTruthy();
        });


        it("should return empty users list", async() => {
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await addressType.default.actions.getAllDefaultAddressType();

            expect(axios.get).toHaveBeenCalledWith("getAllDefaultAddressType");
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(result === undefined).toBe(true);
        });
    });

    // mock createAddressType function
    describe("Add Function", () => {

        it("check if exists addressType", () => {
            expect(addressType.default.actions.createAddressType).toBeTruthy();
        });

        it("throws an error when parameter is missing for add data", async() => {

            try {
                await addressType.default.actions.createAddressType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });

        it("calls axios to add data", async() => {
            const context = {
                dispatch: jest.fn(),
                state: {
                  addressType: fakeData,
                },
            };
            const dataToBeAdded = { id: 4, text: "City Address" };
            axios.post.mockResolvedValue(dataToBeAdded);
            const result = await addressType.default.actions.createAddressType(
                context,
                dataToBeAdded
            );
            // console.log(result);
            // console.log(context.state);
            expect(axios.post).toHaveBeenCalledWith("createAddressType", dataToBeAdded);
            expect(context.state.addressType).toEqual(
                expect.arrayContaining([expect.objectContaining(result)])
            );
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    })

    // mock update functions
    describe("when API mock update is successful", () => {

        it("check if exists addressType", () => {
            expect(addressType.default.actions.updateAddressType).toBeTruthy();
        });

        it("throws an error when parameter is missing for update data", async() => {

            try {
                await addressType.default.actions.updateAddressType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'state' of 'undefined' as it is undefined.");
            }

        });

        it("should return updated addressType", async() => {
            const dummy = {
                ciphertext: "",
                editedData: { id: 2, addressType: "Address" },
                index: 1,
            };

            const state = { addressType: fakeData };

            axios.put.mockResolvedValueOnce(dummy);
            await addressType.default.actions.updateAddressType({ state }, dummy);

            // console.log(cipher, "updated mock data");
            // console.log(state.addressType, "returned state after execution");

            expect(axios.put).toHaveBeenCalledWith("updateAddressType", dummy.ciphertext);

        });

    });

    //mock delete function
    describe("when API mock delete is successful", () => {

        it("check if exists deleteAddressType", () => {
            expect(addressType.default.actions.deleteAddressType).toBeTruthy();
        });


        it("throws an error when parameter is missing for delete data", async() => {

            try {
                await addressType.default.actions.deleteAddressType()
            } catch (e) {
                expect(typeof e).toBe('object')
                expect(e.message).toBe("Cannot destructure property 'dispatch' of 'undefined' as it is undefined.");
            }

        });
        it("should return addressType list without the deleted data", async() => {
            const dummy = {
                id: 2,
                item: fakeData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
            };
            const state = { addressType: fakeData };

            axios.delete.mockResolvedValueOnce(dummy);
            const result = await addressType.default.actions.deleteAddressType({ state }, dummy);

            // console.log(dummy, "actual data to be destroyed");
            // console.log(state, "returned state after execution destroy"); 
            state.addressType.map(data => expect(result.item).not.toContain(data))
            expect(axios.delete).toHaveBeenCalledWith(`deleteAddressType/${dummy.id}`);

        });

    });
});
