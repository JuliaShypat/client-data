function displayData() {
  const ul = document.querySelector('#clientsData');
  clients.forEach(client => {
    const newLi = document.createElement('li');
    newLi.className = 'media';
    const avatar = document.createElement('img');
    avatar.className = 'mr-3 align-self-center';
    const div = document.createElement('div');
    div.className = 'media-body';
    avatar.setAttribute('src', client.avatar);
    const text = document.createTextNode(
      `${client.firstName} ${client.lastName} - ${client.email}, ${client.gender} (${client.date} - ${client.amount})`
    );
    div.appendChild(text);
    newLi.appendChild(avatar);
    newLi.appendChild(div);
    ul.appendChild(newLi);
  });
}
