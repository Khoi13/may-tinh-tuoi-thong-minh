"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = $('#root');

const heading = document.createElement('h1');
const input = document.createElement('input');
const submitButton = document.createElement('button');
const result = document.createElement('p');

heading.innerText = 'Máy tính tuổi thông minh';
submitButton.innerText = 'Submit';
input.placeholder = 'Nhập tuổi của bạn...';

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
    const temp = value;
    const valueParse = parseInt(value);

    return {
        isANumber: temp == valueParse ? true : false,
        isValidNumber: valueParse >= 0 ? true : false,
        valueParse
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

const outputs = (value) => ([
    [[], [], [], [], []],
    [],
    []
])

const handleOutput = (value) => {
    const receive = validate(value);
    let output = '';

    switch (receive.isValid) {
        case VALID:
            if (receive.valueParse < 10) {
                output += `Mới ${value} tuổi à, trả điện thoại cho bố mẹ đi nhóc!`;
            }
            else if (receive.valueParse < 50) {
                output += `Bạn đã ${value} tuổi rồi!`;
            }
            else if (receive.valueParse < 70) {
                output += `Con chào Bác, Bác đã ${value} tuổi!`;
            }
            else if (receive.valueParse <= 120) {
                output += `Con chào Cụ 🙏, Cụ đã ${value} tuổi!`;
            }
            else {
                output += `${value} tuổi????, Cụ đến từ nơi nào????`;
            };
            break;
        case MISSING:
            output += 'Đã nhập gì đâu mà tính';
            break;
        case INVALID:
            output += `${value}???, đây là tuổi à`;
            break;
        default:
            throw new Error('invalid input')
    }

    return output;
};

const handleSubmit = (element) => {
    return () => {
        element.innerText = handleOutput(value.value);
        app.appendChild(element);
        value.value = '';
        input.focus();
    };
};

const handleKeySubmit = (element) => {
    return (e) => e.keyCode === 13 ? handleSubmit(element)() : null;
};

submitButton.onclick = handleSubmit(result);
document.onkeydown = handleKeySubmit(result);

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

input.oninput = (e) => {
    value.value = e.target.value.trim();
    handleResultClassName(value.value, result)
};



app.appendChild(heading);
app.appendChild(input);
app.appendChild(submitButton);