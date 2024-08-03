import { Product } from "../db/entities/Product.js"
import { Router, Request, Response, NextFunction} from "express";
import { Shop } from "../db/entities/Shop.js";
import { AppError } from "../errors/AppErrors.js";
import { Category } from "../db/entities/Category.js";
import { In } from "typeorm";

const getAllProducts=async (req: Request, res: Response)=>{
    const products = await Product.find()

    res.json({
        message: "Getting all Products",
        products: Product
    })
}
const createProduct =async( products: Product, shopId: number, categoryIds: number[]) => {
    const shop = await Shop.findOne({ where: {id: shopId}})
    
        if (!shop) {
            throw new AppError("Shop dose not exist", 404, true)
        }
        
    const categories = await Category.find({ where: { id: In(categoryIds) } })
        if (categories.length !== categoryIds.length) {
            throw new AppError("some categories do not exists", 404, true)
        }
    const product = await Product.findOne({
        where: {
                 name: products.name,
                 shops: Shop
                }
        });
    
        if (product) {
            throw new AppError("Product already exists", 409, true)
        }
        
        const newProduct = Product.create({
            ...products,
            shop,
            categories
        })
    
        return newProduct.save()
}
const getSingleProduct = async(productId: number)=>{
    const product = await Product.findOne({ where: { id: productId } })

    if (!product) {
        throw new AppError("Product not found", 404, true)
    }

    return product
}
export {getAllProducts, createProduct, getSingleProduct}