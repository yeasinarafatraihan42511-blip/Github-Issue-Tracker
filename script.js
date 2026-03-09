// LOGIN-FORM-SCRIPT
const form = document.getElementById("login-form");
if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {

      window.location.href = "main.html";

    } else {

      alert("Invalid username or password");

    }

  });

}




// TAB-BTN-SECTION
let currentTab = "all";
let allCards = []; 
const tabActiveClass = ["btn-primary", "text-white"];
const tabInactiveClass = ["bg-transparent", "text-black-700"];

function switchTab(tab) {
  const tabs = ["all", "open", "closed"];
  for (const t of tabs) {
    const tabName = document.getElementById("tab-" + t);
    if (t === tab) {
      tabName.classList.add(...tabActiveClass);
      tabName.classList.remove(...tabInactiveClass);
    }
    else {
      tabName.classList.remove(...tabActiveClass);
      tabName.classList.add(...tabInactiveClass);
    }


  }
  currentTab = tab;
  applyFilter();
}
  


// card-section

const cardContainer = document.getElementById("cards-container");
const loadingSpinner = document.getElementById("loading-spinner");
function showLoadingSpinner() {
  loadingSpinner.classList.remove("hidden");
  cardContainer.innerHTML = ""; // Clear existing cards
}
function hideLoadingSpinner() {
  loadingSpinner.classList.add("hidden");
}

async function loadCards() {
  showLoadingSpinner();
  loadingSpinner.classList.add("flex");

  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  loadingSpinner.classList.add("hidden");
  hideLoadingSpinner();

  // displayCards(data.data);
  // FOR FILTARING PURPOSES
  allCards = data.data;
  applyFilter();

}

function displayCards(cards) {

  cards.forEach((card) => {
    let borderColor;
    let status;

    if (card.status === "open") {
      borderColor = "border-green-500";
      status = "./assets/Open-Status.png";
    } else {
      borderColor = "border-blue-500";
      status = "./assets/Closed-Status.png";
    }


    const cardElement = document.createElement("div");
    cardElement.className = "bg-white p-4 shadow w-[256px] h-[273px] border-t-4 " + borderColor + " rounded";
    cardElement.innerHTML = `
      <div class="flex justify-between items-center gap-2">
        <img src="${status}" alt="">
                <button class="btn btn-active rounded-3xl h-7"> <span
                        class="text-xs text-yellow-600 font-bold">${card.priority}</span></button>
            </div>

            <h1 class="font-bold text-lg mt-2">Fix Navigation Menu on Mobile Devices</h1>
            <p class="text-gray-600 mt-1 line-clamp-2">${card.description}</p>

            <div class="mt-1 justify-between items-center gap-0 flex">
                <button
                    class="flex items-center gap-2 btn btn-active rounded-3xl h-7 text-yellow-700 px-4 py-2 rounded text-xs">

                    <img src="./assets/BugDroid.png" class="w-4 h-4">

                    BUG

                </button>
                
                <button
                    class="flex items-center gap-2 btn btn-active bg-amber-100 text-yellow-700 rounded-3xl h-7 px-3 py-2 rounded text-xs">

                    <img src="./assets/Vector.png" class="w-4 h-4">

                    HELP WANTED

                </button>



            </div>
            <hr class="border-t border-gray-300 my-2">
            <p class="text-gray-600 line-clamp-2">#1
                by john_doe</p>
            <p class="text-gray-600 line-clamp-2">1/15/2024</p>


        </div>


    </div>
    `;
    cardContainer.appendChild(cardElement);



  });


}

loadCards();


const tabButtons = document.getElementById("tab-all");
tabButtons.click();

// FOR UPDATE-COUNT PURPOSES

function updateIssueCount(count) {
  const issueCount =document.getElementById("issue-count");
  issueCount.textContent = `${count} Issues`;
}
// FOR FILTARING PURPOSES

function applyFilter() {
  let filteredCards = [];
  if (currentTab === "all") {
    filteredCards = allCards;
  } else {
    filteredCards = allCards.filter(card => card.status === currentTab);
  }
  cardContainer.innerHTML = ""; // Clear existing cards
  displayCards(filteredCards);
  updateIssueCount(filteredCards.length);
}
