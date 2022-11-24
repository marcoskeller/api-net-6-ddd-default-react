import '../../App.css';
import { Link, useNavigate, useParams } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import api from '../../services/api';

export const Deleta = () => {

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

        //Confirmação de exclusão
        var resultado = window.confirm("Deseja excluir o item:\n " + titulo);
        
        if (resultado == true) {
            await api.post("/Delete", data);
            alert("Mensagem Apagada com Sucesso!");
            setTitulo("");
            navigate('/');  
        }
        else{
            alert("Você desistiu de excluir o item: \n" + titulo);
            setTitulo("");
            navigate('/');
        }     
    };

    return (
        <div className='container' >

            <h1 className='titulo'>Deletar</h1>

            <form onSubmit={handleSubmit}>
                
                <input className='input-text' type="text" value={titulo}
                    onChange={(e) => setTitulo(e.target.value)} />

                <button className='btn-criar' type='submit'>Deletar Mensagem</button>

            </form>

            <div>       
                <Link className='btn-voltar-link' to="/">Voltar</Link>
            </div>  

        </div>

    );
}