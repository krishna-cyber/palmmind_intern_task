import mongoose, { Types } from 'mongoose';

const schema = mongoose.Schema

const messageSchema = new schema({
    senderId:{
        type:Types.ObjectId,
        ref:"Users",
        required:true,
    },
    senderName:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message = mongoose.model("Messages",messageSchema)

export { Message };
