const jwt = require("jsonwebtoken");

function usuarioAutenticado(req, res, next){
    let authorization = req.headers.authorization;
    if(!authorization){
        res.status(401).json({
            type: "warning",
            description: "Acesso não autorizado."
        });
        return;
    }

    let token = authorization.split(" ")[1];

    jwt.verify(token, process.env.SEGREDO, (error) => {
        if(error){
            res.status(401).json({
                type: "warning",
                description: "Token invalido."
            })
        }

        next();
    });
}

module.exports = {
    usuarioAutenticado
}