import { Role } from "../types/Role";

export const navigationLinks = [
    { label: "Início", to: "/", end: true, roles: [Role.ADMIN, Role.ATENDENTE, Role.ESTOQUISTA, Role.VETERINARIO] },
    { label: "Dashboard", to: "/hub-pet", end: true, roles: [Role.ADMIN, Role.ATENDENTE, Role.ESTOQUISTA, Role.VETERINARIO] },
    { label: "Cadastrar Clientes", to: "/hub-pet/clientes/novo", roles: [Role.ADMIN, Role.ATENDENTE] },
    { label: "Consultar Clientes", to: "/hub-pet/clientes/consultar", roles: [Role.ADMIN, Role.ATENDENTE] },
    { label: "Agendar Serviço", to: "/hub-pet/agendamento", roles: [Role.ADMIN, Role.ATENDENTE] },
    { label: "Agenda", to: "/hub-pet/agenda", roles: [Role.ADMIN, Role.ATENDENTE, Role.VETERINARIO] },
    { label: "Cadastrar Vendas", to: "/hub-pet/vendas/nova", roles: [Role.ADMIN, Role.ATENDENTE, Role.ESTOQUISTA] },
    { label: "Consultar Vendas", to: "/hub-pet/vendas", roles: [Role.ADMIN, Role.ESTOQUISTA] },
    { label: "Estoque", to: "/hub-pet/estoque", roles: [Role.ADMIN, Role.ESTOQUISTA] },
    { label: "Prontuário", to: "/hub-pet/prontuario", roles: [Role.ADMIN, Role.VETERINARIO] },
];
