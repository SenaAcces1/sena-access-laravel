import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
                    <p className="small text-light opacity-75 mt-3">Por favor, llene correctamente los siguientes datos</p>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
                        <Link to="/" className="btn btn-glow w-100 text-center text-decoration-none text-white d-flex align-items-center justify-content-center">VOLVER AL LOGIN</Link>
                    </div>
                </form>
            </div>

            <footer className="mt-auto py-3 text-center w-100 footer-text">
                <p className="mb-0 fw-bold">_SenaAccess_</p>
                <p className="mb-0 small opacity-75">© 2026 SENA & SCS. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Register;
