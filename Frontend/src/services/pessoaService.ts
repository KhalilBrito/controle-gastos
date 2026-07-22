import { apiDelete, apiGet, apiPost } from "./api";
import type { Pessoa } from "../types/Pessoa";


export function listarPessoas() {
    return apiGet("Pessoa") as Promise<Pessoa[]>;
}


export function criarPessoa(pessoa: Omit<Pessoa, "id">) {
    return apiPost("Pessoa", pessoa);
}


export function excluirPessoa(id: number) {
    return apiDelete(`Pessoa/${id}`);
}