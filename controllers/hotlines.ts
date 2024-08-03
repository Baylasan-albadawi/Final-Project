import { Router, Request, Response, NextFunction} from "express";
import { Hotline } from "../db/entities/Hotline.js";

const createHotline= async (hotline: Hotline) => {
  const hotlineExists = await Hotline.findOne({
    where: { hotlineNumber: hotline.hotlineNumber},
  });

  if (hotlineExists) {
    throw new Error("Hotline already exists");
  }

  const newHotline = await Hotline.create(Hotline).save();

  return newHotline;
};

const getHotlines=async (req: Request, res: Response)=>{
    const hotline = await Hotline.find()

    res.json({
        message: "Getting all Hotlines",
        hotline: hotline
    })
}
export { createHotline, getHotlines };
