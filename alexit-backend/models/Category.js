import mongoose from "mongoose";



const CategorySchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    parent: { _id: { type: String }, name: { type: String } },
    description: { type: String },
    image: { type: String, required: true },
}, { versionKey: false });



export default mongoose.model("Category", CategorySchema);