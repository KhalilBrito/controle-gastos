import { useEffect, useState } from "react";
import type { Pessoa } from "../types/Pessoa";
import type { Transacao } from "../types/Transacao";
import { listarPessoas } from "../services/pessoaService";
import { listarTransacoes, criarTransacao } from "../services/transacaoService";

export default function Transacoes() {

    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState("Despesa");
    const [pessoaId, setPessoaId] = useState(0);

    async function carregarDados() {
        setTransacoes(await listarTransacoes());
        setPessoas(await listarPessoas());
    }

    async function salvar() {

        console.log({
            descricao,
            valor,
            tipo,
            pessoaId
});

        await criarTransacao({
            descricao,
            valor,
            tipo,
            pessoaId
        });

        setDescricao("");
        setValor(0);

        carregarDados();
    }

    useEffect(() => {
        carregarDados();
    }, []);

    return (

        <div className="card">

            <h2>Transações</h2>

            <input
                placeholder="Descrição"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
            />

            <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={e => setValor(Number(e.target.value))}
            />

            <select
                value={tipo}
                onChange={e => setTipo(e.target.value)}
            >
                <option>Despesa</option>
                <option>Receita</option>
            </select>

            <select
                value={pessoaId}
                onChange={e => setPessoaId(Number(e.target.value))}
            >

                <option value={0}>
                    Selecione
                </option>

                {
                    pessoas.map(p => (
                        <option
                            key={p.id}
                            value={p.id}
                        >
                            {p.nome}
                        </option>
                    ))
                }

            </select>

            <button onClick={salvar}>
                Salvar
            </button>

            <hr />

            {
                transacoes.map(t => (

                    <div key={t.id}>

                        {t.descricao} -
                        R$ {t.valor} -
                        {t.tipo}

                    </div>

                ))
            }

        </div>

    );

}