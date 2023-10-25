//#endregion variables of DOM
let inputs = document.querySelectorAll(".inputs input")
let button = document.querySelector(".button")
let label = document.querySelectorAll(".input-group label");
let years = document.querySelector("#years")
let months = document.querySelector("#months")
let days = document.querySelector("#days")
let dayError = document.querySelector(".day-error")
let monthError = document.querySelector(".month-error")
let yearError = document.querySelector(".year-error")
let errorDiv = document.querySelectorAll(".input-group div")
//#endregion

let dayValue = "--";
let monthValue = "--";
let yearValue = "--";

years.textContent = yearValue;
months.textContent = monthValue;
days.textContent = dayValue;
//#region input values

inputs.forEach((item) => {
    item.addEventListener("change", (e) => {
        if (item.classList.contains("day")) {
            dayValue = parseInt(e.target.value)
        } else if (item.classList.contains("month")) {
            monthValue = parseInt(e.target.value)
        } else if (item.classList.contains("year")) {
            yearValue = parseInt(e.target.value)
        }
    })
})
//#endregion


//#region dateObject
let currentDate = new Date();
let dateData = {
    currentYear: currentDate.getFullYear(),
    currentDay: currentDate.getDay(),
    currentMonth: currentDate.getMonth(),
}
//#endregion



//#region functions

const handleDay = () => {
    let userBirthdate = new Date(yearValue, monthValue - 1, dayValue);
    if (!isNaN(userBirthdate.getTime())) {
        let timeDifference = Math.abs(currentDate.getTime() - userBirthdate.getTime());
        let dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        days.textContent = `${dayDifference}`;
    } else {
        days.textContent = '--';
    }
}

const handleMonth = () => {
    let userBirthdate = new Date(yearValue, monthValue - 1, dayValue);
    if (!isNaN(userBirthdate.getTime())) {
        let calculatedMonths = 0;
        
        if (currentDate > userBirthdate) {
            calculatedMonths = (currentDate.getFullYear() - userBirthdate.getFullYear()) * 12;
            calculatedMonths -= userBirthdate.getMonth();
            calculatedMonths += currentDate.getMonth();
        }
        
        if (calculatedMonths < 0) {
            calculatedMonths = 0;
        } 
        months.textContent = `${calculatedMonths}`;
    } else {
        months.textContent = '--';
    }
}

const handleYear = () => {
    let result = dateData.currentYear - yearValue
    if (!isNaN(result) && !isNaN(result) < dateData.currentYear) {
        if (yearValue <= dateData.currentYear && yearValue > 0) {
            years.textContent = result
        } else {
            yearError.textContent = "Must be in the past"
        }
    } else years.textContent = "--"
}


const errors = () => {
    if (dayValue == "--" && monthValue == "--" && yearValue == "--") {
        errorDiv.forEach(item => item.textContent = "this field is required")
    } else errorDiv.forEach(item => item.textContent = "")
}
//#endregion



//#region eventListener
button.addEventListener("click", () => {
    errors();
    handleDay();
    handleYear();
    handleMonth();
})



//valid day hatası
//valid month   