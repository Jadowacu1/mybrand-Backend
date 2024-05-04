import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
declare global {
  namespace Express {
    interface Request {
      user?: string;
      role?: string;
    }
  }
}
// import dotenv from "dotenv";

const TOKEN_SECRET = "NeverTrustPeople";
const admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: any = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const verifyToken: any = await jwt.verify(token, TOKEN_SECRET);
    if (verifyToken) {
      req.user = verifyToken.email;
      const role = (req.role = verifyToken.role);
      if (role == "admin") {
        next();
      } else {
        return res.json("Your Note Allowed to perfom this");
      }
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
const client = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: any = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const verifyToken: any = await jwt.verify(token, TOKEN_SECRET);
    if (verifyToken) {
      req.user = verifyToken.email;
      next();
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
export { admin, client };
