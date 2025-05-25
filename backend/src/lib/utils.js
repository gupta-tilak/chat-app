import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, 
        { expiresIn: "7d" });

    res.cookie("jwt", token, {
        httpOnly: true, // prevenets XSS attacks cross-site scripting attack
        sameSite : "strict", // prevents CSRF cross site request forgery attacks
        secure: process.env.NODE_ENV !== "development", // only send cookie in https
        maxAge: 7*24*60*60*1000, //miliseconds,
    });

    return token;
};