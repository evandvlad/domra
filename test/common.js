import domra, { WElement, WList } from "../";
import { assert } from "chai";

describe("common", () => {
    function createDOMElement(tag, html = "") {
        const element = document.createElement(tag);

        if (html) {
            element.innerHTML = html;
        }

        return element;
    }

    function checkTextNode(node, text) {
        assert(node instanceof Text);
        assert.equal(node.nodeType, 3);
        assert.equal(node.textContent, text);
    }

    function checkDOMElement(node, tag, html) {
        assert(node instanceof Element);
        assert.equal(node.nodeType, 1);
        assert.equal(node.tagName.toLowerCase(), tag);
        assert.equal(node.innerHTML, html);
    }

    it("single text", () => {
        const result = domra() `test`;
        checkTextNode(result, "test");
    });

    it("single tag as string", () => {
        const result = domra() `<div></div>`;
        checkDOMElement(result, "div", "");
    });

    it("simple variable", () => {
        const variable = "test";
        const result = domra() `${ variable }`;
        checkTextNode(result, "test");
    });

    it("correct process array variable", () => {
        const variable = ["test", "!!!"];
        const result = domra() `${ variable }`;
        checkTextNode(result, "test,!!!");
    });

    it("correct process object variable", () => {
        const variable = {};
        const result = domra() `${ variable }`;
        checkTextNode(result, "[object Object]");
    });

    it("correct process DOM element without wrapper", () => {
        const element = createDOMElement("div");
        const result = domra() `${ element }`;
        checkTextNode(result, "[object HTMLDivElement]");
    });

    it("correct process NodeList without wrapper", () => {
        const elements = createDOMElement("div", "<span></span><span></span>").querySelectorAll("span");
        const result = domra() `${ elements }`;
        checkTextNode(result, "[object NodeList]");
    });

    it("w-element", () => {
        const div = createDOMElement("div");
        const result = domra() `${ new WElement(div) }`;
        checkDOMElement(result, "div", "");
    });

    it("inner w-element", () => {
        const span = createDOMElement("span", "test");
        const result = domra() `<div>${ new WElement(span) }</div>`;
        checkDOMElement(result, "div", "<span>test</span>");
    });

    it("inner w-list", () => {
        const span1 = createDOMElement("span", "1");
        const span2 = createDOMElement("span", "2");
        const result = domra() `<div>${ new WList([ span1, span2 ]) }</div>`;
        checkDOMElement(result, "div", "<span>1</span><span>2</span>");
    });

    it("return first node by default", () => {
        const result = domra() `test<div></div>`;
        checkTextNode(result, "test");
    });

    it("nested call", () => {
        const result = domra() `${ new WElement(domra() `test`) }`;
        checkTextNode(result, "test");
    });

    it("use as function", () => {
        const span = createDOMElement("span", "test");
        const result = domra()(["<div>", "</div>"], new WElement(span));
        checkDOMElement(result, "div", "<span>test</span>");
    });

    it("check event handler", () => {
        const span = createDOMElement("span", "0");

        span.addEventListener("click", () => {
            span.innerHTML = Number(span.innerHTML) + 1;
        }, false);

        const result = domra() `<div>${ new WElement(span) }</div>`;
        checkDOMElement(result, "div", "<span>0</span>");

        span.dispatchEvent(new Event("click"));
        checkDOMElement(result, "div", "<span>1</span>");

        span.dispatchEvent(new Event("click"));
        checkDOMElement(result.querySelector("span"), "span", "2");
    });

    it("don't clone nodes for w-element", () => {
        const span = createDOMElement("span", "test");
        const result = domra() `<div>${ new WElement(span) }${ new WElement(span) }</div>`;
        checkDOMElement(result, "div", "<span>test</span>");
    });

    it("don't clone nodes for w-list", () => {
        const span = createDOMElement("span", "test");
        const result = domra() `<div>${ new WList([span, span]) }</div>`;
        checkDOMElement(result, "div", "<span>test</span>");
    });

    it("complex markup", () => {
        const h1 = createDOMElement("h1", "Lorem ipsum");
        const p1 = createDOMElement("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        const p2 = createDOMElement("p", "Proin commodo mi non maximus tempus.");
        const p3 = createDOMElement("p", "Donec tempus a mi eu facilisis.");
        const tag = "article";

        const result =
            domra() `<${ tag }><header>${ new WElement(h1) }</header>${ new WList([p1, p2, p3]) }</${ tag }>`;

        checkDOMElement(result, "article",
            "<header><h1>Lorem ipsum</h1></header>" +
            "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>" +
            "<p>Proin commodo mi non maximus tempus.</p>" +
            "<p>Donec tempus a mi eu facilisis.</p>"
        );
    });
});