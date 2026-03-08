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

// CARD-SECTION-SCRIPT


// const cardContainer = document.getElementById("cards-container");

// async function loadCards() {
  
//   // async awite
//   const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//   const data = await response.json();
//   console.log(data);
//   console.log(cardContainer);
 
 
// }
// loadCards();
