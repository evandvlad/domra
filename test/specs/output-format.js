/* global describe, it */

import domra, { WElement, WList } from "../../";
import { assert } from "chai";
import { createElement, createTree } from "../helpers/dom-builder";
import { checkElement, checkTextNode, checkFragment } from "../helpers/dom-checker";
import TestBox from "../helpers/test-box";

describe("output-format", () => {
    describe("correct types", () => {
        const domraString = domra({ outputFormat: "string" });
        const domraWrapper = domra({ outputFormat: "wrapper" });
        const domraFirstNode = domra({ outputFormat: "first-node" });
        const domraNodeArray = domra({ outputFormat: "node-array" });
        const domraFragment = domra({ outputFormat: "fragment" });
        const domraCustomFunc = domra({ outputFormat: el => el.childNodes.length });

        new TestBox("empty string", (checker, domraInst) => {
            const result = domraInst ``;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "");
            }, domraWrapper)
            .add("first-node", result => {
                checkTextNode(result, "");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.deepEqual(result, []);
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 0);
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 0);
            }, domraCustomFunc)
            .run();

        new TestBox("string without html", (checker, domraInst) => {
            const h = "-";
            const result = domraInst `test${ h }1`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "test-1");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "test-1");
            }, domraWrapper)
            .add("first-node", result => {
                checkTextNode(result, "test-1");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 1);
                checkTextNode(result[0], "test-1");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 1);
                checkTextNode(result.childNodes[0], "test-1");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 1);
            }, domraCustomFunc)
            .run();

        new TestBox("string html with single root", (checker, domraInst) => {
            const result = domraInst `<div>test</div>`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 1);
                checkElement(result[0], "div", "test");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 1);
                checkElement(result.childNodes[0], "div", "test");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 1);
            }, domraCustomFunc)
            .run();

        new TestBox("string html with spaces", (checker, domraInst) => {
            const result = domraInst ` <div>test</div> `;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 1);
                checkElement(result[0], "div", "test");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 1);
                checkElement(result.childNodes[0], "div", "test");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 1);
            }, domraCustomFunc)
            .run();

        new TestBox("string html with 3 root elements", (checker, domraInst) => {
            const one = 1;
            const two = 2;
            const three = 3;
            const result = domraInst `<span>${ one }</span><span>${ two }</span><span>${ three }</span>`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<span>1</span><span>2</span><span>3</span>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<span>1</span><span>2</span><span>3</span>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "span", "1");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 3);
                checkElement(result[0], "span", "1");
                checkElement(result[1], "span", "2");
                checkElement(result[2], "span", "3");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 3);
                checkElement(result.childNodes[0], "span", "1");
                checkElement(result.childNodes[1], "span", "2");
                checkElement(result.childNodes[2], "span", "3");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 3);
            }, domraCustomFunc)
            .run();

        new TestBox("single w-element", (checker, domraInst) => {
            const element = createElement("div", "test");
            const result = domraInst `${ new WElement(element) }`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 1);
                checkElement(result[0], "div", "test");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 1);
                checkElement(result.childNodes[0], "div", "test");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 1);
            }, domraCustomFunc)
            .run();

        new TestBox("inner single w-element", (checker, domraInst) => {
            const element = createElement("span", "test");
            const result = domraInst `<div>${ new WElement(element) }</div>`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div><span>test</span></div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div><span>test</span></div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "<span>test</span>");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 1);
                checkElement(result[0], "div", "<span>test</span>");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 1);
                checkElement(result.childNodes[0], "div", "<span>test</span>");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 1);
            }, domraCustomFunc)
            .run();

        new TestBox("several w-elements", (checker, domraInst) => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraInst `${ new WElement(element1) }${ new WElement(element2) }`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test-1</div><div>test-2</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test-1</div><div>test-2</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test-1");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 2);
                checkElement(result[0], "div", "test-1");
                checkElement(result[1], "div", "test-2");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 2);
                checkElement(result.childNodes[0], "div", "test-1");
                checkElement(result.childNodes[1], "div", "test-2");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 2);
            }, domraCustomFunc)
            .run();

        new TestBox("text between w-elements", (checker, domraInst) => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-3");
            const result = domraInst `${ new WElement(element1) }test-2${ new WElement(element2) }`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test-1</div>test-2<div>test-3</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test-1</div>test-2<div>test-3</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test-1");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 3);
                checkElement(result[0], "div", "test-1");
                checkTextNode(result[1], "test-2");
                checkElement(result[2], "div", "test-3");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 3);
                checkElement(result.childNodes[0], "div", "test-1");
                checkTextNode(result.childNodes[1], "test-2");
                checkElement(result.childNodes[2], "div", "test-3");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 3);
            }, domraCustomFunc)
            .run();

        new TestBox("complex w-element", (checker, domraInst) => {
            const element = createTree(createElement("div"), [
                createElement("span", "test"), createElement("em", "-1")
            ]);

            const result = domraInst `${ new WElement(element) }`;

            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div><span>test</span><em>-1</em></div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div><span>test</span><em>-1</em></div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "<span>test</span><em>-1</em>");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 1);
                checkElement(result[0], "div", "<span>test</span><em>-1</em>");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 1);
                checkElement(result.childNodes[0], "div", "<span>test</span><em>-1</em>");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 1);
            }, domraCustomFunc)
            .run();

        new TestBox("single w-list", (checker, domraInst) => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraInst `${ new WList([element1, element2]) }`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test-1</div><div>test-2</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test-1</div><div>test-2</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test-1");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 2);
                checkElement(result[0], "div", "test-1");
                checkElement(result[1], "div", "test-2");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 2);
                checkElement(result.childNodes[0], "div", "test-1");
                checkElement(result.childNodes[1], "div", "test-2");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 2);
            }, domraCustomFunc)
            .run();

        new TestBox("text before w-list", (checker, domraInst) => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraInst `!!!!${ new WList([element1, element2]) }`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "!!!!<div>test-1</div><div>test-2</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "!!!!<div>test-1</div><div>test-2</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkTextNode(result, "!!!!");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 3);
                checkTextNode(result[0], "!!!!");
                checkElement(result[1], "div", "test-1");
                checkElement(result[2], "div", "test-2");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 3);
                checkTextNode(result.childNodes[0], "!!!!");
                checkElement(result.childNodes[1], "div", "test-1");
                checkElement(result.childNodes[2], "div", "test-2");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 3);
            }, domraCustomFunc)
            .run();

        new TestBox("text after w-list", (checker, domraInst) => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraInst `${ new WList([element1, element2]) }!!!!`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test-1</div><div>test-2</div>!!!!");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test-1</div><div>test-2</div>!!!!");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test-1");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 3);
                checkElement(result[0], "div", "test-1");
                checkElement(result[1], "div", "test-2");
                checkTextNode(result[2], "!!!!");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 3);
                checkElement(result.childNodes[0], "div", "test-1");
                checkElement(result.childNodes[1], "div", "test-2");
                checkTextNode(result.childNodes[2], "!!!!");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 3);
            }, domraCustomFunc)
            .run();

        new TestBox("text surround w-list", (checker, domraInst) => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraInst `!!!!${ new WList([element1, element2]) }!!!!`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "!!!!<div>test-1</div><div>test-2</div>!!!!");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "!!!!<div>test-1</div><div>test-2</div>!!!!");
            }, domraWrapper)
            .add("first-node", result => {
                checkTextNode(result, "!!!!");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 4);
                checkTextNode(result[0], "!!!!");
                checkElement(result[1], "div", "test-1");
                checkElement(result[2], "div", "test-2");
                checkTextNode(result[3], "!!!!");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 4);
                checkTextNode(result.childNodes[0], "!!!!");
                checkElement(result.childNodes[1], "div", "test-1");
                checkElement(result.childNodes[2], "div", "test-2");
                checkTextNode(result.childNodes[3], "!!!!");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 4);
            }, domraCustomFunc)
            .run();

        new TestBox("w-element & w-list", (checker, domraInst) => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const element3 = createElement("div", "test-3");
            const result = domraInst `${ new WElement(element1) }${ new WList([element2, element3]) }`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test-1</div><div>test-2</div><div>test-3</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test-1</div><div>test-2</div><div>test-3</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test-1");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 3);
                checkElement(result[0], "div", "test-1");
                checkElement(result[1], "div", "test-2");
                checkElement(result[2], "div", "test-3");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 3);
                checkElement(result.childNodes[0], "div", "test-1");
                checkElement(result.childNodes[1], "div", "test-2");
                checkElement(result.childNodes[2], "div", "test-3");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 3);
            }, domraCustomFunc)
            .run();

        new TestBox("several w-lists", (checker, domraInst) => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const element3 = createElement("div", "test-3");
            const result = domraInst `${ new WList([element1]) }${ new WList([element2, element3]) }`;
            checker(result);
        })
            .add("string", result => {
                assert.equal(result, "<div>test-1</div><div>test-2</div><div>test-3</div>");
            }, domraString)
            .add("wrapper", result => {
                checkElement(result, "div", "<div>test-1</div><div>test-2</div><div>test-3</div>");
            }, domraWrapper)
            .add("first-node", result => {
                checkElement(result, "div", "test-1");
            }, domraFirstNode)
            .add("node-array", result => {
                assert.equal(result.length, 3);
                checkElement(result[0], "div", "test-1");
                checkElement(result[1], "div", "test-2");
                checkElement(result[2], "div", "test-3");
            }, domraNodeArray)
            .add("fragment", result => {
                checkFragment(result, 3);
                checkElement(result.childNodes[0], "div", "test-1");
                checkElement(result.childNodes[1], "div", "test-2");
                checkElement(result.childNodes[2], "div", "test-3");
            }, domraFragment)
            .add("custom function", result => {
                assert.equal(result, 3);
            }, domraCustomFunc)
            .run();
    });

    describe("incorrect types", () => {
        it("not register preset", () => {
            assert.throws(() => {
                domra({ outputFormat: "unknown" }) ``; // eslint-disable-line no-unused-expressions
            }, "unknown outputFormat value: \"unknown\"");
        });

        it("wrong types", () => {
            [5, true, null, [], {}, /\s/].forEach(format => {
                assert.throws(() => {
                    domra({ outputFormat: format }) ``; // eslint-disable-line no-unused-expressions
                }, "outputFormat must be string or function");
            });
        });
    });
});
