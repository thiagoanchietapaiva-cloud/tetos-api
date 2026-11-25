const fs = require("fs");

function validarDados(req, res, next) {
    const colunas = [
        "cep",
        "logradouro",
        "bairro",
        "cidade",
        "estado",
        "numero",
        "valor_aluguel",
        "metragem",
        "quartos",
        "banheiros",
        "imoveis_tipo_id"
    ];

    const dados = req.body || {};

    const campoAusentes = colunas.filter((chave) => {
        const valor = dados[chave];
        if (valor === undefined || valor === null) return true;
        if (typeof valor === "string" && valor.trim() === "") return true;
        return false;
    });

    if (campoAusentes.length > 0) {
        if (req.file?.path) {
            fs.unlink(req.file.path, () => {});
        }

        return res.json(
            campoAusentes.map((campo) => ({
                type: "warning",
                description: `Coluna ${campo} não informada`
            }))
        );
    }

    next();
}

module.exports = {
    validarDados
};