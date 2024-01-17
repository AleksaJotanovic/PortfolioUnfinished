import mongoose from "mongoose";

const specificationsSchema = mongoose.Schema({
    spec: { type: String },
    value: { type: String }
}, { _id: false });

const ProductSchema = mongoose.Schema({
    _id: { type: String, required: true },
    category: { _id: { type: String }, name: { type: String } },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    uom: { type: String, required: true },
    sku: { type: String, required: true },
    price: {
        purchase: { type: Number, required: true },
        regular: { type: Number, required: true },
        sale: { type: Number, required: true },
        earning: { type: Number, required: true }
    },
    margin: { type: Number, required: true },
    images: [String],
    specifications: [specificationsSchema],
    inStock: { type: Number, required: true },
    weight: { type: Number, required: true },
    garantee: { type: String, required: true },
    published: { type: Boolean, required: true },
}, { versionKey: false });



export default mongoose.model("Product", ProductSchema);