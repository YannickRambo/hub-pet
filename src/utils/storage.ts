import { products as produtosIniciais } from "./products";

// Chaves usadas no localStorage (as mesmas que as telas já utilizavam)
export const STORAGE_KEYS = {
  clientesPets: "@HubPet:clientesPets",
  agendamentos: "@HubPet:agendamentos",
  prontuarios: "@HubPet:prontuarios",
  inventory: "@HubPet:inventory",
} as const;

export interface Cadastro {
  id: number;
  cliente: {
    nome: string;
    telefone: string;
    email: string;
    cpf: string;
  };
  pet: {
    nome: string;
    especie: string;
    raca: string;
    idade: string;
  };
}

export interface ClienteResumo {
  // Identificador do cliente: CPF somente com números (ou o nome, se não houver CPF)
  id: string;
  nome: string;
}

export interface PetResumo {
  nome: string;
  especie: string;
}

// Situações possíveis de um serviço agendado
export const STATUS_SERVICO = [
  "Agendado",
  "Em andamento",
  "Concluído",
  "Cancelado",
] as const;

export type StatusServico = (typeof STATUS_SERVICO)[number];

export interface Agendamento {
  id: number;
  cliente: string;
  clienteId?: string;
  pet: string;
  servico: string;
  data: string;
  horario: string;
  // Opcional: agendamentos antigos (sem status) são tratados como "Agendado"
  status?: StatusServico;
}

export interface Produto {
  id: number | string;
  name: string;
  type: string;
  quantity: number;
  price: number;
}

function lerLista<T>(chave: string): T[] {
  try {
    const bruto = localStorage.getItem(chave);
    const dados = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(dados) ? (dados as T[]) : [];
  } catch {
    return [];
  }
}

function idDoCliente(cadastro: Cadastro): string {
  return cadastro.cliente.cpf.replace(/\D/g, "") || cadastro.cliente.nome;
}

export function getCadastros(): Cadastro[] {
  return lerLista<Cadastro>(STORAGE_KEYS.clientesPets);
}

// Lista de clientes sem repetição (um cliente pode ter vários pets cadastrados)
export function getClientes(): ClienteResumo[] {
  const porId = new Map<string, ClienteResumo>();

  for (const cadastro of getCadastros()) {
    const id = idDoCliente(cadastro);
    if (!porId.has(id)) {
      porId.set(id, { id, nome: cadastro.cliente.nome });
    }
  }

  return [...porId.values()].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

export function getPetsDoCliente(clienteId: string): PetResumo[] {
  return getCadastros()
    .filter((cadastro) => idDoCliente(cadastro) === clienteId)
    .map((cadastro) => ({ nome: cadastro.pet.nome, especie: cadastro.pet.especie }));
}

export function getAgendamentos(): Agendamento[] {
  return lerLista<Agendamento>(STORAGE_KEYS.agendamentos);
}

export function statusDoAgendamento(agendamento: Agendamento): StatusServico {
  return agendamento.status && STATUS_SERVICO.includes(agendamento.status)
    ? agendamento.status
    : "Agendado";
}

export function updateStatusAgendamento(id: number, status: StatusServico): void {
  const atualizados = getAgendamentos().map((agendamento) =>
    agendamento.id === id ? { ...agendamento, status } : agendamento,
  );
  localStorage.setItem(STORAGE_KEYS.agendamentos, JSON.stringify(atualizados));
}

export function addAgendamento(agendamento: Agendamento): void {
  localStorage.setItem(
    STORAGE_KEYS.agendamentos,
    JSON.stringify([...getAgendamentos(), agendamento]),
  );
}

// Produtos do estoque (os cadastrados na tela de Estoque); usa os padrões se ainda não houver nada salvo
export function getProdutos(): Produto[] {
  const salvos = lerLista<Produto>(STORAGE_KEYS.inventory);
  return salvos.length > 0 ? salvos : produtosIniciais;
}
