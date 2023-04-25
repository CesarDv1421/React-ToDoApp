import Jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization && authorization.split(" ")[1];

  if (!token) return res.status(401).json({ status: res.statusCode, message: "You are not authenticated, token does not exist" });

  Jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
        return res.status(401).json({
          message: "Access Denied, Token expires or incorrect",
          status: res.statusCode
        });
    } else {
      req.user = user;
      next();
    }
  });
};

export default validateToken