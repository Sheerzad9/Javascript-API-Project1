const addBtn = document.querySelector(".addBtn");
const inputText = document.querySelector(".inputSearch");
const nationContainer = document.querySelector(".nationContainer");

function renderCountry(data, className = "") {
  const html = `
    <article class = "country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h4>${data.name}</h4>
            <h3>${data.region}</h3>
            <p><span>👨‍👩‍👦‍👦</span> Population: ${(
              +data.population / 1000000
            ).toFixed(1)} million</p>
            <p><span>🗣</span> Language: ${data.languages[0].name} </p>
            <p><span>💰</span> Currency: ${data.currencies[0].name}</p>
        </div>
    </article>`;
  nationContainer.insertAdjacentHTML("afterbegin", html);
}

function getCountry(country) {
  fetch(`https://restcountries.com/v2/name/${country}?fullText=true`)
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      console.log(data[0]);
      renderCountry(data[0]);
    });
}

addBtn.addEventListener("click", function () {
  console.log(inputText.value);
  getCountry(inputText.value);
});

function testData(country) {
  fetch(`https://restcountries.com/v2/name/${country}?fullText=true`)
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      console.log(data[0]);
      console.log(data[0].borders);
    });
}

function threeDigitcountry(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      console.log(data[0]);
      // renderCountry(data[0]);
    });
}
threeDigitcountry("swe");
testData("finland");

//getCountry("finland");

// fetch("https://restcountries.com/v2/name/finland?fullText=true")
//   .then((res) => {
//     const data = res.json();
//     return data;
//   })
//   .then((data) => console.log(data[0]));

// fetch("https://restcountries.com/v3.1/name/portugal?fullText=true")
//   .then((res) => {
//     const data = res.json();
//     return data;
//   })
//   .then((data) => console.log(data[0].languages));
