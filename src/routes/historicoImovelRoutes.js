const { buscar, criar, editar, deletar } = require("../controllers/historicoImovelController");
const { validarDados } = require("../middlewares/historicoImovelMiddlewares");

const routes = require("express").Router();

routes.get("/", buscar);
routes.post("/", validarDados, criar);
routes.put("/:id", validarDados, editar);
routes.delete("/:id", deletar);

module.exports = routes;