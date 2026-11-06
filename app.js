const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/docs/swagger-output.json");
const niveisRoutes = require("./src/routes/niveisRoutes");
const imoveisTipoRoutes = require("./src/routes/imoveisTipoRoutes");
const usuariosRoutes = require("./src/routes/usuariosRoutes");
const locatariosRoutes = require("./src/routes/locatariosRoutes");
const imoveisRoutes = require("./src/routes/imoveisRoutes");
const historicoImovelRoutes = require("./src/routes/historicoImovelRoutes");
const historicoManutencoesRoutes = require("./src/routes/historicoManutencoesRoutes");
const { login } = require("./src/controllers/usuariosController");
const { usuarioAutenticado } = require("./src/middlewares/usuariosMiddlewares");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.redirect("/docs");
});
app.post("/login", login);

app.use("/niveis", usuarioAutenticado, niveisRoutes);
app.use("/imoveis-tipo", usuarioAutenticado, imoveisTipoRoutes);
app.use("/usuarios", usuarioAutenticado, usuariosRoutes);
app.use("/locatarios", usuarioAutenticado, locatariosRoutes);
app.use("/imoveis", usuarioAutenticado, imoveisRoutes);
app.use("/historico-imovel", usuarioAutenticado, historicoImovelRoutes);
app.use("/historico-manutencoes", usuarioAutenticado, historicoManutencoesRoutes);

app.listen(3000, () => {
    console.log("Servidor on: http://localhost:3000");
});