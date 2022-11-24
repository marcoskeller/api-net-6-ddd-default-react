import '../../App.css';
import { Link, useNavigate, useParams } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import api from '../../services/api';

export const Edicao = () => {

    let navigate = useNavigate();

    const [titulo, setTitulo] = useState("");

    //Variavel para guardar o objeto que é retornado do banco
    const [mensagem, setMensagem] = useState({});

    //Obtendo o id que é passado na busca do item
    const { id } = useParams();

    //Reutilização do Método de Listagem de Mensagens
    useEffect(() => {

        const param = {
            "id": id,
            "titulo" : titulo,
            "ativo" : true,
            "dataCadastro" : "2022-10-31T01:30:24.5802301",
            "dataAlteracao" : "2022-10-31T01:30:24.5802301",
            "userId" : "0598d69f-05c7-490d-93e5-99dba4989574"
        };

        api.post('GetEntityById', param).then(({ data }) => {
            setMensagem(data);
            setTitulo(data.titulo);
        })
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            "id": id,
            "titulo": titulo,
            "ativo": mensagem.ativo,
            "dataCadastro": mensagem.dataCadastro,
            "dataAlteracao": mensagem.dataAlteracao,
            "userId": mensagem.userId
        };

        await api.post("/Update", data);
        alert("Alterado com sucesso!");
        setTitulo("");
        navigate('/');

    };

    return (
        <div className='container' >
            <h1 className='titulo'>Edição</h1>

            <form onSubmit={handleSubmit}>
                <input className='input-text' type="text" value={titulo}
                    onChange={(e) => setTitulo(e.target.value)} />

                <button className='btn-criar' type='submit'>
                    Salvar Edição
                </button>

                {/* <Link className='btn-voltar-link' to="/">Voltar</Link> */}

            </form>

            <div>       
                <Link className='btn-voltar-link' to="/">Voltar</Link>
            </div>  

        </div>

    );
}