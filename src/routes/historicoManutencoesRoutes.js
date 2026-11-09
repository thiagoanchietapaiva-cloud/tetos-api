const { buscar, criar, editar, deletar } = require("../controllers/historicoManutencoesController");
const { validarDados } = require("../middlewares/historicoManutencoesMiddlewares");

const routes = require("express").Router();

routes.get("/",
    /*
      #swagger.tags = ['Histórico de Manutenções']
      #swagger.summary = 'Buscar'
      #swagger.description = 'Retorna os históricos de manutenção cadastrados, incluindo os dados do imóvel relacionado'
      #swagger.responses[200] = {
          description: 'Lista de históricos de manutenção retornada com sucesso',
          schema: [{
              id: '550e8400-e29b-41d4-a716-446655440000',
              descricao: 'Reparo hidráulico',
              valor: 250,
              data: '2026-11-09T00:00:00.000Z',
              createdAt: '2026-11-09T00:00:00.000Z',
              updatedAt: '2026-11-09T00:00:00.000Z',
              imovel_id: '550e8400-e29b-41d4-a716-446655440001',
              imoveis: {}
          }]
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    buscar);

routes.post("/",
    /*
      #swagger.tags = ['Histórico de Manutenções']
      #swagger.summary = 'Criar'
      #swagger.description = 'Cria um novo histórico de manutenção'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Dados para criação do histórico de manutenção',
          schema: {
              $descricao: 'Reparo hidráulico',
              $data: '2026-11-09',
              valor: 250,
              $imovel_id: '550e8400-e29b-41d4-a716-446655440001'
          }
      }
      #swagger.responses[201] = {
          description: 'Registro criado com sucesso',
          schema: { type: 'success', description: 'Registro criado com sucesso.' }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos ou faltando'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    validarDados, criar);

routes.put("/:id",
    /*
      #swagger.tags = ['Histórico de Manutenções']
      #swagger.summary = 'Editar'
      #swagger.description = 'Edita um histórico de manutenção existente pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'ID UUID do histórico de manutenção'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Novos dados do histórico de manutenção',
          schema: {
              $descricao: 'Reparo hidráulico',
              $data: '2026-11-09',
              valor: 250,
              $imovel_id: '550e8400-e29b-41d4-a716-446655440001'
          }
      }
      #swagger.responses[200] = {
          description: 'Registro atualizado com sucesso',
          schema: { type: 'success', description: 'Registro atualizado com sucesso.' }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
      #swagger.responses[404] = {
          description: 'Registro não encontrado'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    validarDados, editar);

routes.delete("/:id",
    /*
      #swagger.tags = ['Histórico de Manutenções']
      #swagger.summary = 'Deletar'
      #swagger.description = 'Remove um histórico de manutenção pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'ID UUID do histórico de manutenção que será deletado'
      }
      #swagger.responses[200] = {
          description: 'Registro deletado com sucesso',
          schema: { type: 'success', description: 'Registro deletado com sucesso.' }
      }
      #swagger.responses[404] = {
          description: 'Registro não encontrado'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    deletar);

module.exports = routes;