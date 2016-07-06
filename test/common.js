import domra from "../";
import { assert } from "chai";

describe("common", () => {
    it("empty string", () => {
        assert.equal(domra() ``, "");
    });

    it("string without variables", () => {
        assert.equal(domra() `test`, "test");
    });

    it("only variable", () => {
        const v = "test";
        assert.equal(domra() `${v}`, v);
    });

    it("variable in a first position", () => {
        const v = "test";
        assert.equal(domra() `${v}-1`, "test-1");
    });

    it("variable in a last position", () => {
        const v = "1";
        assert.equal(domra() `test-${v}`, "test-1");
    });

    it("variable in a middle position", () => {
        const v = "-";
        assert.equal(domra() `test${v}1`, "test-1");
    });

    it("variables between", () => {
        const v1 = "test";
        const v2 = "1";
        assert.equal(domra() `${v1}-${v2}`, "test-1");
    });
});