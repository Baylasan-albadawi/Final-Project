import { Router, Request, Response, NextFunction} from "express";
import { createHotline, getHotlines } from "../controllers/hotlines.js";

const router = Router()

router.get("/", getHotlines)

router.post("/", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const hotline = req.body
        if (!hotline.hotlineNumber || !hotline.id) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false,
            })
        }

        const newHotline = await createHotline(hotline)

        res.status(201).json({
            message: "Hotline added successfully",
            success: true,
            data: newHotline
        })

    } catch (error) {
        next(error)
    }
})

export default router;