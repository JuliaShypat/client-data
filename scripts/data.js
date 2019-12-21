const firebase = require("firebase/app");
require("firebase/database");
import { displayData } from "./dom";

let clients = [];

export function getData() {
  console.log("getData()");
  const database = firebase.database();
  const clientsRef = database.ref("clients");

  clientsRef.on("value", snapshot => {
    clients = convertObjToArray(snapshot.val());
    displayData(clients);
  });
}

function convertObjToArray(object) {
  return Object.keys(object).map(key => {
    return {
      clientId: key,
      ...object[key]
    };
  });
}

export { clients };
