import { Product } from "../db/entities/Product.js";
import { Shop } from "../db/entities/Shop.js";
import { Router, Request, Response, NextFunction} from "express";
import { AppError } from "../errors/AppErrors.js";
import { Hotline } from "../db/entities/Hotline.js";
import { Category } from "../db/entities/Category.js";

const getAllCategories=async (req: Request, res: Response)=>{
    const category = await Category.find()

    res.json({
        message: "Getting all Categories",
        category: category
    })
}

const createCategory= async (category: Category)=>{
    const categoryExists = await Category.findOne({ where: { name:category.name } })

    if (categoryExists) {
        throw new Error("Category already exists")
    }

    const newCategory = await Category.create(category).save()

    return newCategory
}
export {getAllCategories, createCategory}