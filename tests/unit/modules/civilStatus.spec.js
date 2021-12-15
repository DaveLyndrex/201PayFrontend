const axios = require("axios");

jest.mock("axios");
const CivilStatus = require("../../../src/store/modules/human-resources/civilStatus");
const retrieveAll = require('../../../src/store/modules/basicInfo')
const mockData = [
  { id: 1, CivilStatus: "Single" },
  { id: 2, CivilStatus: "Married" },
  { id: 3, CivilStatus: "Divorced" },
];

describe("CivilStatus mutation function call", () => {
    test("Set Data: sets state.civilStatus to data", () => {

        const data = JSON.stringify({ data: mockData });

        const state = { civilStatus: [] };

        CivilStatus.default.mutations.setCivilStatus(state, data);

        const expectedResult = JSON.parse(data).data;
        expect(state.civilStatus).toStrictEqual(expectedResult);
    });
});

describe("testing mock api calls", () => {

  describe("when API call is successful", () => {
    it("should return CivilStatus list", async () => {

      axios.get.mockResolvedValueOnce(mockData);
      const result = await retrieveAll.default.actions.retrieveAllCivilStatusMasterData();

      expect(axios.get).toHaveBeenCalledWith("getAllCivilStatus");
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockData);
      expect(result && typeof result === "object").toBe(true);
    });
  });

  describe("when API call fails", () => {
    it("should return empty users list", async () => {
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      const result = await retrieveAll.default.actions.retrieveAllCivilStatusMasterData();

      expect(axios.get).toHaveBeenCalledWith("getAllCivilStatus");
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(result === undefined).toBe(true);
    });
  });

  describe("when API mock add function is successfull", () => {
    it("should return list of civilStatus including the new one", async () => {
      const dummy = {
        dispatch: jest.fn(),
        state: {
          civilStatus: mockData,
        },
      };
      const data = { id: 8, CivilStatus: "Widowed" };

      axios.post.mockResolvedValueOnce(data);

      const result = await CivilStatus.default.actions.createCivilStatus(dummy, data);
      // console.log(result, "actual added data");
      // console.log(dummy.state.civilStatus, "returned state after execution");
      expect(axios.post).toHaveBeenCalledWith("createCivilStatus", data);
      expect(dummy.state.civilStatus).toEqual(
        expect.arrayContaining([expect.objectContaining(result)])
      );
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  describe("when API mock update is successfull", () => {
    it("should return updated CivilStatus", async () => {
      const dummy = {
        ciphertext: "",
        editedData: { id: 2, CivilStatus: "WIDOWED" },
        index: 1,
    };

      const state = { civilStatus: mockData };

      axios.post.mockResolvedValueOnce(dummy);

      const cipher = await CivilStatus.default.actions.updateCivilStatus({ state }, dummy);
      // console.log(cipher, "updated mock data");
      // console.log(state.civilStatus, "returned state after execution");
      expect(axios.post).toHaveBeenCalledWith("updateCivilStatus", dummy.ciphertext);

    });

  });

  describe("when API mock delete is successfull", () => {
    it("should return CivilStatus list without the deleted data", async () => {
      const dummy = {
        id: 2,
        item: mockData.map((data) => 2 === data.id ? data : "").filter((n) => n)[0]
    };
      const state = { civilStatus: mockData };

      axios.delete.mockResolvedValueOnce(dummy);
      const result = await CivilStatus.default.actions.deleteCivilStatus({ state }, dummy);

      // console.log(dummy, "actual data to be destroyed");
      // console.log(state, "returned state after execution destroy"); 
      state.civilStatus.map(data => expect(result.item).not.toContain(data))
      expect(axios.delete).toHaveBeenCalledWith(`deleteCivilstatus/${dummy.id}`);

    });

  });
});
