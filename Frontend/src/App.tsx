import Pessoas from "./components/Pessoas";
import "./App.css";
import Transacoes from "./components/Transacoes";


function App() {

  return (
    <div className="container">

      <h1>
        Controle de Gastos
      </h1>

      <Pessoas />

      <Transacoes />

    </div>
  )
}


export default App;