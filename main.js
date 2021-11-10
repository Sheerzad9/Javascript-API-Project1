const addBtn = document.querySelector(".addBtn");
const inputText = document.querySelector(".inputSearch");
const nationContainer = document.querySelector(".nationContainer");
const neighboursContainer = document.querySelector(".neighboursContainer")

let borders = []

function renderCountry(data, language, currency) {
  const html = `
    <article class = "country">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h4>${data.name.common}</h4>
            <h3>${data.region}</h3>
            <p><span>👨‍👩‍👦‍👦</span> Population: ${(
              +data.population / 1000000
            ).toFixed(1)} million</p>
            <p><span>🗣</span> Language: ${language} </p>
            <p><span>💰</span> Currency: ${currency}</p>
        </div>
    </article>`;
  nationContainer.insertAdjacentHTML("beforeend", html);
}

function renderNeighbours(data, currency, language){
  console.log();
  const html = `
    <article class = "neighbourCountry">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h4>${data.name.common}</h4>
            <h3>${data.region}</h3>
            <p><span>👨‍👩‍👦‍👦</span> Population: ${(
              +data.population / 1000000
            ).toFixed(1)} million</p>
            <p><span>🗣</span> Language: ${language} </p>
            <p><span>💰</span> Currency: ${currency}</p>
        </div>
    </article><br><br>`;
  neighboursContainer.insertAdjacentHTML("beforeend", html);

}

function getCountry(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      const language = Object.values(data[0].languages)[0]
      const currency = Object.values(data[0].currencies)[0].name
      console.log(data[0]);
      borders = data[0].borders
      console.log(borders);
      renderCountry(data[0], language, currency);
      return borders
    }).then((borders) => {
      borders.forEach(el => threeDigitcountry(el))
    });
}

addBtn.addEventListener("click", function () {
  getCountry(inputText.value);
});


function threeDigitcountry(country) {
  fetch(`https://restcountries.com/v3.1/alpha/${country}`)
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      const currency = Object.values(data[0].currencies)[0].name
      const language = Object.values(data[0].languages)[0]
      console.log(data[0]);
      renderNeighbours(data[0], currency, language);
    });
}
// threeDigitcountry("nor");


// function apiTest(){
//   fetch(`https://goweather.herokuapp.com/weather/helsinki`).then((res) => {
//     const data = res.json()
//     return data
//   }).then((data) => {
//     console.log(data);
//   })
// }
// apiTest()