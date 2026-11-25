const PRISMA = require("../services");

// 👈 NOVO: converte para número só se o campo foi enviado (undefined = Prisma ignora)
function numeroOuUndefined(valor) {
    if (valor === undefined || valor === null || valor === "") return undefined;
    return Number(valor);
}

async function buscar(req, res){
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

        // 👈 NOVO: o front pede ?tipo=true e o backend ignorava
        if (req.query.tipo === "true") {
            includeObj.imoveis_tipo = true; // ⚠️ CONFIRA o nome da relação no schema.prisma
        }

        // Se houver pelo menos um relacionamento solicitado, adiciona o include na query
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

async function criar(req, res){
    try {
        const dados = req.body;
        const arquivo = req.file;

        await PRISMA.imoveis.create({
            data: {
                ...dados,
                quartos: Number(dados.quartos),
                banheiros: Number(dados.banheiros),
                suites: numeroOuUndefined(dados.suites),                 // 👈 MUDOU
                garagens: numeroOuUndefined(dados.garagens),             // 👈 MUDOU
                metragem: numeroOuUndefined(dados.metragem),             // 👈 MUDOU
                valor_aluguel: numeroOuUndefined(dados.valor_aluguel),   // 👈 MUDOU
                imagem: arquivo ? `/uploads/imoveis/${arquivo.filename}` : null // 👈 MUDOU: imagem opcional
            }
        });
        
        res.status(201).json({ // 👈 MUDOU: status 201
            type: "success",
            description: "Registro criado com sucesso."
        })
        
    } catch (error) {
        res.status(500).json({ // 👈 MUDOU: status 500 (antes era 200)
            type: "error",
            description: error.message 
        });
    }
}

async function editar(req, res){
    try {
        const { id: _ignorar, ...dados } = req.body; // 👈 MUDOU: tira o id de dentro do data
        const { id } = req.params;
        
        await PRISMA.imoveis.update({
            where: {
                id
            },
            data: {
                ...dados,
                quartos: numeroOuUndefined(dados.quartos),               // 👈 MUDOU
                banheiros: numeroOuUndefined(dados.banheiros),           // 👈 MUDOU
                suites: numeroOuUndefined(dados.suites),                 // 👈 MUDOU
                garagens: numeroOuUndefined(dados.garagens),             // 👈 MUDOU
                metragem: numeroOuUndefined(dados.metragem),             // 👈 MUDOU
                valor_aluguel: numeroOuUndefined(dados.valor_aluguel),   // 👈 MUDOU
                imagem: req.file ? `/uploads/imoveis/${req.file.filename}` : undefined // 👈 MUDOU: só troca se enviou arquivo
            }
        });
        
        res.json({
            type: "success",
            description: "Registro atualizado com sucesso."
        })
        
    } catch (error) {
        res.status(500).json({ // 👈 MUDOU
            type: "error",
            description: error.message 
        });
    }
}

async function deletar(req, res){
    try {
        const { id } = req.params;
        
        await PRISMA.imoveis.delete({
            where: {
                id
            }
        });
        
        res.json({
            type: "success",
            description: "Registro deletado com sucesso."
        })
        
    } catch (error) {
        res.status(500).json({ // 👈 MUDOU
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
}