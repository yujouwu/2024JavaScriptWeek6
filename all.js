// 渲染資料
const ticketCardArea = document.querySelector(".ticketCard-area");
const searchResultText = document.querySelector("#searchResult-text");

function render(data) {
  let str = "";
  data.forEach((item) => {
    str += `
      <li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${item.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span class="material-symbols-outlined">error</span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>
    `;
  });
  ticketCardArea.innerHTML = str;
  searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`;
}
// render(data);
// ==========================================================
// 篩選
const regionSearch = document.querySelector(".regionSearch");
const allAreas = "全部地區";

function filterData() {
  const selectedArea = regionSearch.value;
  const filteredResult = data.filter(
    (item) => selectedArea === allAreas || selectedArea === item.area
  );
  render(filteredResult);
}
function updateCantFindArea() {
  const ticketCards = document.querySelectorAll(".ticketCard");
  const cantFindArea = document.querySelector(".cantFind-area");
  cantFindArea.style.display = ticketCards.length === 0 ? "block" : "none";
}
regionSearch.addEventListener("change", () => {
  filterData();
  updateCantFindArea();
});
// ==========================================================
// 新增資料
const addTicketForm = document.querySelector(".addTicket-form");

const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");

const addTicketBtn = document.querySelector(".addTicket-btn");

function addData() {
  let obj = {
    id: data.length,
    name: ticketName.value,
    imgUrl: ticketImgUrl.value,
    area: ticketRegion.value,
    description: ticketPrice.value,
    group: ticketNum.value,
    price: ticketRate.value,
    rate: ticketDescription.value
  };
  data.push(obj);
  addTicketForm.reset();

  regionSearch.value = allAreas;

  render(data);
}
addTicketBtn.addEventListener("click", () => {
  if (validateForm()) {
    addData();
    updateCantFindArea();
    toggleValidationListener(false);
  }else{
    toggleValidationListener(true);
  }
});
// ==========================================================
// 表單驗證
const inputFields = [
  ticketName,
  ticketImgUrl,
  ticketRegion,
  ticketPrice,
  ticketNum,
  ticketRate,
  ticketDescription
];
const alertMessageElements = document.querySelectorAll(".alert-message p");
const errorMessage = `<span class="material-symbols-outlined">error</span>必填!</span>`;

function validateForm() {
  let isValid = true;
  inputFields.forEach((field, index) => {
    if (field.value.trim() === "") {
      alertMessageElements[index].innerHTML = errorMessage;
      isValid = false;
    } else {
      alertMessageElements[index].innerHTML = "";
    }
  });
  return isValid;
}
// ==========================================================
// 「加上」或「移除」監聽
// 監聽事件是 => 每次 input 有輸入時，就執行 validateForm
function toggleValidationListener(addListener) {
  if (addListener) {
    inputFields.forEach((field, index) => {
      field.addEventListener("input", validateForm);
    });
  } else {
    inputFields.forEach((field, index) => {
      field.removeEventListener("input", validateForm);
    });
  }
}
// ==========================================================

let data = [];

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    data = response.data.data;
    render(data);
})