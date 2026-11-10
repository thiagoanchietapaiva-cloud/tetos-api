const PRISMA = require("../services");

async function buscar(req, res) {
    try {
        const query = {};

        if (req.query.manutencaoes == "true") {
            query.include ={
                historico_manutencoes: true
            }
        }
        if (req.query.historico == "true") {
            query.include ={
                historico_imovel: true
            }
        }
        if (req.query.locatarios == "true") {
            query.include ={
                locatarios: true
            }
        }


        const linhas = await PRISMA.imoveis.findMany(query);
        res.json(linhas);
    } catch (error) {
        res.json({
            type: "error",
            descrição: error.message
        });
    }
}

async function criar(req, res) {
    try {
        const dados = req.body;
        const arquivo = req.file;

        await PRISMA.imoveis.create({
            data: {
                ...dados,
                quartos: Number(dados.quartos),
                banheiros: Number(dados.banheiros),
                suites: Number(dados.suites),
                garagens: Number(dados.garagens),
                metragem: Number(dados.metragem),
                valor_aluguel: Number(dados.valor_aluguel),
                imagem: `./uploads/imoveis/${arquivo.filename}`
            }
        });

        res.json({
            type: "sucess",
            descricao: "Registro criado com sucesso"
        })
    } catch (error) {
        res.json({
            type: "error",
            descricao: error.message
        });
    }
}

async function editar(req, res) {
    try {
        const dados = req.body;
        const { id } = req.params;


        await PRISMA.imoveis.update({
            where: {
                id
            },
            data: dados
        })
        res.json({
            type: "success",
            descricao: "Registro atualizado com sucesso"
        })
    } catch (error) {
        res.json({
            type: "error",
            descricao: error.message
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

        res.json({
            type: "success",
            descricao: "Registro deletado com sucesso"
        });
    } catch (error) {
        res.json({
            type: "error",
            descricao: error.message
        });
    }
}

module.exports = {
    buscar,
    criar,
    editar,
    deletar,
}