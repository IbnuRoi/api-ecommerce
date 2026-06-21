import adminRouter from "./modules/admin/admin.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import { AppError } from "./utils/appError.js";


export function bootstrap(app) {
    app.use("/api/v1/admin", adminRouter)
    app.use("/api/v1/auth", authRouter)

    app.use((req, res, next) => {
        next(new AppError("Endpoint was not found"), 404)
    })
}