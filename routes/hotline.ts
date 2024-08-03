import { Router, Request, Response, NextFunction} from "express";
import { createHotline, getHotlines } from "../controllers/hotlines.js";

const router = Router()

router.get("/", getHotlines)

router.post("/", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const hotline = req.body
        if (!hotline.hotlineNumber) {
            return res.status(400).json({
                message: "Hotline number is missing",
                success: false,
            })
        }

        const newHotline = await createHotline(hotline)

        res.status(201).json({
            message: "Hotline added successfully",
            success: true,
            hotline: newHotline
        })

    } catch (error) {
        next(error)
    }
})

export default router;