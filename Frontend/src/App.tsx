import Pessoas from "./components/Pessoas";
import "./App.css";
import Transacoes from "./components/Transacoes";
import Dashboard from "./components/Dashboard";


function App() {

  return (
    <div className="container">

      <h1>
        Controle de Gastos
      </h1>

      <Dashboard />

      <Pessoas />

      <Transacoes />

    </div>
  )
}


export default App;