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
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4">
            <div className="glass-box register-box p-4 p-md-5 mx-3">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">SENA ACCESS</h2>
                    <h4 className="mb-3">Registro</h4>
                    <img src="https://www.sena.edu.co/Style%20Library/alayout/images/logoSena.png?rev=40" className="logosena mb-3" alt="Logo SENA" />
                    <h5 className="fw-light">Por favor, llene correctamente los siguientes datos</h5>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 user-box">
                            <input type="text" name="user_name" required value={formData.user_name} onChange={handleChange} />
                            <label>Nombres</label>
                            {errors.user_name && <small className="text-danger">{errors.user_name[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="text" name="user_lastname" required value={formData.user_lastname} onChange={handleChange} />
                            <label>Apellidos</label>
                            {errors.user_lastname && <small className="text-danger">{errors.user_lastname[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="email" name="user_email" required value={formData.user_email} onChange={handleChange} />
                            <label>Correo electrónico</label>
                            {errors.user_email && <small className="text-danger">{errors.user_email[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="number" name="user_coursenumber" required value={formData.user_coursenumber} onChange={handleChange} />
                            <label>Número de ficha</label>
                            {errors.user_coursenumber && <small className="text-danger">{errors.user_coursenumber[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="text" name="user_program" required value={formData.user_program} onChange={handleChange} />
                            <label>Programa de formación</label>
                            {errors.user_program && <small className="text-danger">{errors.user_program[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="password" name="user_password" required value={formData.user_password} onChange={handleChange} />
                            <label>Crear contraseña</label>
                            {errors.user_password && <small className="text-danger">{errors.user_password[0]}</small>}
                        </div>
                        <div className="col-md-6 user-box">
                            <input type="password" name="user_password_confirmation" required value={formData.user_password_confirmation} onChange={handleChange} />
                            <label>Confirmar contraseña</label>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                        <button className="btn btn-glow w-100 fw-bold" type="submit">Registrarse</button>
                        <Link to="/" className="btn btn-glow w-100 text-center text-decoration-none text-white">Iniciar Sesión</Link>
                    </div>
                </form>
            </div>

            <footer className="mt-auto py-3 text-center w-100 footer-text">
                <p className="mb-0 fw-bold">_SenaAccess_</p>
                <p className="mb-0">© 2026 SENA & SCS. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Register;
