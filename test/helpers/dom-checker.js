/* global Text, Element, DocumentFragment */

import { assert } from "chai";

export function checkTextNode(node, text) {
    assert(node instanceof Text);
    assert.equal(node.nodeType, 3);
    assert.equal(node.textContent, text);
}

export function checkElement(node, tag, html) {
    assert(node instanceof Element);
    assert.equal(node.nodeType, 1);
    assert.equal(node.tagName.toLowerCase(), tag);
    assert.equal(node.innerHTML, html);
}

export function checkFragment(node, childrenCount) {
    assert(node instanceof DocumentFragment);
    assert.equal(node.childNodes.length, childrenCount);
}
