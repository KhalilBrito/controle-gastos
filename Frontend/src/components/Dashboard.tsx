import { useEffect, useState } from "react";
import { obterTotais } from "../services/totaisService";
import type { ResumoTotais } from "../types/ResumoTotais";

export default function Dashboard() {

    const [dados, setDados] = useState<ResumoTotais | null>(null);

    async function carregar() {
        const resultado = await obterTotais();
        setDados(resultado);
    }

    useEffect(() => {
        carregar();
    }, []);

    if (!dados) {
        return <div className="card">Carregando...</div>;
    }

    return (
        <div className="card">

            <h2>Resumo Financeiro</h2>

            <p><strong>Receitas:</strong> R$ {dados.totalGeral.totalReceitas}</p>

            <p><strong>Despesas:</strong> R$ {dados.totalGeral.totalDespesas}</p>

            <p><strong>Saldo:</strong> R$ {dados.totalGeral.saldo}</p>

        </div>
    );
}