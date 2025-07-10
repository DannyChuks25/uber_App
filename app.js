let uberForm = document.getElementById("uberForm");
let paroo;
let pickup;
let dropout;
let timer = document.getElementById("timer");
let message = document.getElementById("message");
let message2 = document.getElementById("message2");
let cancel = document.getElementById("cancel");
let start = document.getElementById("start");
let receipt = document.getElementById("receipt");
let back = document.getElementById("back");

let stopBtn = document.getElementById("stop");
let contdBtn = document.getElementById("continue");
let pauseBtn = document.getElementById("pause");

let hr = document.getElementById("hr");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;


uberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    pickup = document.getElementById("pickup").value;
    dropout = document.getElementById("dropout").value;
    console.log(pickup);
    console.log(dropout);
    let isValid = true;

    // Validate pickup
    if (pickup === "") {
        pickupFeedback.textContent = "Enter a location";
        pickupFeedback.style.color = "rgb(253, 5, 5)";
        isValid = false;
    } else if (pickup.length < 2) {
        pickupFeedback.textContent = "Location must be at least two characters long";
        pickupFeedback.style.color = "rgb(253, 5, 5)";
        isValid = false;
    } else if (!pickupLocationFormat.test(pickup)) {
        pickupFeedback.textContent = "Only letters are allowed";
        pickupFeedback.style.color = "rgb(253, 5, 5)";
        isValid = false;
    } else {
        pickupFeedback.textContent = "Location is valid";
        pickupFeedback.style.color = "rgb(7, 252, 7)";
    }

    // Validate dropout
    if (dropout === "") {
        dropoutFeedback.textContent = "Enter a location";
        dropoutFeedback.style.color = "rgb(253, 5, 5)";
        isValid = false;
    } else if (dropout.length < 2) {
        dropoutFeedback.textContent = "Location must be at least two characters long";
        dropoutFeedback.style.color = "rgb(253, 5, 5)";
        isValid = false;
    } else if (!dropoutLocationFormat.test(dropout)) {
        dropoutFeedback.textContent = "Only letters are allowed";
        dropoutFeedback.style.color = "rgb(253, 5, 5)";
        isValid = false;
    } else {
        dropoutFeedback.textContent = "Location is valid";
        dropoutFeedback.style.color = "rgb(7, 252, 7)";
    }

    if (!isValid) {
        e.preventDefault(); // Prevent form submission
        return;
    }


    paroo = document.getElementById("paroo");
    paroo.style.display = "block";
    document.querySelector(".overlay").style.display = "block";
    message.innerHTML = `You are requesting <br> a ride from ${pickup} to ${dropout}`;
});

// Form Validation
let pickupLocationFormat = /^[A-Za-z\s'-,]{2,}$/;
// let pickupLocationFormat = /^([A-Za-z]+[-,][A-Za-z]+)*)(\s+([A-Za-z]+([-,][A-Za-z]+)*)){0,2}$/;
let dropoutLocationFormat = /^[A-Za-z\s'-,]{2,}$/;
let dropoutFeedback = document.getElementById("dropoutFeedback");
let pickupFeedback = document.getElementById("pickupFeedback");
document.getElementById("pickup").addEventListener("keyup",() => {
    pickup = document.getElementById("pickup").value;
    dropout = document.getElementById("dropout").value;
    if(pickup === ""){
        pickupFeedback.textContent = "Enter a Location";
        pickupFeedback.style.color = "rgb(253, 5, 5)";
        return;
    }
    else if(pickup.length < 2){
        pickupFeedback.textContent = "Location must be at least two characters long";
        pickupFeedback.style.color = "rgb(253, 5, 5)";
    }
    // console.log(pickup.length);
    else if(!pickupLocationFormat.test(pickup)){
        pickupFeedback.textContent = "Location is inValid";
        pickupFeedback.style.color = "rgb(253, 5, 5)";
    }
    else{
        pickupFeedback.textContent = "Location is Valid";
        pickupFeedback.style.color = "rgb(7, 252, 7)";
    }
})
document.getElementById("dropout").addEventListener("keyup",() => {
    pickup = document.getElementById("pickup").value;
    dropout = document.getElementById("dropout").value;
    if(dropout === ""){
        dropoutFeedback.textContent = "Enter a Location";
        dropoutFeedback.style.color = "rgb(253, 5, 5)";
        return;
    }
    else if(dropout.length < 2){
        dropoutFeedback.textContent = "Location must be at least two characters long";
        dropoutFeedback.style.color = "rgb(253, 5, 5)";
    }
    else if(!dropoutLocationFormat.test(dropout)){
        dropoutFeedback.textContent = "Enter a valid location!";
        dropoutFeedback.style.color = "rgb(253, 5, 5)";
    } 
    else{
        dropoutFeedback.textContent = "Location is Valid";
        dropoutFeedback.style.color = "rgb(7, 252, 7)";
    }
})


cancel.onclick = function(){
    paroo.style.display = "none";
    timer.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
}

function getTime(){
    let pickupPlace = document.getElementById("pickupPlace");
    let dropoutPlace = document.getElementById("dropoutPlace");
    let pickupTime = document.getElementById("pickupTime");
    let dropoutTime = document.getElementById("dropoutTime");

    let hr = new Date().getHours();
    let min = new Date().getMinutes();
    let session = "am";
    if(hr>12){
        hr -= 12;
        session="pm";
    }
    min = (min < 10) ? "0" + min : min;
    // console.log(`${hr}:${min}${session}`);

    pickupPlace.textContent = pickup;
    dropoutPlace.textContent = dropout;

    return {hr, min, session};
    // pickupTime.textContent = `${hr}:${min}${session}`;
    // dropoutTime.textContent = `${hr}:${min}${session}`;
}

start.onclick = function(){
    paroo.style.display = "none";
    document.querySelector(".overlay").style.display = "block";
    timer.style.display = "block";
   
    message2.innerHTML = `You are now moving from <br> ${pickup} to ${dropout}`;

    clearInterval(interval);
    interval = setInterval(startTimer, 1000);

    const {hr, min, session} = getTime();
    console.log(`${hr}:${min}${session}`);
    pickupTime.textContent = `${hr}:${min}${session}`;
    
}

let startTimer = () => {
    seconds++;
    sec.innerHTML = "0" + seconds;
    if(seconds > 9){
        sec.innerHTML = seconds;
    }
    if(seconds > 59){
        minutes++;
        min.innerHTML = "0" + minutes;
        seconds = 0;
        sec.innerHTML = "0" + 0;
    }
    if(minutes > 9){
        min.innerHTML = minutes;
    }
    if(minutes > 59){
        hours++;
        hr.innerHTML = "0" + hours;
        minutes = 0;
        min.innerHTML = "0" + 0;
    }
}

pauseBtn.onclick = function(){
    clearInterval(interval);
    pauseBtn.style.display = "none";
    contdBtn.style.display = "block";
}

contdBtn.onclick = function(){
    clearInterval(interval);
    interval = setInterval(startTimer, 1000);
    pauseBtn.style.display = "block";
    contdBtn.style.display = "none";
}

stopBtn.onclick = function(){
    clearInterval(interval);
    savedTime = `${hours}:${minutes}:${seconds}`;
    savedTime = String(savedTime);
    // console.log(savedTime);

    timer.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    uberForm.style.display = "none";

    let timeFare = document.getElementById("time-fare");
    let initialTotal = document.getElementById("initial-total");
    let tax = document.getElementById("tax");
    let totalAmt = document.getElementById("total-amount");

    let yourTimeFare = `${(parseInt(hours)*100)+(parseInt(minutes)*100)+(parseInt(seconds)*100/60)}`;
    // console.log(yourTimeFare);
    // console.log(typeof(yourTimeFare));
    
    let yourInitialTotal = parseFloat(yourTimeFare) + 1000;
    // console.log(`Result: ${yourInitialTotal}`);
    
    let yourTax = yourInitialTotal * 0.1;
    let totalAmount = yourInitialTotal + yourTax;
    // console.log(`Initial Total: ${yourInitialTotal}`);
    // console.log(`Tax: ${yourTax}`);
    // console.log(yourInitialTotal + yourTax);

    receipt.style.display = "block";

    const {hr, min, session} = getTime();
    console.log(`${hr}:${min}${session}`);
    dropoutTime.textContent = `${hr}:${min}${session}`;

    initialTotal.innerHTML = parseFloat(yourInitialTotal).toFixed(2);
    timeFare.innerHTML = parseFloat(yourTimeFare).toFixed(2);
    tax.innerHTML = parseFloat(yourTax).toFixed(2);
    totalAmt.innerHTML = parseFloat(totalAmount).toFixed(2);
}

back.onclick = function(){
    receipt.style.display = "none";
    uberForm.style.display = "block";
}









