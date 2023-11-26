const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    // Retrieve notes from localStorage
    const savedNotes = localStorage.getItem("notes");
    
    // Check if there are saved notes
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
}

showNotes();

function updateStorage() {
    // Save the content of the notesContainer
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage(); // Save after creating a new note
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.classList.contains("input-box")) {
        e.target.oninput = function () {
            updateStorage();
        };
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
        updateStorage(); // Save after pressing Enter
    }
});
