const PRISMA = require("../services");

function montarDados(body) {
    const {
        descricao, data_entrada, data_saida,
        valor_aluguel, valor_iptu, valor_condominio,
        imovel_id, locatario_id
    } = body;

    return {
        descricao,
        data_entrada: new Date(data_entrada),
        data_saida: new Date(data_saida),
        valor_aluguel: Number(valor_aluguel) || 0,
        valor_iptu: Number(valor_iptu) || 0,
        valor_condominio: Number(valor_condominio) || 0,
        imovel_id,
        locatario_id,
        updatedAt: new Date()
    };
}

async function buscar(req, res) {
    try {
        const linhas = await PRISMA.historico_imovel.findMany({
            include: { imoveis: true, locatarios: true }
        });
        res.json(linhas);
    } catch (error) {
        res.json({ type: "error", description: error.message });
    }
}

async function criar(req, res) {
    try {
        await PRISMA.historico_imovel.create({ data: montarDados(req.body) });

        res.json({ type: "success", description: "Registro criado com sucesso." });
    } catch (error) {
        res.json({ type: "error", description: error.message });
    }
}

async function editar(req, res) {
    try {
        const { id } = req.params;

        await PRISMA.historico_imovel.update({
            where: { id },
            data: montarDados(req.body)
        });

        res.json({ type: "success", description: "Registro atualizado com sucesso." });
    } catch (error) {
        res.json({ type: "error", description: error.message });
    }
}

async function deletar(req, res) {
    try {
        const { id } = req.params;

        await PRISMA.historico_imovel.delete({ where: { id } });

        res.json({ type: "success", description: "Registro deletado com sucesso." });
    } catch (error) {
        res.json({ type: "error", description: error.message });
    }
}

module.exports = { buscar, criar, editar, deletar };