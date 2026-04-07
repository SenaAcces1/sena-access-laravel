import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                user_email,
                user_password
            });
            
            // Store token and user data
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('user_role', response.data.role);
            
            alert(response.data.message);
            // Handle role-based navigation or storing tokens
            if (response.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/loading');
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || 'Error en el inicio de sesión');
            } else {
                alert('Error al conectar con el servidor.');
            }
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="glass-box p-4 p-md-5 mx-3 mt-4">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">SENA</h2>
                    <h4 className="mb-3">Bienvenido al CCyS</h4>
                    <img src="https://www.sena.edu.co/Style%20Library/alayout/images/logoSena.png?rev=40" className="logosena mb-3" alt="Logo SENA" />
                    <h5 className="fw-light">Iniciar Sesión</h5>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input 
                            type="email" 
                            name="user_email" 
                            required 
                            value={user_email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Correo electrónico</label>
                    </div>
                    <div className="user-box">
                        <input 
                            type="password" 
                            name="user_password" 
                            required 
                            value={user_password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Contraseña</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-glow w-100 fw-bold" type="submit">Ingresar</button>
                        <br></br>
                        <button className="btn btn-glow w-100" type="button">
                            <Link to="/loading" className="custom-link fw-bold" style={{textDecoration: 'none', color: 'inherit'}}>INVITADO</Link>
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="mb-1 text-light">¿No estás registrado? <Link to="/register" className="custom-link fw-bold">¡Regístrate aquí!</Link></p>
                    <p className="mb-3 text-light">¿Olvidaste tu contraseña? <Link to="/password-recovery" className="custom-link fw-bold">Recuperar Contraseña</Link></p>
                    <p className="mb-2 text-light">Otros métodos de inicio de sesión:</p>
                    <div className="d-grid gap-2">
                        <button className="btn btn-glow w-100" type="button">
                            <Link to="/fingerprint" className="custom-link fw-bold" style={{textDecoration: 'none', color: 'inherit'}}>HUELLA</Link>
                        </button>
                    </div>
                </div>
            </div>

            <footer className="mt-auto py-3 text-center w-100 footer-text">
                <p className="mb-0 fw-bold">_SenaAccess_</p>
                <p className="mb-0">© 2026 SENA & SCS. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Login;
