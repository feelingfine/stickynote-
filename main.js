const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-notes");

getNotes().forEach(note=>{const noteElement= createNoteElement(note.id, note.content);
notesContainer.insertBefore(noteElement,addNoteButton);}); 

addNoteButton.addEventListener("click",()=>addNote()); 
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
} 

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("notes");
  element.value = content;
  element.placeholder = "Add the Text";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Sure you wish to delete");

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
    const Notes= getNotes();
    const noteObject={
        id: Math.floor(Math.random()*100000),content:"" };

        const noteElement= createNoteElement(noteObject.id, noteObject.content);

        notesContainer.insertBefore(noteElement,addNoteButton);

 Notes.push(noteObject);
 saveNotes(Notes);


}

function updateNote(id, newContent) {
  const Notes= getNotes();
  const targetNote= Notes.filter(note=>note.id==id)[0];

  targetNote.content=newContent;
  saveNotes(Notes); 
}

function deleteNote(id, element) {
    const Notes= getNotes().filter(note => note.id !=id);

saveNotes(Notes);
notesContainer.removeChild(element);

}
