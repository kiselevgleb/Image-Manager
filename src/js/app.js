const dropEl = document.querySelector('[data-id=drop-area]');
const previewEl = document.querySelector('[data-id=preview]');
const inp = document.querySelector('.inp');

let files = [];

function check(size) {
  const imgs = document.querySelectorAll('.image');
  let boo = true;
  if (imgs.length > 0) {
    imgs.forEach((element) => {
      if (element.getAttribute('num') === size.toString()) {
        boo = false;
      }
    });
    return boo;
  }
  return true;
}

dropEl.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});
dropEl.addEventListener('drop', (evt) => {
  evt.preventDefault();
  if (evt.dataTransfer.files[0].type.match('image.*') && check(evt.dataTransfer.files[0].size)) {
    files = Array.from(evt.dataTransfer.files);
    add();
  } else {
    // console.log("uncorrect type file");
  }
});

inp.addEventListener('change', handleFiles, false);

function handleFiles() {
  if (this.files[0].type.match('image.*') && check(this.files[0].size)) {
    files = Array.from(this.files);
    add();
  } else {
    // console.log("uncorrect type file");
  }
}

function add() {
  const divimg = document.createElement('div');
  const img = document.createElement('img');
  img.src = URL.createObjectURL(files[0]);
  img.setAttribute('num', files[0].size);
  img.classList.add('image');
  img.height = '100';
  divimg.appendChild(img);
  divimg.classList.add('previewDiv');
  const butDel = document.createElement('a');
  butDel.innerHTML = '&#9747';
  butDel.classList.add('del');
  divimg.appendChild(butDel);
  previewEl.appendChild(divimg);
  del();
}

function del() {
  const butDel = document.querySelectorAll('.del');
  butDel.forEach((element) => {
    element.addEventListener('click', (e) => {
      e.srcElement.parentElement.remove();
    });
  });
}
