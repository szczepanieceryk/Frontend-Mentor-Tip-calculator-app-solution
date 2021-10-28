var billInput = document.getElementById('bill-input');
var customTipInput = document.getElementById('inp-tip');
var peopleNumInput = document.getElementById('people-num');
var errorMsg = document.querySelector('.error-msg');
var tipButtons = document.querySelectorAll('.btn-tip');
var resetBtn = document.getElementById('btn-reset');
var tipAmountPerson = document.getElementById('tip-person');
var totalAmountPerson = document.getElementById('amount-person');
var billValue = 0.0;
var tipValue = 0.15;
var peopleNumber = 1;
var validateFloat = function (s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
};
var validateInt = function (s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
};
var setBillValue = function () {
    // if(billInput.value.includes(',')){
    //     billInput.value = billInput.value.replace(',', '.')
    // }
    if (!validateFloat(billInput.value)) {
        billInput.value = billInput.value.substring(0, billInput.value.length - 1);
    }
    billValue = parseFloat(billInput.value);
    calculateTip();
};
billInput.addEventListener('input', setBillValue);
var handleClick = function (event) {
    tipButtons.forEach(function (btn) {
        btn.classList.remove('active');
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('active');
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    });
    customTipInput.value = '';
    calculateTip();
};
tipButtons.forEach(function (btn) {
    btn.addEventListener('click', handleClick);
});
var setTipCustomValue = function () {
    if (!validateInt(customTipInput.value)) {
        customTipInput.value = customTipInput.value.substring(0, customTipInput.value.length - 1);
    }
    //    tipValue = parseFloat(customTipInput.value/100)
    tipButtons.forEach(function (btn) {
        btn.classList.remove('active');
    });
    if (customTipInput.value !== '') {
        calculateTip();
    }
};
customTipInput.addEventListener('input', setTipCustomValue);
var setPeopleValue = function () {
    if (!validateInt(peopleNumInput.value)) {
        peopleNumInput.value = peopleNumInput.value.substring(0, peopleNumInput.value.length - 1);
    }
    peopleNumber = parseFloat(peopleNumInput.value);
    if (peopleNumber <= 0) {
        errorMsg.classList.add('show-error-msg');
        setTimeout(function () {
            errorMsg.classList.remove('show-error-msg');
        }, 3000);
    }
    calculateTip();
};
peopleNumInput.addEventListener('input', setPeopleValue);
var calculateTip = function () {
    if (peopleNumber >= 1) {
        var tipAmount = billValue * tipValue / peopleNumber;
        var total = billValue * (tipValue + 1) / peopleNumber;
        if (tipAmount !== 0) {
            resetBtn.classList.add('active');
        }
        tipAmountPerson.innerHTML = '$' + tipAmount.toFixed(2);
        totalAmountPerson.innerHTML = '$' + total.toFixed(2);
    }
};
var reset = function () {
    billInput.value = '0.0';
    setBillValue();
    peopleNumInput.value = '1';
    setPeopleValue();
    resetBtn.classList.remove('active');
};
resetBtn.addEventListener('click', reset);
