export const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    `You're not authorized to access this route. You are ${req.user.role}`,
                    401
                )
            )
        }
        next()
    }
}