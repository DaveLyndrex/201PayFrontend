const validation = require("../../../src/utils/Validation");
const axios = require("axios");
const { describe } = require("jest-circus");
jest.mock("axios");
//test for Validation.js
describe("tests for validation", () => {
  console.log(validation.default);
  describe("should be a valid email", () => {
    it("returns true if input is valid email", () => {
      expect(validation.default.email).not.toBeNull();
      const data = validation.default.email("eleasar@virtuascript.com", "Bank");
      expect(data).toBe(true);
    });

    it("returns false if not a valid email or empty", () => {
      try {
        const data = validation.default.email("", "");
        const data2 = validation.default.email("junmar@com", "COD");
        throw new Error(data + " " + data2);
      } catch (e) {
        expect(e).toMatchInlineSnapshot(
          `[Error: The  field should be valid email. The COD field should be valid email.]`
        );
        expect(typeof e).toBe("object");
      }
    });
  });

  describe("should be a required field", () => {
    it("returns true if it is a valid email", () => {
      expect(validation.default.required).not.toBeNull();
      expect(validation.default.required("BDO", "Bank Name")).toBe(true);
    });
    it("throws an error if email is empty or invalid", () => {
      try {
        const data = validation.default.required("", "Bank Name");
        throw new Error(data);
      } catch (e) {
        expect(e).toMatchInlineSnapshot(
          `[Error: The Bank Name field is required]`
        );
        expect(typeof e).toBe("object");
      }
    });
  });

  describe("should have the minimum characters in a field", () => {
    it("returns true if it has a minimum character requirement", () => {
      expect(validation.default.min).not.toBeNull();
      expect(validation.default.min("BDO", "Bank Name", 1)).toBe(true);
    });
    it("throws an error if the field does not contain minimum character requirements", () => {
      try {
        const data = validation.default.min("", "Bank Name", 1);
        throw new Error(data);
      } catch (e) {
        expect(e).toMatchInlineSnapshot(
          `[Error: The Bank Name field should atleast 1 characters.]`
        );
        expect(typeof e).toBe("object");
      }
    });
  });

  describe("should be a valid date", () => {
    it("returns true if it is a valid date", () => {
      expect(validation.default.date).not.toBeNull();
      expect(validation.default.date("08/01/2021", "Start Date")).toBe(true);
    });

    it("throws an error if the date is invalid", () => {
      try {
        const data = validation.default.date("2021-01-01", "Start Date");
        throw new Error(data);
      } catch (e) {
        expect(e).toMatchInlineSnapshot(
          `[Error: The Start Date field should be valid date.]`
        );
        expect(typeof e).toBe("object");
      }
    });
  });

  describe("should be a valid integer", () => {
    it("returns true if the input is integer", () => {
      expect(validation.default.integer).not.toBeNull();
      expect(validation.default.integer(21, "Price")).toBe(true);
    });
    it("throws an error if the input is not an integer", () => {
      try {
        const data = validation.default.integer("Hello", "Leave Credits");
        throw new Error(data);
      } catch (e) {
        expect(e).toMatchInlineSnapshot(
          `[Error: The Leave Credits field should be valid number.]`
        );
        expect(typeof e).toBe("object");
      }
    });
  });
});
