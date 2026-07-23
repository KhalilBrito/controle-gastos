import { useEffect, useState } from "react";
import type { Pessoa } from "../types/Pessoa";
import { criarPessoa, excluirPessoa, listarPessoas } from "../services/pessoaService";

interface PessoasProps {
    refresh: number;
    atualizar: () => void;
}

export default function Pessoas({ refresh, atualizar }: PessoasProps) {

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState(0);

    async function carregarPessoas() {
        const dados = await listarPessoas();
        setPessoas(dados);
    }

    async function salvarPessoa() {

        await criarPessoa({
            nome,
            idade
        });

        setNome("");
        setIdade(0);

        await carregarPessoas();

        atualizar();
    }

    async function removerPessoa(id: number) {

        await excluirPessoa(id);

        await carregarPessoas();

        atualizar();
    }

    useEffect(() => {
        carregarPessoas();
    }, [refresh]);

    return (
        <div className="card">

            <h2>Pessoas</h2>

            <input
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />

            <input
                type="number"
                placeholder="Idade"
                value={idade}
                onChange={e => setIdade(Number(e.target.value))}
            />

            <button onClick={salvarPessoa}>
                Cadastrar
            </button>

            <hr />

            {pessoas.map(pessoa => (

                <div key={pessoa.id} className="lista-item">

                    {pessoa.nome} - {pessoa.idade} anos

                    <button onClick={() => removerPessoa(pessoa.id)}>
                        Excluir
                    </button>

                </div>

            ))}

        </div>
    );
}