import Category from '../models/Category.js';
import { v4 as uuid } from 'uuid';
import { CreateError } from '../middlewares/error.js';
import { CreateSuccess } from '../middlewares/success.js';
import fs from 'fs';





export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        return next(CreateSuccess(200, "Category controller says: Fetching categories successfull :)", categories));
    } catch (error) {
        return next(CreateError(500, "Category controller says: Error catched at fetching categories :("));
    }
};


export const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return next(CreateError(404, "Category controller says: Specified category not found :("));
        } else {
            return next(CreateSuccess(200, "Category controller says: Category found :)", category));
        }
    } catch (error) {
        return next(CreateError(500, "Category controller says: Error catched while getting specified category :("));
    }
};


export const addCategory = async (req, res, next) => {

    try {
        if (req.body) {
            const newCategory = new Category({ ...req.body, _id: uuid() });
            await newCategory.save();
            return res.send();
        } else {
            return res.status(400).send("Category controller says: Error while adding category :(");
        }
    } catch (error) {
        return res.status(500).send(error);
    }

};


export const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            return res.send();
        } else {
            return res.status(400).send("Category controller says: Error while updating category :(");
        }
    } catch (error) {
        return res.status(500).send("Category controller says: Error catched while updating category :(");
    }
};


export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        const pathToImage = "C:/Users/Aleksa/Desktop/Angular-17/MeanStackAlexIT/alexit-backend/public/categories/";
        if (category) {
            await Category.findByIdAndDelete(req.params.id).then((data) => {
                const imageName = data.image.slice(data.image.lastIndexOf('/') + 1);
                fs.unlink(pathToImage + imageName, (err) => console.log('Delete image error: ', err));
            });
            return res.send();
        } else {
            return res.status(400).send("Category controller says: Delete category error :(");
        }
    } catch (error) {
        return res.status(500).send("Category controller says: Error catched while deleting category :(");
    }
};


export const uploadCategoryImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("Category controller says: Please choose image for category :(");
        } else {
            res.send({ data: req.file.filename });
        }
    } catch (error) {
        return res.status(500).send("Category controller says: Error catched while uploading image :(");
    }
};