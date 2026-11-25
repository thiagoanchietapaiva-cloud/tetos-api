const PRISMA = require("../services");

function numeroOuUndefined(valor) {
    if (valor === undefined || valor === null || valor === "") return undefined;
    const num = Number(valor);
    return Number.isNaN(num) ? undefined : num;
}

function stringOuNull(valor) {
    if (valor === undefined || valor === null) return null;
    const limpa = String(valor).trim();
    return limpa === "" ? null : limpa;
}

async function buscar(req, res) {
    try {
        const query = {};
        const includeObj = {};

        if (req.query.manutencoes === "true") {
            includeObj.historico_manutecao = true;
        }

        if (req.query.historicos === "true") {
            includeObj.historico_imovel = true;
        }

        if (req.query.locatario === "true") {
            includeObj.locatarios = true;
        }

        if (req.query.tipo === "true") {
            includeObj.imoveis_tipo = true;
        }

        if (Object.keys(includeObj).length > 0) {
            query.include = includeObj;
        }

        const linhas = await PRISMA.imoveis.findMany(query);
        return res.json(linhas);
    } catch (error) {
        return res.status(500).json({
            type: "error",
            description: error.message
        });
    }
}

async function criar(req, res) {
    try {
        const { imoveis_tipo_id, id: _id, ...dados } = req.body;
        const arquivo = req.file;
        const tipoIdFinal = dados.tipo_id || imoveis_tipo_id;

        if (!tipoIdFinal) {
            return res.status(400).json({
                type: "error",
                description: "O campo tipo_id (imoveis_tipo_id) é obrigatório."
            });
        }

        await PRISMA.imoveis.create({
            data: {
                ...dados,
                tipo_id: tipoIdFinal,
                locatario_id: dados.locatario_id || null,
                complemento: stringOuNull(dados.complemento),
                quartos: numeroOuUndefined(dados.quartos) ?? 0,
                banheiros: Number(dados.banheiros),
                suites: numeroOuUndefined(dados.suites) ?? 0,
                garagens: numeroOuUndefined(dados.garagens),
                metragem: Number(dados.metragem),
                valor_aluguel: Number(dados.valor_aluguel),
                imagem: arquivo ? `/uploads/imoveis/${arquivo.filename}` : stringOuNull(dados.imagem)
            }
        });

        return res.status(201).json({
            type: "success",
            description: "Registro criado com sucesso."
        });
    } catch (error) {
        return res.status(500).json({
            type: "error",
            description: error.message
        });
    }
}

async function editar(req, res) {
    try {
        const { id: _ignorar, imoveis_tipo_id, ...dados } = req.body;
        const { id } = req.params;
        const tipoIdFinal = dados.tipo_id || imoveis_tipo_id;

        await PRISMA.imoveis.update({
            where: {
                id
            },
            data: {
                ...dados,
                ...(tipoIdFinal ? { tipo_id: tipoIdFinal } : {}),
                locatario_id: dados.locatario_id === "" ? null : dados.locatario_id,
                complemento: dados.complemento !== undefined ? stringOuNull(dados.complemento) : undefined,
                quartos: numeroOuUndefined(dados.quartos),
                banheiros: numeroOuUndefined(dados.banheiros),
                suites: numeroOuUndefined(dados.suites),
                garagens: numeroOuUndefined(dados.garagens),
                metragem: numeroOuUndefined(dados.metragem),
                valor_aluguel: numeroOuUndefined(dados.valor_aluguel),
                imagem: req.file
                    ? `/uploads/imoveis/${req.file.filename}`
                    : (dados.imagem !== undefined ? stringOuNull(dados.imagem) : undefined)
            }
        });

        return res.json({
            type: "success",
            description: "Registro atualizado com sucesso."
        });
    } catch (error) {
        return res.status(500).json({
            type: "error",
            description: error.message
        });
    }
}

async function deletar(req, res) {
    try {
        const { id } = req.params;

        await PRISMA.imoveis.delete({
            where: {
                id
            }
        });

        return res.json({
            type: "success",
            description: "Registro deletado com sucesso."
        });
    } catch (error) {
        return res.status(500).json({
            type: "error",
            description: error.message
        });
    }
}

module.exports = {
    buscar,
    criar,
    editar,
    deletar
};