const wrapper = document.querySelector(".wrapper");
const input = document.getElementById("searchInp");

let searchCountryData = [];

let api = `https://restcountries.com/v3.1/all`;

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    searchCountryData = data;
    InterfaceCountries(data);
  });

input.addEventListener("input", (e) => {
  let searchText = e.target.value.toLowerCase();
  let filterData = searchCountryData.filter((country) =>
    country.name.common.toLowerCase().includes(searchText)
  );
  InterfaceCountries(filterData);
});


function InterfaceCountries(countries) {
  wrapper.innerHTML = "";
  countries.forEach((item) => {
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    box.innerHTML = `
      <img src="${item.flags.png}" alt="${item.name.common}">
      <h1>${item.name.common}</h1>
      <p>Region: ${item.region}</p>
    `;

    box.addEventListener("click", () => openModal(item));
    wrapper.append(box);
  });
}


function openModal(item) {

  let modal = document.createElement('div');
  modal.classList.add('modal');

  let modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  let closeButton = document.createElement('button');
  closeButton.textContent = 'Back';
  closeButton.classList.add('close-button');
  closeButton.addEventListener('click', () => {
    modal.remove();
    wrapper.style.display = 'grid'
  });

  modalContent.innerHTML = `
    <img src="${item.flags.svg}" alt="${item.name.common}" class="modal-flag">
    <h1>${item.name.common}</h1>
    <p><strong>Region:</strong> ${item.region}</p>
    <p><strong>Languages:</strong> ${Object.values(item.languages).join(', ')}</p>
  `;

  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  wrapper.style.display = 'none';
}

const body=document.body;
const darkbtn=document.getElementById('dark-mode');
darkbtn.addEventListener('click',()=>{
  if(body.classList.contains('darkmode')){
    body.classList.remove('darkmode');
  }else{
    body.classList.add('darkmode');
  }

});
