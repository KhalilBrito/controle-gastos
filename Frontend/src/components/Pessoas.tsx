import { useEffect, useState } from "react";
import type { Pessoa } from "../types/Pessoa";
import { criarPessoa, excluirPessoa, listarPessoas } from "../services/pessoaService";


export default function Pessoas() {

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
    }


    async function removerPessoa(id:number){

        await excluirPessoa(id);

        carregarPessoas();
    }


    useEffect(() => {
        carregarPessoas();
    }, []);



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


            <hr/>


            {
                pessoas.map(pessoa => (

                    <div key={pessoa.id}>

                        {pessoa.nome} - {pessoa.idade} anos

                        <button onClick={() => removerPessoa(pessoa.id)}>
                            Excluir
                        </button>

                    </div>

                ))
            }


        </div>
    );
}