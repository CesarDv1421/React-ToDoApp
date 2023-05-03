import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization && authorization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "You are not authenticated, token does not exist" });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
        return res.status(401).json({error: "Access Denied, Token expires or incorrect"});
    } else {
      req.user = user;
      next();
    }
  });
};

export default validateToken