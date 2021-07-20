//@ts-nocheck
let htmlArea = document.querySelector('#editable');

function openEditor() {
  // htmlArea.onclick = () => {};
  let editableArea = document.createElement('textarea');
  editableArea.setAttribute('id', 'editableArea');
  // editableArea.setAttribute('cols', '49');
  // editableArea.setAttribute('rows', '22');
  let content = '';
  let [notes, currentId] = getNoteContents(); // ! getNoteContents from 'get-note-contents'
  for (note of notes) {
    if (note.id == currentId) {
      content = note.content;
    }
  }
  htmlArea.innerHTML = '';
  htmlArea.appendChild(editableArea);
  if (content) {
    editableArea.value = content;
  }
}

function save() {
  let content = editableArea.value;
  htmlArea.innerHTML = marked(content); // ! marked from 'marked.js'
  // htmlArea.onclick = openEditor;
  let [notes, currentId] = getNoteContents(); // ! getNoteContents from 'get-note-contents'
  for (note of notes) {
    if (note.id == currentId) {
      note.content = content;
    }
  }
  localStorage.setItem(localStorageKey, JSON.stringify(notes)); // ! localStorageKey from 'get-note-contents'
  log();
}

function createNewNote() {
  let id = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
  let [notes, currentId, idsList] = getNoteContents(); // ! getNoteContents from 'get-note-contents'
  while (idsList.includes(id)) {
    id = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
  }

  let input = document.querySelector('.modal-wrapper#create div #modal-name');
  let name = input.value;

  let spans = document.querySelectorAll('.modal-wrapper#create span');
  let color = '';
  spans.forEach((span) => {
    // console.log(span.className);
    if (span.className.includes('selected')) {
      color = span.classList[0];
    }
  });

  let data = {
    id: id,
    name: name,
    color: color,
    content: '',
  };
  notes.push(data);
  currentId = data.id;
  localStorage.setItem(localStorageKey, JSON.stringify(notes)); // ! localStorageKey from 'get-note-contents'
  localStorage.setItem(currentKey, currentId); // ! currentKey from 'get-note-contents'
  log();
}

function deleteNote(id) {
  let [notes, currentId, idsList] = getNoteContents(); // ! getNoteContents from 'get-note-contents'

  let newNotes = notes.filter((note) => {
    return note.id !== id;
  });

  let newCurrentId = currentId;

  if (currentId === id) {
    let currentPosition = idsList.indexOf(currentId);
    currentPosition -= 1;
    if (currentPosition < 0) {
      currentPosition += 2;
    }
    newCurrentId = idsList[currentPosition];
  }

  localStorage.setItem(localStorageKey, JSON.stringify(newNotes)); // ! localStorageKey from 'get-note-contents'
  localStorage.setItem(currentKey, newCurrentId); // ! currentKey from 'get-note-contents'
  log();
}

function editNote(id) {
  let input = document.querySelector('.modal-wrapper#edit div #modal-name');
  let newName = input.value;

  let spans = document.querySelectorAll('.modal-wrapper#edit span');
  let newColor = '';
  spans.forEach((span) => {
    if (span.className.includes('selected')) {
      newColor = span.classList[0];
    }
  });

  let [notes] = getNoteContents(); // ! getNoteContents from 'get-note-contents'

  for (let noteOnTheList of notes) {
    if (noteOnTheList.id === id) {
      noteOnTheList.name = newName;
      noteOnTheList.color = newColor;
    }
  }
  localStorage.setItem(localStorageKey, JSON.stringify(notes)); // ! localStorageKey from 'get-note-contents'
  log();
}
