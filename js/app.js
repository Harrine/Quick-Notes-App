showNotes();

// here the add button is used to add the note to localstorage 
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = window.localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  // console.log(notes)
  showNotes();
});

// this function help to see the notes which are stored in localstorage, if localstorage is not empty then new card will be added to innner html elemetn otherwise Nothing to show wil be display 
function showNotes() {
  let notes = window.localStorage.getItem("notes");
  if ((notes == null)) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  // here new note card is added i.e by adding the html element in html page with the help of innerHTML function
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Note-${index + 1}</h5>
          <p class="card-text">
            ${element}
          </p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
  });

  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `
    <hr>
    <h3>-->Nothing to show, Add a Note</h3>
    <hr>`
  }
}

// this function is used to delete the note by taking the id(index) and finding through notesObj and removing that specific note 
function deleteNote(index) {
  console.log("delteting the note: ", index);
  let notes = window.localStorage.getItem("notes");
  if ((notes == null)) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// this is used to search through the notecards by using includes function
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  console.log("input event fired", inputVal);

  let noteCards = document.getElementsByClassName("noteCard")
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  })
})