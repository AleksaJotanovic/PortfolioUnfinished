export interface User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    role: { _id: string, name: string };
    shippingAddress: { country: string; city: string; street: string; zip: string; phone: string; email: string };
    creditCard: { number: string; expiryDate: string; cvv: string };
}