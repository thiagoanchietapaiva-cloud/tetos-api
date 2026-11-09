const { buscar, criar, editar, deletar } = require("../controllers/usuariosController");
const { usuarioAutenticado } = require("../middlewares/usuariosMiddlewares");

const rotas = require("express").Router();

rotas.get("/",
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Buscar'
      #swagger.description = 'Retorna os usuários cadastrados sem expor suas senhas; requer autenticação'
      #swagger.security = [{ bearerAuth: [] }]
      #swagger.responses[200] = {
          description: 'Lista de usuários retornada com sucesso',
          schema: [{
              id: '550e8400-e29b-41d4-a716-446655440000',
              nome: 'João da Silva',
              email: 'joao@example.com',
              createdAt: '2026-11-09T00:00:00.000Z',
              updatedAt: '2026-11-09T00:00:00.000Z',
              nivel_id: '550e8400-e29b-41d4-a716-446655440001',
              nivel: { id: '550e8400-e29b-41d4-a716-446655440001', nome: 'Admin' }
          }]
      }
      #swagger.responses[401] = {
          description: 'Acesso não autorizado ou token inválido'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    usuarioAutenticado, buscar);
rotas.get("/", buscar);

rotas.post("/",
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Criar'
      #swagger.description = 'Cria um novo usuário; a senha é armazenada com hash'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Dados para criação do usuário',
          schema: {
              $nome: 'João da Silva',
              $email: 'joao@example.com',
              $senha: 'senha-segura',
              $nivel_id: '550e8400-e29b-41d4-a716-446655440001'
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
    criar);

rotas.put("/:id",
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Editar'
      #swagger.description = 'Edita um usuário existente pelo ID; se informada, a senha é armazenada com hash'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'ID UUID do usuário'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Campos do usuário que serão atualizados',
          schema: {
              nome: 'João da Silva',
              email: 'joao@example.com',
              senha: 'nova-senha',
              nivel_id: '550e8400-e29b-41d4-a716-446655440001'
          }
      }
      #swagger.responses[200] = {
          description: 'Registro atualizado com sucesso',
          schema: { type: 'success', description: 'Registro atualizado com sucesso.' }
      }
      #swagger.responses[404] = {
          description: 'Registro não encontrado'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    editar);

rotas.delete("/:id",
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Deletar'
      #swagger.description = 'Remove um usuário pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'ID UUID do usuário que será deletado'
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

module.exports = rotas;