import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
import { initApp } from "./firebase.js";
import { getData, clients } from "./data";
import { showResultListSection, showNotFoundSection, refreshData } from "./dom";

initApp();
getData();
//Observe changes
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

const sortsFields = [
  { id: "sortAscending", value: "ascending" },
  { id: "sortDescending", value: "descending" }
];
sortsFields.forEach(field => {
  const element = document.querySelector(`#${field.id}`);
  element.addEventListener("click", () => {
    sortList(field.value);
  });
});

const filterField = document.querySelector("#filterInput");
filterField.addEventListener("keyup", event => {
  filterList(event);
});

const logOutBtn = document.querySelector("#logOut");
logOutBtn.addEventListener("click", () => {
  logOut();
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

export function sumAmount(clientsList = clients) {
  const total = clientsList.reduce((amount, client) => {
    return amount + removeCurrencyFromAmount(client.amount);
  }, 0);
  document.querySelectorAll(".totalAmountContainer").forEach(element => {
    element.innerHTML = total.toFixed(2);
  });
}

export function fillClientForm(id) {
  if (editClientForm) {
    editClientForm.firstName.value = clients[id].firstName;
    editClientForm.lastName.value = clients[id].lastName;
    editClientForm.email.value = clients[id].email;
    editClientForm.gender.value = clients[id].gender;
    editClientForm.amount.value = clients[id].amount;
    editClientForm.date.value = clients[id].date;
    editClientForm.clientID.value = id;
  }
}

export function deleteClient(id) {
  const clientRef = firebase.database().ref(`clients/${id}`);
  clientRef.remove();
}
