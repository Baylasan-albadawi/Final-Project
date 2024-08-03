import { Router, Request, Response, NextFunction} from "express";
import { createCategory, getAllCategories } from "../controllers/categories.js";

const router =Router()
router.get("/", getAllCategories)

router.post("/", async (req, res, next) => {
    try {
        const category = req.body
        if (!category.name || !category.id) {
            return res.status(400).json({
                message: "category name is missing",
                success: false,
            })
        }

        const newCategory = await createCategory(category)

        res.status(201).json({
            message: "Category created successfully",
            success: true,
            data: newCategory
        })

    } catch (error) {
        next(error)
    }
})

export default router;
