document.addEventListener("DOMContentLoaded", loadListeners);

const keys = [ ['e','enter'], ['i','imes'], ['a','ai'], ['o','ober'], ['u','ufat'] ];

function loadListeners() {
  document.querySelector('#input-text').addEventListener('input', verifyText);
  document.querySelector('#message-form').addEventListener('submit', submitMessage);
  document.querySelector('#copy').addEventListener('click', copyText);
};


const verifyText = (e) => {
  let text = e.target.value;
  const input = document.querySelector('#input-text');

  text = text.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();

  text = text.toLowerCase();

  input.value = text;
};


const submitMessage = (e) => {
  e.preventDefault();
  const inputText = document.querySelector('#input-text');
  const output = document.querySelector('#output');
  const noMessageContainer = document.querySelector('#no-message');
  const outputContainer = document.querySelector('#output-container');
  const value = inputText.value.trim();
  const specialChars= /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let text;

  if(value === '') return;

  if(specialChars.test(value)) {
    Swal.fire({
      title: "Corregir texto",
      text: "No debe contener caracteres especiales",
      icon: "error"
    });

    return;
  };
  
  if(e.submitter.id === 'encrypt') {
    text = encryptText(value);
  }else {
    text = decryptText(value);
  };

  outputContainer.style.display = 'flex';
  noMessageContainer.style.display = 'none';
  output.value = text;
  inputText.value = '';
};


const encryptText = (string) => {
  const keysLength = keys.length;

  for (let i = 0; i < keysLength; i++) {
    if(string.includes(keys[i][0])) {
      string = string.replaceAll(keys[i][0], keys[i][1]);
    };
  };

  return string;
};


const decryptText = (string) => {
  const keysLength = keys.length;

  for (let i = 0; i < keysLength; i++) {
    if(string.includes(keys[i][1])) {
      string = string.replaceAll(keys[i][1], keys[i][0]);
    };
  };

  return string;
};


const copyText = async () => {
  try {
    const text = document.querySelector('#output').value;

    if(text.trim() === '') return;

    await navigator.clipboard.writeText(text);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Texto copiado",
      showConfirmButton: false,
      timer: 1000
    });

  } catch (e) {

    Swal.fire({
      position: "center",
      icon: "error",
      title: "Error al copiar",
      showConfirmButton: false,
      timer: 1000
    });

  };
};