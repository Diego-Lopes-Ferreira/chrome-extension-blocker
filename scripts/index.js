const theList = document.querySelector('main');
const renderBtn = document.querySelector('#render');
renderBtn.onclick = render;

render();

function render() {
  theList.innerHTML = "";
  let db = readDb();
  if (db === null) {
    saveDB([]);
  }
  db.forEach(item => {
    renderSite(item);
  });
}



function renderSite(site) {
  let { id, name, baseUrl } = site;
  let container = document.createElement('div');
  let idEl = document.createElement('p');
  idEl.innerHTML = id;
  idEl.classList.add('mono');
  let nameEl = document.createElement('p');
  nameEl.innerHTML = name;
  let baseUrlEl = document.createElement('p');
  baseUrlEl.innerHTML = baseUrl;
  let editBtn = document.createElement('button');
  editBtn.innerHTML = 'edit';
  let deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'delete';

  container.classList.add('list-item');
  // container.appendChild(idEl);
  container.appendChild(nameEl);
  container.appendChild(baseUrlEl);
  container.appendChild(editBtn);
  container.appendChild(deleteBtn);
  theList.appendChild(container);
}