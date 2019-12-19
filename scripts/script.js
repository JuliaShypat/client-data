import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
import { initApp } from "./firebase";
import { getData, clients } from "./data";
import { refreshData, showResultListSection, showNotFoundSection } from "./dom";

initApp();
getData();
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "./login.html";
  }
});

const newClientForm = document.querySelector("#newClientForm");

newClientForm.addEventListener("submit", event => {
  event.preventDefault();
  addClient(event.target);
});

const editClientForm = document.querySelector("#editClientForm");
editClientForm.addEventListener("submit", event => {
  event.preventDefault();
  editClient(event.target);
});

const logOutBtn = document.querySelector("#logOut");
logOutBtn.addEventListener("click", () => {
  logOut();
});

const filterField = document.querySelector("#filterInput");
filterField.addEventListener("keyup", event => {
  filterList(event);
});

const sortAZ = document.querySelector("#sortAscending");
sortAZ.addEventListener("click", () => {
  sortList("ascending");
});

const sortZA = document.querySelector("#sortDescending");
sortZA.addEventListener("click", () => {
  sortList("descending");
});

function editClient(form) {
  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    gender: form.gender.value,
    amount: form.amount.value,
    date: form.date.value
  };

  const id = form.clientID.value;
  let updates = {};

  updates[`clients/${id}`] = data;

  console.log("id", id, data);
  if (id) updateDB(updates);
}

function sortList(order) {
  const sortedClients = clients.sort((lastClient, nextClient) => {
    if (order == "ascending") {
      return lastClient.lastName > nextClient.lastName ? 1 : -1;
    } else {
      return lastClient.lastName < nextClient.lastName ? 1 : -1;
    }
  });
  refreshData(sortedClients);
}

function filterList(event) {
  const filterString = event.target.value.toLowerCase().trim();
  if (filterString) {
    const filteredClients = clients.filter(client => {
      return (
        client.firstName.toLowerCase().includes(filterString) ||
        client.lastName.toLowerCase().includes(filterString) ||
        client.email.toLowerCase().includes(filterString)
      );
    });
    refreshData(filteredClients);
    filteredClients.length === 0
      ? showNotFoundSection()
      : showResultListSection();
  } else {
    refreshData(clients);
    showResultListSection();
  }
}

export function sumAmount(clientsList = clients) {
  const total = clientsList.reduce((amount, client) => {
    return amount + removeCurrencyFromAmount(client.amount);
  }, 0);
  document.querySelectorAll(".totalAmountContainer").forEach(element => {
    element.innerHTML = total.toFixed(2);
  });
}

function removeCurrencyFromAmount(amount) {
  return amount ? Number(amount.slice(1)) : 0;
}

function addClient(form) {
  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    gender: form.gender.value,
    amount: form.amount.value,
    date: form.date.value,
    avatar: form.photo.value
  };

  const newId = firebase
    .database()
    .ref()
    .child("clients")
    .push().key;
  let updates = {};

  updates[`clients/${newId}`] = data;

  updateDB(updates);
}

function updateDB(updates) {
  firebase
    .database()
    .ref()
    .update(updates, function(error) {
      if (error) {
        console.error(
          "New client was not added or was not saved! Error occured!"
        );
      } else {
        console.log("Data added/saved to database!");
      }
    });
}

function logOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "./login.html";
    })
    .catch(error => {
      console.error(error);
    });
}
