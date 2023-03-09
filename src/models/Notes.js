import { Schema,model } from "mongoose";


const noteSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description : {
        type: String,
        required: true
    }
},{
    versionKey: false,
    timestamps: true
});


export default model('Note',noteSchema);