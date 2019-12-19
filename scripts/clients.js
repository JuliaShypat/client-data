const firebase = require("firebase/app");
require("firebase/database");
import { clients } from "./data";

export function deleteClient(id) {
  const clientRef = firebase.database().ref(`clients/${id}`);
  clientRef.remove();
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
