import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Lista } from '../pages/Lista';
import { Cadastro } from '../pages/Cadastro';
import { Edicao } from '../pages/Edicao';
import { Deleta } from "../pages/Deleta";


export const AppRouter = () =>
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <Lista/> } />
                <Route path="/Cadastro" element={ <Cadastro/> } />
                <Route path="/edicao/:id" element={<Edicao />} />
                <Route path="/deleta/:id" element={<Deleta />} />
                <Route />
            </Routes>
        </Router>
    );
}