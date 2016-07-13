/* global describe, it, Event */

import domra, { WElement, WList } from "../../";
import { checkTextNode, checkElement } from "../helpers/dom-checker";
import { createElement } from "../helpers/dom-builder";
import { assert } from "chai";

describe("common", () => {
    it("single text", () => {
        const result = domra() `test`;
        checkTextNode(result, "test");
    });

    it("single tag as string", () => {
        const result = domra() `<div></div>`;
        checkElement(result, "div", "");
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
        const element = createElement("div");
        const result = domra() `${ element }`;
        checkTextNode(result, "[object HTMLDivElement]");
    });

    it("correct process NodeList without wrapper", () => {
        const elements = createElement("div", "<span></span><span></span>").querySelectorAll("span");
        const result = domra() `${ elements }`;
        checkTextNode(result, "[object NodeList]");
    });

    it("w-element", () => {
        const div = createElement("div");
        const result = domra() `${ new WElement(div) }`;
        checkElement(result, "div", "");
    });

    it("inner w-element", () => {
        const span = createElement("span", "test");
        const result = domra() `<div>${ new WElement(span) }</div>`;
        checkElement(result, "div", "<span>test</span>");
    });

    it("inner w-list", () => {
        const span1 = createElement("span", "1");
        const span2 = createElement("span", "2");
        const result = domra() `<div>${ new WList([ span1, span2 ]) }</div>`;
        checkElement(result, "div", "<span>1</span><span>2</span>");
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
        const span = createElement("span", "test");
        const result = domra()(["<div>", "</div>"], new WElement(span));
        checkElement(result, "div", "<span>test</span>");
    });

    it("check event handler", () => {
        const span = createElement("span", "0");

        span.addEventListener("click", () => {
            span.innerHTML = Number(span.innerHTML) + 1;
        }, false);

        const result = domra() `<div>${ new WElement(span) }</div>`;
        checkElement(result, "div", "<span>0</span>");

        span.dispatchEvent(new Event("click"));
        checkElement(result, "div", "<span>1</span>");

        span.dispatchEvent(new Event("click"));
        checkElement(result.querySelector("span"), "span", "2");
    });

    it("don't clone nodes for w-element", () => {
        const span = createElement("span", "test");
        const result = domra() `<div>${ new WElement(span) }${ new WElement(span) }</div>`;
        checkElement(result, "div", "<span>test</span>");
    });

    it("don't clone nodes for w-list", () => {
        const span = createElement("span", "test");
        const result = domra() `<div>${ new WList([span, span]) }</div>`;
        checkElement(result, "div", "<span>test</span>");
    });

    it("correct process placeholders", () => {
        const div = createElement("var", "test");
        div.setAttribute("data-domra-id", "987654321");
        const result = domra() `<var data-domra-id="123456789">${ new WElement(div) }</var>`;
        
        checkElement(result, "var", "<var data-domra-id=\"987654321\">test</var>");
        assert.equal(result.getAttribute("data-domra-id"), "123456789");
    });

    it("complex markup", () => {
        const h1 = createElement("h1", "Lorem ipsum");
        const p1 = createElement("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        const p2 = createElement("p", "Proin commodo mi non maximus tempus.");
        const p3 = createElement("p", "Donec tempus a mi eu facilisis.");
        const tag = "article";

        const result =
            domra() `<${ tag }><header>${ new WElement(h1) }</header>${ new WList([p1, p2, p3]) }</${ tag }>`;

        checkElement(result, "article",
            "<header><h1>Lorem ipsum</h1></header>" +
            "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>" +
            "<p>Proin commodo mi non maximus tempus.</p>" +
            "<p>Donec tempus a mi eu facilisis.</p>"
        );
    });
});