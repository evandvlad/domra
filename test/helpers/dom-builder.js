export function createElement(tag, html = "") {
    const element = document.createElement(tag);
    element.innerHTML = html;
    return element;
}

export function createTree(parent, children = []) {
    children.forEach(child => {
        parent.appendChild(child);
    });

    return parent;
}
