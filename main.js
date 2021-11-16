const addBtn = document.querySelector(".addBtn");
const inputText = document.querySelector(".inputSearch");
const nationContainer = document.querySelector(".nationContainer");
const neighboursToShow = document.querySelector(".neighbourContent");
const searchedList = document.querySelector(".searchedList");
const searchContainer = document.querySelector(".recentSearchContainer");
const searchboxHeader = document.querySelector(".recentBoxHeader");

// An array so we can store the neighbouring countries
let borders = [];

///////////////////////////////////////////////////////////////////////////////////////
// Here we render searched country data
function renderCountry(data, language, currency) {
  const html = `
    <div class = "country">
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
    </div>`;
  nationContainer.insertAdjacentHTML("beforeend", html);
}

// Here we render the neighbour countries to page
function renderNeighbours(data, currency, language) {
  console.log();
  const html = `
    <aricle class = "neighbourCountry">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h4>${data.name.common}</h4>
            <h3>${data.region}</h3>
            <p><span>👨‍👩‍👦‍👦</span> Population: ${
              +data.population > 1000000
                ? (+data.population / 1000000).toFixed(1) + "million"
                : (+data.population / 100000).toFixed(1) * 10 +
                  " hundred thousand"
            }</p>
            <p><span>🗣</span> Language: ${language} </p>
            <p><span>💰</span> Currency: ${currency}</p>
        </div>
    </article><br><br>`;
  neighboursToShow.insertAdjacentHTML("afterbegin", html);
}

// Function to clear previous shown data
function clearPage() {
  const countries = document.querySelector(".country");
  const neighbours = neighboursToShow.querySelectorAll(".neighbourCountry");
  if (countries !== null) countries.remove();
  if (neighbours.length > 0) {
    neighbours.forEach((el) => {
      el.remove();
    });
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
// Below here are fetch functions

// Here we fetch the data with users given input, this goes through only if user writes nation name correctly
function getCountry(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then((res) => {
      // If user misspelled input, we throw error downwards with our own logical error message
      if (!res.ok)
        throw new Error(
          `The country you searched "${inputText.value}" doesn't exist ☹ , please try again`
        );
      const data = res.json();
      return data;
    })
    .then((data) => {
      const language = Object.values(data[0].languages)[0];
      const currency = Object.values(data[0].currencies)[0].name;
      borders = data[0].borders;
      renderCountry(data[0], language, currency);
      return borders;
    })
    .then((borders) => {
      borders.forEach((el) => threeDigitcountry(el));
    })
    .catch((err) => {
      // here inside "catch" method we get our error message which was thwron from previous "fetch method" and show it to the user with alert method
      alert(`${err} ☺`);
    });
}

// This function takes user inputs and shows it in list form
function renderSearchList() {
  const li = document.createElement("li");
  li.innerHTML = inputText.value;
  searchedList.insertAdjacentElement("afterbegin", li);
  searchboxHeader.style.opacity = 1;
  searchContainer.style.opacity = 1;
}

// Because we get neighbouring countries only in 3 digit words from this API, we have to fetch the data from different link
function threeDigitcountry(country) {
  fetch(`https://restcountries.com/v3.1/alpha/${country}`)
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      const currency = Object.values(data[0].currencies)[0].name;
      const language = Object.values(data[0].languages)[0];
      renderNeighbours(data[0], currency, language);
    });
}

// Here we just listen click action on the "Seach" button and act according to inputs value
addBtn.addEventListener("click", function () {
  clearPage();
  renderSearchList();
  getCountry(inputText.value);
});
