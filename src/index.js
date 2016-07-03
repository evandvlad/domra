function domra() {
    return function(strings, ...values) {
        return strings.reduce((acc, str, index) => {
            if (index > 0) {
                if (values.length) {
                    acc += values.shift();
                }
            }

            return acc + str;
        }, "");
    };
}

export { domra as default };