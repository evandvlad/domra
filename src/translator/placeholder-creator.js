const generateId = (function() {
    let index = 0;

    return function() {
        index += 1;

        return [
            Date.now(),
            Math.random().toString().slice(0, 32),
            index
        ].join("-");
    };
}());

export default {
    create(tag, attr) {
        const id = generateId();

        return {
            id,
            value: `<${tag} ${attr}="${id}"></${tag}>`
        };
    }
};
