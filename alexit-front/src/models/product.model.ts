export interface Product {
    _id: string;
    category: { _id: string, name: string };
    name: string;
    manufacturer: string;
    uom: string;
    sku: string;
    price: { purchase: number; regular: number; sale: number; earning: number }
    margin: number;
    images: string[];
    specifications: { spec: string; value: string }[];
    inStock: number;
    weight: number;
    garantee: string;
    published: boolean;
}
