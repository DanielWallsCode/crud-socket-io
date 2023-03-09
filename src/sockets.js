import Note from './models/Notes.js';

export default (io) => {
    io.on('connection', (socket) => {

        const emitNotes = async() => {
           const notes =  await Note.find();

           io.emit('server:loadNotes',notes)
        }
        emitNotes();

        socket.on('client:newNotes',async(data) => {
            const {title,description} = data;
            
           const newNote = new Note({title,description});
           const saveNote = await newNote.save();

           io.emit('server:newnote',saveNote)
           
        });

        socket.on('client:deletenote',async(id) => {
            await Note.findByIdAndDelete(id);
            emitNotes();
        });

        socket.on('client:getNote', async(id) => {
            const note = await Note.findById(id);
            io.emit('server:selectednote', note);
        });

        socket.on('client:updatenote', async(updateNote) => {
            await Note.findByIdAndUpdate(updateNote._id,{
                title: updateNote.title,
                description: updateNote.description
            });
            emitNotes();
        })

    })
}