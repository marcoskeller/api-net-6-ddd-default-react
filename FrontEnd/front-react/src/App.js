import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import api from './services/api';

export default function App()
{
    const [mensagens, setMensagem] = useState([]);

    useEffect( () => {
      api.post('List').then(({data}) => {
          setMensagem(data);
      })
    })

    return (
      <div className='App'>
       <header className='App-header'>
          {mensagens.map(
            iten => (
              <div key={iten.id}>
                {iten.id} - {iten.titulo}
              </div>
            )            
          )}
       </header>
      </div>
    );
}
