import React, { useState } from 'react';
import Header from "./Header";

function App() {

  //let counter = useState(0);  //retorna um array com 2 posicoes, Array[valor, funcao]
  const [counter, setCounter] = useState(0);

  function increment(){
    setCounter(counter + 1);
  }

  return (
    <div>
      <Header>Contador: {counter}</Header>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}

export default App;
