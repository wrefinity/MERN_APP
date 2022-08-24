import jwt from "jsonwebtoken";

export const checkUser = (req, res, next) => {
   const authHeaders = req.headers.token;

   if (authHeaders) {
      const token = authHeaders.split(" ")[1];
      jwt.verify(token, process.env.PROJECT_SECRET, async (err, user) => {
         if (err) return res.status(401).json("invalid token");
         req.user = user;
         next();
      });
   } else {
      res.status(401).json("invalid authentication method");
   }
};

export const verifyTokenAndRoles = (req, res, next) => {
   checkUser(req, res, () => {
      if (req.user) {
         next();
      } else {
         return res.status(403).json("user right restricted");
      }
   });
};

export const verifyTokenAndAdmin = (req, res, next) => {
   checkUser(req, res, () => {
      if (req.user.isAdmin) {
         next();
      } else {
         return res.status(403).json("user right restricted");
      }
   });
};
