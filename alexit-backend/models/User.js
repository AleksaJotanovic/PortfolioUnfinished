import mongoose from 'mongoose';



const UserSchema = mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { _id: { type: String, required: true }, name: { type: String, required: true } },
    shippingAddress: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        zip: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true }
    },
    creditCard: {
        number: { type: String, default: "" },
        expiryDate: { type: String, default: "" },
        cvv: { type: String, default: "" }
    }
}, { versionKey: false });



export default mongoose.model("User", UserSchema);