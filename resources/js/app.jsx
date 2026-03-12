import './bootstrap';
import '../css/app.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import PasswordRecovery from './components/PasswordRecovery';
import Fingerprint from './components/Fingerprint';
import Loading from './components/Loading';
import Admin from './components/Admin';

console.log("Iniciando aplicación React...");

const App = () => {
    console.log("Renderizando componente App...");
    return (
        <BrowserRouter>
            <div style={{color: 'white', position: 'fixed', bottom: 10, right: 10, background: 'rgba(0,0,0,0.5)', padding: '5px', zIndex: 9999}}>
                React Router Activo
            </div>
            <Suspense fallback={<div className="text-white text-center mt-5">Cargando componentes...</div>}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/password-recovery" element={<PasswordRecovery />} />
                    <Route path="/fingerprint" element={<Fingerprint />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<div className="text-white">404 - Página no encontrada</div>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

const rootElement = document.getElementById('app');
if (rootElement) {
    console.log("Elemento #app encontrado. Montando...");
    try {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
        console.log("Montado ejecutado sin errores inmediatos.");
    } catch (err) {
        console.error("Error durante el renderizado:", err);
    }
} else {
    console.error("¡No se encontró el elemento #app en el DOM!");
}
