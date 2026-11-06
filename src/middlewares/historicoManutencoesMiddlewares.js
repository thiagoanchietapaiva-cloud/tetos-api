function validarDados(req, res, next) {
    const obrigatorios = ["descricao", "data", "imovel_id"];

    const faltando = obrigatorios.filter((campo) => {
        const valor = req.body[campo];
        return valor === undefined || valor === null || valor === "";
    });

    if (faltando.length > 0) {
        return res.json({
            type: "warning",
            description: `Colunas não informadas: ${faltando.join(", ")}`
        });
    }

    if (isNaN(new Date(req.body.data))) {
        return res.json({
            type: "warning",
            description: "Data inválida. Use o formato AAAA-MM-DD (ex: 2026-11-05)"
        });
    }

    next();
}

module.exports = { validarDados };