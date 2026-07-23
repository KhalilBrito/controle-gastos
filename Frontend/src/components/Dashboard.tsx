import { useEffect, useState } from "react";
import { obterTotais } from "../services/totaisService";
import type { ResumoTotais } from "../types/ResumoTotais";

interface DashboardProps {
    refresh: number;
}

export default function Dashboard({ refresh }: DashboardProps) {

    const [dados, setDados] = useState<ResumoTotais | null>(null);

    async function carregar() {
        const resultado = await obterTotais();
        setDados(resultado);
    }

    useEffect(() => {
        carregar();
    }, [refresh]);

    if (!dados) {
        return <div className="card">Carregando...</div>;
    }

    return (
        <div className="card">

    <h2>Resumo Financeiro</h2>

    <div className="resumo">

        <div className="resumo-card">
            <h3>Receitas</h3>
            <p>R$ {dados.totalGeral.totalReceitas}</p>
        </div>

        <div className="resumo-card">
            <h3>Despesas</h3>
            <p>R$ {dados.totalGeral.totalDespesas}</p>
        </div>

        <div className="resumo-card">
            <h3>Saldo</h3>
            <p>R$ {dados.totalGeral.saldo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
})}</p>
        </div>

    </div>

</div>
    );
}