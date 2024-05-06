import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  //Variabili di stato
  const [start, setStart] = useState(true);
  const [id, setId] = useState();
  const [tentativi, setTentativi] = useState();
  const [richiestaPut, setRichiestaPut] = useState(false);
  const [risultato, setRisultato] = useState();

  //Variabili di stato per form
  const [numeroInserito, setNumeroInserito] = useState("");

  //Funzione per generare il numero casuale
  async function richiediNumero() {
    setStart(true);
    const response = await fetch(`http://localhost:8080/partita`, {
      method: "POST",
    });
    const data = await response.json();
    setId(data.id);
    setTentativi(data.tentativi);
    setStart(false);
  }

  //Funzione per inviare il numero inserito
  async function inviaNumero(){
    const response = await fetch(`http://localhost:8080/partita/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ numero: numeroInserito })
    });
    const value_response = await response.json();
    setTentativi(value_response.tentativi);
    setRisultato(value_response.risultato);
    setRichiestaPut(true);
  }

  function gestisciCambioNumero(e) {
    setNumeroInserito(e.target.value)
  }

  //Funzione per ripristinare la pagina
  function ripristinaPagina(){
    setStart(true);
    setRichiestaPut(false);
    setRisultato("");
    setNumeroInserito("");
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
            <h3>Indovina numero</h3>
            <br />
            <button onClick={ripristinaPagina}>Nuova partita</button>
            <br />
            <p>ID:{id}</p>
            <p>Tentativi:{tentativi}</p>
            <br />
            {
              risultato !== 0 &&
              (
                <>
                <p>Inserisci un numero tra 1 e 100</p>
                <input type='number' onChange={gestisciCambioNumero} value={numeroInserito} min={1} max={100} placeholder="Inserisci il numero"/>
                {" "}
                <button onClick={inviaNumero}>Invia</button>
                </>
              )
            }
            {
              richiestaPut &&
                <div>
                  { risultato === 1 &&
                    <h3><b>TROPPO ALTO</b></h3>
                  }
                  { risultato === -1 &&
                    <h3><b>TROPPO BASSO</b></h3>
                  }
                  { risultato === 0 &&
                    <h3><b>HAI VINTO</b></h3>
                  }
                </div>
            }
          </>
        )
      }
    </div>
  );
}

export default App;