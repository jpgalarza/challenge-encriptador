document.addEventListener("DOMContentLoaded", loadListeners);

const keys = [ ['e','enter'], ['i','imes'], ['a','ai'], ['o','ober'], ['u','ufat'] ];

function loadListeners() {
  document.querySelector('#input-text').addEventListener('input', verifyText);
  document.querySelector('#encrypt').addEventListener('click', encryptText);
  document.querySelector('#decrypt').addEventListener('click', decryptText);
  document.querySelector('#copy').addEventListener('click', copyText);
};


const verifyText = (e) => {
  let text = e.target.value;
  const input = document.querySelector('#input-text');

  text = text.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();

  text = text.toLowerCase();

  input.value = text;
};


const encryptText = () => {
  const inputText = document.querySelector('#input-text');
  let text = inputText.value;
  const output = document.querySelector('#output');
  const keysLength = keys.length;

  for (let i = 0; i < keysLength; i++) {
    if(text.includes(keys[i][0])) {
      const encryptedText = text.replaceAll(keys[i][0], keys[i][1]);
      text = encryptedText;
    };
  };

  output.value = text;
  inputText.value = '';
};


const decryptText = () => {
  const inputText = document.querySelector('#input-text');
  let text = inputText.value;
  const output = document.querySelector('#output');
  const keysLength = keys.length;

  for (let i = 0; i < keysLength; i++) {
    if(text.includes(keys[i][1])) {
      const decryptedText = text.replaceAll(keys[i][1], keys[i][0]);
      text = decryptedText;
    };
  };

  output.value = text;
  inputText.value = '';
};


const copyText = async () => {
  try {
    const text = document.querySelector('#output').value;

    if(text.trim() === '') return;

    await navigator.clipboard.writeText(text);

  } catch (e) {
    console.log('No se pudo compiar texto. Hazlo manualmente');
  };
};