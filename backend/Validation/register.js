const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";

    const nameRegex = /^[a-z][a-z0-9_.]*$/;

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    } else {
        if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
            errors.name = "Name must be between 2 and 20 characters";
        } else {
            if (!nameRegex.test(data.name)) {
                errors.name =
                    "username can contain only a-z 0-9 dot(.) underline(_)";
            }
        }
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password field is required";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    if (!Validator.isLength(data.phone, { min: 10, max: 10 })) {
        errors.phone = "Phone Must be 10 Digit";
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone Number Is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
