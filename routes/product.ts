import { Router, Request, Response, NextFunction} from "express";
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/products.js"


const router = Router()

router.get('/', getAllProducts)

router.get('/:id', async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const productId = Number(req.params.id)
        const product = await getSingleProduct(productId)

        res.json({
            message: "This is the product you're looking for:",
            product: product
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.body.name || !req.body.shopId || !req.body.categoies) {
            return res.status(400).json({
                message: "some fields are missing!!",
                success: false
            })
        }

        const shop = await createProduct(req.body, req.body.shopId, req.body.categories)
        res.json({
            message: "Product created successfully",
            shop: shop
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

export default router;
