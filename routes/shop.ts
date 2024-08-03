import { Router, Request, Response, NextFunction} from "express";
import { getAllShops, createShop, getSingleShop } from "../controllers/shops.js";
import { AppError } from "../errors/AppErrors.js";
import { Product } from "../db/entities/Product.js";

const router = Router()

router.get('/', getAllShops)
router.get('/:id', async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const shopId = Number(req.params.id)
        const shop = await getSingleShop(shopId)
        res.json({
            message: "This is the Shop you're looking for:",
            shop: shop
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.body.shopName || !req.body.hotline || !req.body.email || !req.body.password) {
            return res.status(400).json({
                message: "some fields are missing!!",
                success: false
            })
        }

        const shop = await createShop(req.body, req.body.hotline)
        res.json({
            message: "Shop created successfully",
            shop: shop
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

export default router;
