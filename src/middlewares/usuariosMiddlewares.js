const jwt = require("jsonwebtoken");

function usuarioAutenticado(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            type: "warning",
            description: "Acesso não autorizado."
        });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.SEGREDO, (error) => {
        if (error) {
            return res.status(401).json({
                type: "warning",
                description: "Token invalido."
            });
        }

        next();
    });
}

module.exports = {
    usuarioAutenticado
};