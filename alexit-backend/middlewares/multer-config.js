import multer from "multer";



const categoryStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/categories'),
    filename: (req, file, cb) => {
        let unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, unique + '.' + file.mimetype.split('/')[1]);
    }
});
export const categoryUpload = multer({ storage: categoryStorage });


const productStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/products'),
    filename: (req, file, cb) => {
        let unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, unique + '.' + file.mimetype.split('/')[1]);
    }
});
export const productUpload = multer({ storage: productStorage });