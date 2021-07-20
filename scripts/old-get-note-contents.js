const localStorageKey = 'notes';
const currentKey = 'current';

function getNoteContents() {
  let noteContents = [];
  let currentId = '';
  let idsList = [];

  let stored = localStorage.getItem(localStorageKey);
  if (stored) {
    noteContents = JSON.parse(stored);
  }
  currentId = localStorage.getItem(currentKey);

  try {
    for (let note of noteContents) {
      idsList.push(note.id);
    }
  } catch (err) {}
  return [noteContents, currentId, idsList];
}
