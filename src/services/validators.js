class ValidatorService {
    static #validateEmptyEmail(email) {
        return !email ? "Email is required." : "";
    }

    static #validateInvalidEmail(email) {
        return !/\S+@\S+\.\S+/.test(email) ? "Email is invalid." : ""; 
    }

    static validateEmail(email) {
        return ValidatorService.#validateEmptyEmail(email)
            || ValidatorService.#validateInvalidEmail(email);
    }

    static #validateEmptyPassword(password) {
        return !password ? "Password is required." : "";
    }

    static validatePassword(password) {
        return ValidatorService.#validateEmptyPassword(password);
    }
}

export default ValidatorService;