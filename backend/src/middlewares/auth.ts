import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import ObjectID from "bson-objectid";

export const check = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.cookies.token ||
    req.headers["authorization"]?.replace("Bearer ", "");
  const secret: any = process.env.secret;
  //console.log("token",token);
  try {
    const data: any = jwt.verify(token, secret);
    data["_doc"]._id = ObjectID(data["_doc"]._id);
    req.body.user = data["_doc"];
    //console.log("token",data["_doc"]);
    next();
  } catch (err) {
    res.status(401).json({message:"Invalid token"});
  }
};
