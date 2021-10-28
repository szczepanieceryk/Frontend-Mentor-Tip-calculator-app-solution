const billInput = document.getElementById('bill-input')! as HTMLInputElement;
const customTipInput= document.getElementById('inp-tip')! as HTMLInputElement;
const peopleNumInput = document.getElementById('people-num')! as HTMLInputElement;
const errorMsg = document.querySelector('.error-msg')!;
const tipButtons = document.querySelectorAll('.btn-tip')!;
const resetBtn = document.getElementById('btn-reset')! as HTMLButtonElement;
const tipAmountPerson = document.getElementById('tip-person')! as HTMLElement;
const totalAmountPerson = document.getElementById('amount-person')! as HTMLElement;

// default values for inputs and tip value (default 15%)
let billValue = 0.0;
let tipValue = 0.15;
let peopleNumber = 1;

// validation functions with regex
const validateFloat = (s)=>{
    let rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

const validateInt = (s) =>{
    let rgx = /^[0-9]*$/;
    return s.match(rgx);
}

// function to set the value of a bill
const setBillValue = () => {
    // if(billInput.value.includes(',')){
    //     billInput.value = billInput.value.replace(',', '.')
    // }
    if(!validateFloat(billInput.value)){
        billInput.value = billInput.value.substring(0,billInput.value.length-1);
    }

    billValue = parseFloat(billInput.value);

    calculateTip();
}
billInput.addEventListener('input',setBillValue);


// function to add active class for tip buttons
const handleClick = (event) => {
tipButtons.forEach(btn => {
    btn.classList.remove('active');

    if(event.target.innerHTML == btn.innerHTML){
        btn.classList.add('active');
        tipValue = parseFloat(btn.innerHTML)/100
    }
})

customTipInput.value = '';

calculateTip()
}

tipButtons.forEach(btn => {
    btn.addEventListener('click',handleClick)
})

// function for custom tip btn/input
const setTipCustomValue =() => {
    if(!validateInt(customTipInput.value)){
        customTipInput.value = customTipInput.value.substring(0,customTipInput.value.length-1)
    }
//    tipValue = parseFloat(customTipInput.value/100)

tipButtons.forEach(btn=>{
    btn.classList.remove('active')
})
if(customTipInput.value !== ''){
    calculateTip()
  }
}   
customTipInput.addEventListener('input',setTipCustomValue)
   

// function for number of people input
const setPeopleValue = () =>{
   if(!validateInt(peopleNumInput.value)){
       peopleNumInput.value = peopleNumInput.value.substring(0,peopleNumInput.value.length-1)
   }
   peopleNumber = parseFloat(peopleNumInput.value);
   if(peopleNumber <=0){
      errorMsg.classList.add('show-error-msg');
      setTimeout(()=>{
          errorMsg.classList.remove('show-error-msg')
      },3000);
   }
    calculateTip()
}
peopleNumInput.addEventListener('input',setPeopleValue);

// main function to calculate tip and total values per person 
const calculateTip = ():void => {
    if(peopleNumber >=1){
        let tipAmount = billValue * tipValue / peopleNumber;
        let total = billValue * (tipValue + 1) / peopleNumber;

        if(tipAmount !== 0){
            resetBtn.classList.add('active')
            }

        tipAmountPerson.innerHTML = '$' + tipAmount.toFixed(2)
        totalAmountPerson.innerHTML = '$' + total.toFixed(2)
    }
}

// function to reset/set to default inputs and tip summary values
const reset = () => {

    billInput.value = '0.0';
    setBillValue();

    peopleNumInput.value = '1';
    
    setPeopleValue();

    resetBtn.classList.remove('active');
}
resetBtn.addEventListener('click',reset);