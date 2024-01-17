export interface Category {
    _id: string;
    name: string;
    parent: { _id: string, name: string };
    description: string;
    image: string;
}
