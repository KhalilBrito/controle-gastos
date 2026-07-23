import { useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import Pessoas from "./components/Pessoas";
import Transacoes from "./components/Transacoes";

function App() {

    const [refresh, setRefresh] = useState(0);

    function atualizarTudo() {
        setRefresh(valor => valor + 1);
    }

    return (
        <div className="container">

            <h1>Controle de Gastos</h1>

            <Dashboard refresh={refresh} />

            <Pessoas atualizar={atualizarTudo} refresh={refresh} />

            <Transacoes atualizar={atualizarTudo} refresh={refresh} />

        </div>
    );
}

export default App;