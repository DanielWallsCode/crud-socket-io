const sockets = io();

export const loadNotes = (callback) => {
    sockets.on('server:loadNotes', callback);
}

export const saveNotes = (title,description) => {
    sockets.emit('client:newNotes', {
        title,
        description
    });
}

export const onNewNote = (callback) => {
    sockets.on('server:newnote',callback);

}

export const deleteNote = id => {
    sockets.emit('client:deletenote',id);
}

export const getNoteById = (id) => {
    sockets.emit('client:getNote',id);
}

export const onSelected = (callback) => {
    sockets.on('server:selectednote',callback);
}

export const updateNote = (id,title,description) => {
    sockets.emit('client:updatenote',{
        _id: id,
        title,
        description
    })
}