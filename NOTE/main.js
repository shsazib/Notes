const addButton = document.querySelector(".add");

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
        <div class="operation">
            <button class="edit">Edit & Update</button>
            <button class="delete">Delete</button>
        </div>

        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class=" textarea ${text ? "hidden" : ""}"></textarea>
  `;
  note.insertAdjacentHTML("afterbegin", htmlData);

  // getting the references
  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  // delet the note
  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  // toggle useing edit button
  textarea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    // local Storage function call
    updateLSData();
  });

  document.body.appendChild(note);
};

// local Storage function
const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

//getting data back from localStorage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());
