import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  //Variabili di stato
  const [start, setStart] = useState(true);
  const [id, setId] = useState();
  const [numeroIndovinare, setNumeroIndovinare] = useState();
  const [tentativi, setTentativi] = useState();
  const [richiestaPut, setRichiestaPut] = useState(false);

  //Variabili di stato per form
  const [numeroInserito, setNumeroInserito] = useState();

  async function richiediNumero() {
    setStart(true);
    const response = await fetch(`http://localhost:8080/partita`, {
      method: "POST",
    });
    const data = await response.json();
    setId(data.id);
    setNumeroIndovinare(data.numero);
    setTentativi(data.tentativi);
    setStart(false);
  }

  function gestisciCambioNumero(e) {
    setNumeroInserito(e.target.value)
  }

  async function inviaNumero(){
    const response = await fetch(`http://localhost:8080/partita/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ numero: numeroInserito })
    });
    const value_response = await response.
    setRichiestaPut(true);
  }


  return (
    <div className="App">
      {
        start ?
        (
          <>
            <h3>Inizia una nuova partita</h3>
            <br />
            <button onClick={richiediNumero}>Inizia</button>
          </>
        )
        :
        (
          <>
            {
              !richiestaPut ?
              (
                <>
                  <h3>Indovina numero</h3>
                  <br />
                  <button onClick={() => setStart(true)}>Nuova partita</button>
                  <br />
                  <p>ID:{id}</p>
                  <p>Tentativi:{tentativi}</p>
                  <br />
                  <p>Inserisci un numero tra 1 e 100</p>
                  <input type='number' onChange={gestisciCambioNumero} value={numeroInserito} min={1}/>
                  <button onClick={inviaNumero}>Invia</button>
                </>
              )
              :
              (
                <>

                </>
              )
            }
          </>
        )
      }
    </div>
  );
}

export default App;
