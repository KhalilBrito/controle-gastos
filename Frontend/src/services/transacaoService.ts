import { apiGet, apiPost } from "./api";
import type { Transacao } from "../types/Transacao";

export function listarTransacoes() {
    return apiGet("Transacao") as Promise<Transacao[]>;
}

export function criarTransacao(transacao: Omit<Transacao, "id">) {
    return apiPost("Transacao", transacao);
}