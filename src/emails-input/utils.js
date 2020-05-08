export const checkValueForEmptyAndFormat = (value) => {
    const formattedValue = value.replace(/ |\r|\n|/g, '');
    if (!formattedValue || formattedValue.length === 0) {
        return false
    }
    return formattedValue;
};

export const checkValid = (email) => {
    const regexp = /^([\w-\+_\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return regexp.test(email.toLowerCase());
};
