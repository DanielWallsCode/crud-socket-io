import { saveNotes, deleteNote, getNoteById, updateNote } from './socket.js';

const notesList = document.querySelector('#notes');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

let saveId = ''

const noteUI = note => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card card-body rouded-0 mb-2">
        <div class="d-flex justify-content-between">
            <h1>${note.title}</h1>
            <div>
                <button class="btn btn-danger delete" data-id="${note._id}">Delete</button>
                <button class="btn btn-success update" data-id="${note._id}">Upadate</button>
            </div>
        </div>
        <p>${note.description}</p>
    </div>
    `
    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');


    btnDelete.addEventListener('click',e => {
        deleteNote(btnDelete.dataset.id);
    });

    btnUpdate.addEventListener('click',e => {
        getNoteById(btnUpdate.dataset.id)
    });


    return div;
}

export const renderNotes = notes => {
    notesList.innerHTML = ''
    notes.forEach(note => {notesList.append(noteUI(note))});
}

export const fillForm = (note) => {
    title.value = note.title;
    description.value = note.description;
    saveId = note._id;
}

export const onHandleSubmit = (e) => {
    e.preventDefault();
    if(saveId){
        updateNote(saveId,title.value,description.value);
    }else{
        saveNotes(title.value, description.value);
    }

    saveId = '';
    title.value = '';
    title.description = '';
    
}

export const appendNote = note => {
    notesList.append(noteUI(note))
}
