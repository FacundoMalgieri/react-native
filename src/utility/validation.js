const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(val);
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case 'isPass':
                isValid = isValid && passValidator(val);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            default:
                isValid = true;
        }
    }
    return isValid;
};

const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};

const passValidator = val => {
    return /^(((?=.*[a-z])(?=.*[A-Z]))+((?=.*[a-z])(?=.*[0-9]))+((?=.*[A-Z])(?=.*[0-9])))(?=.)/.test(val);
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

export default validate;