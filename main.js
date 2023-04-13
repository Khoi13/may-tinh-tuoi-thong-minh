"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = $('#app');

const heading = document.createElement('h1');
const input = document.createElement('input');
const submitButton = document.createElement('button');
const result = document.createElement('p');
const wrapper = document.createElement('div')

heading.innerText = 'Máy tính tuổi thông minh';
heading.classList.add('heading')

submitButton.innerText = 'Submit';
submitButton.classList.add('submitBtn');

input.placeholder = 'Nhập tuổi của bạn...';
input.classList.add('input');

result.classList.add('result');

wrapper.classList.add('wrapper')

const VALID = 'VALID';
const MISSING = 'MISSING';
const INVALID = 'INVALID';

let value = (function (element) {
    return {
        set value(newValue) {
            element.value = newValue;
        },

        get value() {
            return element.value;
        }
    }
})(input);

const checkIsNumber = (value) => {
    if (!isNaN(value) && value !== '') {
        value = +value
    }

    return {
        isANumber: !isNaN(value) && value !== '',
        isValidNumber: value >= 0 ? true : false,
        value
    };
};
const validate = (value) => {
    const status = checkIsNumber(value);
    let isValid = '';

    if (status.isANumber && status.isValidNumber) {
        isValid += VALID;
    } else if (value == '') {
        isValid += MISSING;
    }
    else {
        isValid += INVALID;
    }

    return { isValid, ...status }
};

const handleResultClassName = (value, element) => {
    const { isValid } = validate(value)
    switch (isValid) {
        case VALID:
            element.classList.remove('invalid', 'missing');
            element.classList.add('valid');
            break;
        case MISSING:
            element.classList.remove('valid', 'invalid');
            element.classList.add('missing');
            break;
        case INVALID:
            element.classList.remove('valid', 'missing');
            element.classList.add('invalid');
            break;
        default:
            throw new Error('lỗi')
    }

};

const handleOutput = (value) => {
    const receive = validate(value);
    value = receive.value
    let output = '';

    switch (receive.isValid) {
        case VALID:
            handleResultClassName(value, result)

            if (value < 10) {
                output += `Mới ${value} tuổi à, trả điện thoại cho bố mẹ đi nhóc!`;
            }
            else if (value < 50) {
                output += `Bạn đã ${value} tuổi rồi!`;
            }
            else if (value < 70) {
                output += `Con chào Bác, Bác đã ${value} tuổi!`;
            }
            else if (value <= 120) {
                output += `Con chào Cụ 🙏, Cụ đã ${value} tuổi!`;
            }
            else {
                output += `${value} tuổi????, Cụ đến từ nơi nào????`;
            };
            break;
        case MISSING:
            handleResultClassName(value, result)
            output += 'Đã nhập gì đâu mà tính';
            break;
        case INVALID:
            handleResultClassName(value, result)
            output += `${value}???, đây là tuổi à`;
            break;
        default:
            throw new Error('invalid input')
    }

    return output;
};

const handleSubmit = (parent, element) => {
    return () => {
        element.innerText = handleOutput(value.value);
        parent.appendChild(element);
        value.value = '';
        input.focus();
    };
};

const handleKeySubmit = (element) => {
    return (e) => e.keyCode === 13 ? handleSubmit(app, element)() : null;
};

submitButton.onclick = handleSubmit(app, result);
document.onkeydown = handleKeySubmit(result);

input.oninput = (e) => {
    value.value = e.target.value.trim();
    handleResultClassName(value.value, input)
};

app.appendChild(heading);
wrapper.appendChild(input);
wrapper.appendChild(submitButton);
app.appendChild(wrapper)