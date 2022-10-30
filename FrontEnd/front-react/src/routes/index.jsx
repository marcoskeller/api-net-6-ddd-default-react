import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Lista } from '../pages/Lista';
import { Cadastro } from '../pages/Cadastro'


export const AppRouter = () =>
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <Lista/> } />
                <Route path="/Cadastro" element={ <Cadastro/> } />
                <Route />
            </Routes>
        </Router>
    );
}