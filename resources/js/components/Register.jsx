import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        user_lastname: '',
        user_email: '',
        user_password: '',
        user_password_confirmation: '',
        user_coursenumber: '',
        user_program: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await axios.post('/api/register', formData);
            alert(response.data.message);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
                alert('Error en el registro. Verifique los campos.');
            } else {
                alert('Error al conectar con el servidor.');
            }
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4 fade-in-up">
            <div className="glass-box register-box p-4 p-md-5 mx-3">
                <div className="text-center mb-4">
                    <img src="https://www.sena.edu.co/Style%20Library/alayout/images/logoSena.png?rev=40" className="logosena mb-3" alt="Logo SENA" />
                    <h2 className="fw-bold mb-0">SenaAccess</h2>
                    <h5 className="fw-light text-success">Registro de Usuario</h5>
                    <hr className="border-success opacity-25" />
                    <p className="small theme-text opacity-75 mt-3">Por favor, llene correctamente los siguientes datos</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 user-box">
                            <input type="text" name="user_name" required placeholder=" " value={formData.user_name} onChange={handleChange} />
                            <label>Nombres</label>
                            {errors.user_name && <small className="text-danger">{errors.user_name[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="text" name="user_lastname" required placeholder=" " value={formData.user_lastname} onChange={handleChange} />
                            <label>Apellidos</label>
                            {errors.user_lastname && <small className="text-danger">{errors.user_lastname[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="email" name="user_email" required placeholder=" " value={formData.user_email} onChange={handleChange} />
                            <label>Correo electrónico</label>
                            {errors.user_email && <small className="text-danger">{errors.user_email[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="number" name="user_coursenumber" required placeholder=" " value={formData.user_coursenumber} onChange={handleChange} />
                            <label>Número de ficha</label>
                            {errors.user_coursenumber && <small className="text-danger">{errors.user_coursenumber[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="text" name="user_program" required placeholder=" " value={formData.user_program} onChange={handleChange} />
                            <label>Programa de formación</label>
                            {errors.user_program && <small className="text-danger">{errors.user_program[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="user_password" 
                                required 
                                placeholder=" " 
                                value={formData.user_password} 
                                onChange={handleChange} 
                            />
                            <label>Crear contraseña</label>
                            <button 
                                type="button" 
                                className="password-toggle" 
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Ocultar" : "Mostrar"}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                        <line x1="12" y1="5" x2="12" y2="2" />
                                        <line x1="5" y1="8" x2="3" y2="5" />
                                        <line x1="19" y1="8" x2="21" y2="5" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 10c4 6 16 6 20 0" />
                                        <line x1="12" y1="15" x2="12" y2="18" />
                                        <line x1="7" y1="14" x2="5" y2="17" />
                                        <line x1="17" y1="14" x2="19" y2="17" />
                                    </svg>
                                )}
                            </button>
                            {errors.user_password && <small className="text-danger">{errors.user_password[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="user_password_confirmation" 
                                required 
                                placeholder=" " 
                                value={formData.user_password_confirmation} 
                                onChange={handleChange} 
                            />
                            <label>Confirmar contraseña</label>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                        <button className="btn btn-glow btn-primary-login w-100 fw-bold py-3" type="submit">REGISTRARSE</button>
                        <Link to="/" className="btn btn-glow w-100 text-center text-decoration-none d-flex align-items-center justify-content-center">VOLVER AL LOGIN</Link>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
