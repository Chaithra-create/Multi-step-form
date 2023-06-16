const navigateToFormStep = (stepNo) => {
    // Hide all form steps
    document.querySelectorAll('.form-step').forEach((formStepEl) => {
        formStepEl.classList.add('d-none');
    })
  //show the current form step
    document.querySelector('#step-' + stepNo).classList.remove('d-none');
    //highlight step number
    document.querySelectorAll('.form-stepper-circle').forEach((step) =>
    {
      step.classList.remove('form-stepper-active');
    })
    const stepCircle = document.querySelector('span[step="' + stepNo + '"]');
    stepCircle.classList.add('form-stepper-active');
 }


document.querySelectorAll('.btn-navigate-form-step').forEach((formNavBtn) => {
   formNavBtn.addEventListener('click',() => {
    const stepNo = parseInt(formNavBtn.getAttribute('stepNumber'));
    if(stepNo == 2){
      var formState = validateForm();
        formState ? navigateToFormStep(stepNo) : validateForm(); 
    }
    else if (stepNo == 3){
      getSummary.addItem(cardSelected,timePeriod,price);
      var editEl = document.querySelector('.showPlan');
      editEl.querySelector('.planSelected').innerHTML = cardSelected;
      editEl.querySelector('.timePeriod').innerHTML = "("+timePeriod+")";
      editEl.querySelector('.price').innerHTML = price;
      navigateToFormStep(stepNo);
    }
    else if(stepNo == 4){
getSummary.displayItem();
           navigateToFormStep(stepNo);
    }
 else{
  navigateToFormStep(stepNo);
 }
});
})

document.querySelector('#checkToggle').addEventListener('change', () => {
      (document.querySelector('#checkToggle').checked)?  
      (document.querySelector('.option2').classList.add('change-color')
      +
      document.querySelector('.option1').classList.remove('change-color')
      +
      (timePeriod = 'Yearly')
      )
      :  (document.querySelector('.option1').classList.add('change-color') 
      +
      document.querySelector('.option2').classList.remove('change-color')
      +
      ((timePeriod = 'Monthly'))
      )
      
})

//validate form
function validateForm() {
  var name = document.myForm.name.value;
  var email = document.myForm.Email.value;
  var phone = document.myForm.phone.value;
  if(name == ''){
   document.querySelector('.name-err').classList.remove('d-none');
  }
  else{
    document.querySelector('.name-err').classList.add('d-none');
  }
  if(email == ''){
    document.querySelector('.email-err').classList.remove('d-none');
  }
  else{
    document.querySelector('.email-err').classList.add('d-none');
  }
  if(phone == ''){
    document.querySelector('.phone-err').classList.remove('d-none');
  }
  else{
    document.querySelector('.phone-err').classList.add('d-none');
  }
  if(name !== '' && email !== '' && phone !== ''){
     document.querySelectorAll('.err-div').forEach((el) => {
       el.classList.add('d-none');
     })
    return true;
  }
}

//Plan selected
document.querySelectorAll('.card').forEach((el) => {
  prevCard = null;
  el.classList.remove('selected');
  el.addEventListener('click', (e)=> {
     cardSelected = el.querySelector('.card-title').innerHTML;
     price = el.querySelector('.card-text').innerHTML;
     if(e.target){
      e.target.classList.add('selected');
     }
     if(prevCard !== null){
      prevCard.classList.remove('selected');
     }
     prevCard = e.target;
  })
})

//add-ons
document.querySelectorAll('.form-check').forEach((el) => {
  el.addEventListener('click', () => {
   if(el.querySelector('.form-check-input').checked){
    type = el.querySelector('.form-check-input').value;
    addPrice = el.querySelector('.price').innerHTML;
    getSummary.updateItem(type,addPrice);
   }
else{
  type = el.querySelector('.form-check-input').value;
getSummary.deleteItem(type);
}
    
  })
  
})

//Summary

var getSummary = (function() {
  

  //constructor
  function Plan(name,timePeriod,price){
    this.name = name;
    this.timePeriod = timePeriod;
    this.price = price;
  } 

  function addOns(type,price){
    this.type = type;
    this.price = price;
  }

  var obj ={};
  timePeriod = 'Monthly';
obj.addItem = function(name,timePeriod,price){
  cart = [];
  var plan = new Plan(name,timePeriod,price);
  cart.push(plan);
}

cart1 = [];
obj.updateItem = function(type,price){
  var addOn = new addOns(type,price);
  cart1.push(addOn);
}

obj.deleteItem = function(name){
for(var item in cart1){
  if(cart1[item].type === name){
cart1.splice(item,1);
summaryEl.querySelector('.added-' + item).innerHTML = "";
    summaryEl.querySelector('.price-' + item).innerHTML = ""; 
break;
  }
}
}

obj.displayItem = function(){
  summaryEl = document.querySelector('.add-ons');
  summaryEl.querySelector('.added-0').innerHTML = '';
  summaryEl.querySelector('.added-1').innerHTML = '';
  summaryEl.querySelector('.added-2').innerHTML = '';
  summaryEl.querySelector('.price-0').innerHTML = '';
  summaryEl.querySelector('.price-1').innerHTML = '';
  summaryEl.querySelector('.price-2').innerHTML = '';
  total = 0;
  for(var i in cart1){
    summaryEl.querySelector('.added-' + i).innerHTML = cart1[i].type;
    summaryEl.querySelector('.price-' + i).innerHTML = cart1[i].price; 
    total+=Number(cart1[i].price.match(/\d+/));
  }
  total+=Number(price.match(/\d+/));
  var totalEl = document.querySelector('.Total');
  totalEl.querySelector('.totalPrice').innerHTML = '+$'+total+'/mo';
}

return obj;
})();








