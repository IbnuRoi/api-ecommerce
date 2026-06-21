export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(
            {
                ...req.body,
                ...req.params,
                ...req.query
            },
            { abortEarly: false }
        )

        console.log(error)
        if(error) {
            const errors = error.details.forEach((ele) => {
                res.json({message: ele.message, field: ele.path[0]})
            })
            res.status(400).json({
                message: "Validation error",
                errors
            })
        }

        next()
    }
}