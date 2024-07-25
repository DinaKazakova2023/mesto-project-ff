export { enableValidation, clearValidation };

function isValid(form, input, validationConfig) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessadge, validationConfig);
    } else {
        hideInputError(form, input, validationConfig);
    }
}

function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (errorElement) {
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(config.errorClass);
    }
}

function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (errorElement) {
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
    }
}

function toggleButtonState(inputList, buttonElement, config) {
    const hasInvalidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid
    );
    if (buttonElement) {
        if (hasInvalidInput) {
            buttonElement.classList.add(config.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(config.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            inputElement.classList.add("input-touched");
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
        inputElement.addEventListener("focus", () => {
            hideInputError(formElement, inputElement, config);
        });
        inputElement.addEventListener("blur", () => {
            if (inputElement.value.length > 0) {
                inputElement.classList.add("input-touched");
                isValid(formElement, inputElement, config);
            }
        });
    });
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
}

function clearValidation(formElement, settings) {
    const inputList = Array.from(
        formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        settings.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
        inputElement.setCustomValidity("");
        hideInputError(formElement, inputElement, settings);
        inputElement.classList.remove("input-touched");
    });
    toggleButtonState(inputList, buttonElement, settings);
}

function isValidUrl(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
}