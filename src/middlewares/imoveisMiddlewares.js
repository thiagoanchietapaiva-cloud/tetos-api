const fs = require("fs");

function validarDados(req, res, next) {
    const colunas = [
        "logradouro",
        "bairro",
        "cidade",
        "estado",
        "numero",
        "quartos",
        "banheiros",
        "imoveis_tipo_id"
    ];
    const dados = req.body || {};
    let campoAusentes = colunas.filter(chave => !Object.keys(dados).includes(chave) || dados[chave] === "" || dados[chave] === null || dados[chave] === undefined);

    if (campoAusentes.length > 0) {

        if (req.file?.path) {
            fs.unlink(req.file.path, () => {});
        }

        return res.json(campoAusentes.map(campo => {
            return {
                type: "warning",
                description: `Coluna ${campo} não informada`
            }
        }))
    }

    next();
}

module.exports = {
    validarDados
}