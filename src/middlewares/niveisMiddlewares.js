function validarDados(req, res, next) {
    const {nome} = re.body;
    if (!nome) {
        res.json({
            type: "warning",
            description: "Coluna nome não informada"
        })
        }
        
    
    }
