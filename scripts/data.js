let clients = [];

const database = firebase.database();
const clientsRef = database.ref("clients");

clientsRef.on("value", snapshot => {
  clients = convertObjToArray(snapshot.val());
  displayData(clients);
});

function convertObjToArray(object) {
  return Object.keys(object).map(key => {
    return {
      clientId: key,
      ...object[key]
    };
  });
}
