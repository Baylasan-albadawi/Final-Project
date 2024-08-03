import { Product } from "../db/entities/Product.js";
import { Shop } from "../db/entities/Shop.js";
import { Router, Request, Response, NextFunction} from "express";
import { AppError } from "../errors/AppErrors.js";
import { Hotline } from "../db/entities/Hotline.js";

const getAllShops=async (req: Request, res: Response)=>{
    const shops = await Shop.find()

    res.json({
        message: "Getting all shops",
        books: shops
    })
}

const createShop= async (payload: Shop, hotlineId: number)=>{
    const shop = await Shop.findOne({ where: { email: payload.email }})

    if(shop){
        throw new AppError("Shop already exists", 409, true)
    }

    const hotline = await Hotline.findOne({ where: { id: hotlineId } })
    if (!hotline) {
        throw new AppError("This Hotline dose not exists", 404, true)
    }

        const newShop = await Shop.create({
            ...payload,
            hotline
        }).save()
    return newShop
}

const getSingleShop = async (shopId: any) => {
    const shop = await Shop.findOne({ where: { id: shopId } })

    if (!shop) {
        throw new AppError("Shop not found", 404, true)
    }

    return shop
}

export {getAllShops, createShop, getSingleShop}