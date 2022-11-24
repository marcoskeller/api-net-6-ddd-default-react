import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export const Cadastro = () => 
{
    
    let navigate = useNavigate();

    const [titulo, setTitulo] = useState([]);


    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const data = 
        {
            "titulo" : titulo,
            "ativo" : true,
            "dataCadastro" : "2022-10-31T01:30:24.5802301",
            "dataAlteracao" : "2022-10-31T01:30:24.5802301",
            "userId" : "0598d69f-05c7-490d-93e5-99dba4989574"
        };

        await api.post("/Add", data);
        alert("Mensagem cadastrada com sucesso!");
        setTitulo("");
        navigate('/');
    };



    return(
        <body>
                <div className='container'>
                    <h1 className='titulo'>Cadastro</h1>
                
                    <form onSubmit={handleSubmit}>
                        <input className='input-text' type="text" value={titulo}  
                        onChange={(e) => setTitulo(e.target.value)}/>
                        
                        <div>
                            <button className='btn-criar' type='submit'>Enviar</button>                            
                        </div>  
                                            
                    </form>  
                
                    {/* <Link className='btn-voltar-link' to="/">Voltar</Link> */}
                    
                    <div>
                        {/* <a href="http://localhost:3000/">
                            <button className='btn-voltar'>Voltar</button>
                        </a> */}
                        <Link className='btn-voltar-link' to="/">Voltar</Link>
                    </div>  
                    
                      
                            
                </div>  
        </body>      
    ); 
}

