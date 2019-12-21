import { sumAmount, fillClientForm, deleteClient } from "./script";

function getLiElement(client) {
  const { avatar, clientId } = client;
  const newLi = document.createElement("li");
  const image = document.createElement("img");
  newLi.className = "media";
  newLi.id = clientId;
  image.className = "mr-3 align-self-center";
  image.setAttribute("src", avatar);

  newLi.appendChild(image);
  newLi.appendChild(createClientDescription(client, clientId));
  return newLi;
}

function createClientDescription(client, id) {
  const div = document.createElement("div");
  div.className = "media-body";

  const mailLink = document.createElement("a");
  mailLink.setAttribute("href", `mailto:${client.email}`);
  mailLink.innerHTML = client.email;
  const textPart1 = document.createTextNode(
    `${client.lastName} ${client.firstName} - `
  );
  const textPart2 = document.createTextNode(
    ` ${client.gender} (${client.date} - ${client.amount})`
  );

  const deleteLink = document.createElement("a");
  deleteLink.innerHTML = "Delete";
  deleteLink.setAttribute("href", "#");
  deleteLink.classList.add("mx-2");
  deleteLink.addEventListener("click", event => {
    event.preventDefault();
    deleteClient(id);
  });
  const editLink = createEditLink(id);

  div.appendChild(textPart1);
  div.appendChild(mailLink);
  div.appendChild(textPart2);
  div.appendChild(editLink);
  div.appendChild(deleteLink);

  return div;
}

function createEditLink(id) {
  const editLink = document.createElement("a");
  editLink.innerHTML = "Edit";
  editLink.setAttribute("href", "#");
  editLink.setAttribute("data-toggle", "modal");
  editLink.setAttribute("data-target", "#editClientModel");
  editLink.setAttribute("data-client-id", id);
  editLink.classList.add("mx-2");
  editLink.classList.add("edit-client-link");
  editLink.addEventListener("click", () => {
    fillClientForm(id);
  });
  return editLink;
}

function clearList() {
  const ul = document.querySelector("#clientsData");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

export function displayData(clientsList = clients) {
  clearList();
  const ul = document.querySelector("#clientsData");
  clientsList.forEach(client => {
    ul.appendChild(getLiElement(client));
  });
  sumAmount(clientsList);
}

export function refreshData(updatedClients) {
  clearList();
  displayData(updatedClients);
}
export function showNotFoundSection() {
  document.querySelector(".resultList").style.display = "none";
  document.querySelector(".notFound").style.display = "block";
}

export function showResultListSection() {
  document.querySelector(".resultList").style.display = "block";
  document.querySelector(".notFound").style.display = "none";
}
