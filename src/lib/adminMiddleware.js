import createHttpError from "http-errors";

export const adminMiddleware = (req, res, next) => {
  if (!req.user.role === "host") {
    next(createHttpError(403, "Unauthorized access. Host only."));
  }
    next();
};
