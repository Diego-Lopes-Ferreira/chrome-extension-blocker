const localStorageKey = "thelocalstoragekey"

function generateId(db) {
  let idsList = [];
  db.forEach(site => idsList.push(site.id));
  let id = Math.random().toString(36).slice(2, 10);
  if (idsList.includes(id)) {
    id = generateId();
  }
  return id;
}

function addSite(site) {
  let { name, baseurl } = site;
  let db = readDb();
  let newId = generateId();
  let newBlockedSite = {
    id: newId,
    name: name,
    baseurl: baseurl,
  }
  db.push(newBlockedSite);
  saveDB(db);
}

function editSite(site) {
  let { id } = site;
  let db = readDb();
  let updatedDb = [];
  db.forEach(item => {
    if(item.id === id) {
      item = site;
    }
    updatedDb.push(item);
  })
  saveDB(updatedDb);
}

function deleteSite(site) {
  let { id } = site;
  let db = readDb();
  let updatedDb = [];
  db.forEach(item => {
    if(item.id !== id) {
      updatedDb.push(item)
    }
  })
  saveDB(updatedDb);
}

function saveDB(info) {
  let strDB = JSON.stringify(info);
  localStorage.setItem(localStorageKey, strDB);
}

function readDb() {
  let strDb = localStorage.getItem(localStorageKey);
  return JSON.parse(strDb);
}
