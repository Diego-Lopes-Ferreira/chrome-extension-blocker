//@ts-nocheck
function createNewConfirmModal(text, callback) {
  // [ ] Criar o modal
  //   [v] modal-wrapper
  //   [v] modal
  //   [v] confirm texts
  //   [v] button true / button false
  // [ ] chamar o callback baseado no resultado callback(trueOrFalse)
  let externalConfirmModalDiv = document.createElement('div');
  externalConfirmModalDiv.classList.add('modal-wrapper');
  externalConfirmModalDiv.classList.add('appear');

  let confirmModalDiv = document.createElement('div');
  confirmModalDiv.classList.add('modal');

  let confirmText = document.createElement('p');
  confirmText.innerHTML = text;

  let trueButton = document.createElement('button');
  trueButton.innerHTML = 'YES';
  trueButton.onclick = () => {
    document.querySelector('body').removeChild(externalConfirmModalDiv);
    callback(true);
  };

  let falseButton = document.createElement('button');
  falseButton.innerHTML = 'CANCEL';
  falseButton.onclick = () => {
    document.querySelector('body').removeChild(externalConfirmModalDiv);
    callback(false);
  };

  confirmModalDiv.appendChild(confirmText);
  confirmModalDiv.appendChild(falseButton);
  confirmModalDiv.appendChild(trueButton);

  externalConfirmModalDiv.appendChild(confirmModalDiv);

  document.querySelector('body').appendChild(externalConfirmModalDiv);
}
