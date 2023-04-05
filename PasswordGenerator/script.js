const inputSlider = document.querySelector("[data-lengthSliser]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const SymbolCheck = document.querySelector("#symbols");
const indictor = document.querySelector("[data-indecator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols =  '!~@#$%^&*(_+)?|;\'';

let password ="";
let passwordLength = 15;
let checkCount = 0;
handleSlider();
setIndictor("#ccc");

// set Password Length
  //THIS handleSlider() function == can reflect password to UI
 function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundsize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
 }

 //set Indicator

 function setIndictor(color){
    indictor.style.backgroundcolor = color;
 }
      //it give a random integer in between min and max
 function getRndInteger (min,max){
    return Math.floor(Math.random() * (max - min)) + min;

 }
   // it provide random number between 0-9
 function generateRandomNumber(){
    return getRndInteger(0,9);

 }
     // it gives random character between asci value between 97 to 123
 function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))

 }
 function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))

 }

function generateSymbol(){
     const randNum = getRndInteger(0, symbols.length);
     return symbols.charAt(randNum);
  }

  function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCaseCheck.checked) hasUpper = true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (SymbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    } else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym)  &&
        passwordLength >=6
    ){
        setIndictor("#ff0");
    }else {
        setIndictor("#f00");
    }

  }
        // it can copy the content which is display in the password fill
  async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout( () =>{
        copyMsg.classList.remove("active");
    },2000);

  }

    function shufflePassword(array){
        //fisher yates method

        for(let i =array.length-1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            const temp = array[i];
            array[i] = array[j];
            array[j]  = temp;
        }

        let str = "";
        array.forEach((el) => (str += el));
        return str;


    }


    function handcheckBoxChange(){
        checkCount= 0;
        allCheckBox.forEach( (checkbox) =>{
            if(checkbox.checked)
            checkCount++;
         });

         //special condition

         if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();

    }
}


   allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handcheckBoxChange);
   })
       //
  inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();

  })


         //if any value is there you can copy otherwise cant not
  copybtn.addEventListener('click', () => {
    if(passwordDisplay.value)
    copyContent();
  })
        //Generate password function
  generateBtn.addEventListener('click', () =>{
     //none of the checkbox are selected
     if(checkCount ==0)
     return;

     if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
     }

     //lets dtart the journey to find new password
       // remove old password

       password = "";

       //lets put the stuff mentioned by checkbox

    //    if(upperCaseCheck.checked){
    //     password += generateUpperCase();
    //    }

    //    if(lowerCaseCheck.checked){
    //     password += generateLowerCase();
    //    } 

    //    if(numbersCheck.checked){
    //     password += generateRandomNumber();
    //    } 

    //    if(SymbolCheck.checked){
    //     password += generateSymbol();
    //    }

      let funArr =[];
      if(upperCaseCheck.checked)
         funArr.push(generateUpperCase);

         if(lowerCaseCheck.checked)
         funArr.push(generateLowerCase);
           
         if(numberCheck.checked)
         funArr.push(generateRandomNumber);

         if(SymbolCheck.checked)
         funArr.push(generateSymbol);


         //Compulsory addition
         for(let i= 0; i<funArr.length; i++){
            password += funArr[i]();
         }

         //remaining addition

         for(let i =0; i<passwordLength-funArr.length; i++){
            let randIndex = getRndInteger (0 , funArr.length);
            password += funArr[randIndex]();
         }

         //shuffle the password

         password= shufflePassword(Array.from(password));

         //show in UI

         passwordDisplay.value = password;

         //calculate strrength

         calcStrength();
  });








