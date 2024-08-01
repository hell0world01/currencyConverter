const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const dropDown = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button")
const fromCurrency = document.querySelector(".from select")
const toCurrency = document.querySelector(".to select")
const display = document.querySelector(".display")

for (let select of dropDown){
    for(currencyCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currencyCode;
        newOpt.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOpt.selected = "selected";
        }
        if (select.name === "to" && currencyCode === "NPR") {
            newOpt.selected = "selected";
        }
        select.append(newOpt)
    }
    select.addEventListener("change", event => {
        updateFlag(event.target)
    })
}
const updateFlag = element => {
    let currencyCode = element.value
    let countryCode = countryList[currencyCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newSrc;
}
btn.addEventListener("click", async event => {
    event.preventDefault();
    updateExchangeRate();
})
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount");
    if(amount.value === "" || amount.value < 1){
        amount.value = "1";
    }
    console.log(amount.value);
    const URL = `${baseURL}/${fromCurrency.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()]
    console.log(rate);
    let exchangeRate = amount.value * rate;
    display.innerText = `${amount.value} ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`
}
window.addEventListener("load", () => {
    updateExchangeRate();
})