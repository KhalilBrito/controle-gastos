import { apiGet } from "./api";

export function obterTotais() {
    return apiGet("Totais");
}