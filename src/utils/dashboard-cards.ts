import { Role } from "../types/Role";

export const dashboardCards = [
  {
    title: "Cadastrar Cliente",
    description: "Adicione um novo cliente",
    to: "/hub-pet/clientes/novo",
    roles: [Role.ADMIN, Role.ATENDENTE]
  },
  {
    title: "Consultar Clientes",
    description: "Consulte os clientes cadastrados",
    to: "/hub-pet/clientes/consultar",
    roles: [Role.ADMIN, Role.ATENDENTE]
  },
  {
    title: "Agendar Serviço",
    description: "Organize seus agendamentos",
    to: "/hub-pet/agendamento",
    roles: [Role.ADMIN, Role.ATENDENTE]
  },
  {
    title: "Ver Agenda",
    description: "Acompanhe o status dos serviços",
    to: "/hub-pet/agenda",
    roles: [Role.ADMIN, Role.ATENDENTE, Role.VETERINARIO]
  },
  {
    title: "Cadastrar Venda",
    description: "Adicione uma nova venda",
    to: "/hub-pet/vendas/nova",
    roles: [Role.ADMIN, Role.ATENDENTE, Role.ESTOQUISTA]
  },
  {
    title: "Consultar Vendas",
    description: "Consulte as vendas registradas",
    to: "/hub-pet/vendas",
    roles: [Role.ADMIN, Role.ATENDENTE, Role.ESTOQUISTA]
  },
  {
    title: "Ver Estoque",
    description: "Consulte os produtos disponíveis",
    to: "/hub-pet/estoque",
    roles: [Role.ADMIN, Role.ESTOQUISTA]
  },
  {
    title: "Prontuário Médico",
    description: "Registre o prontuário médico",
    to: "/hub-pet/prontuario",
    roles: [Role.ADMIN, Role.VETERINARIO]
  },
  {
    title: "Cadastrar Usuário",
    description: "Adicione um novo usuário",
    to: "/hub-pet/usuarios/novo",
    roles: [Role.ADMIN]
  },
];
