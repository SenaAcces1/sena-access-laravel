import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 fade-in-up">
            <div className="glass-box p-4 p-md-5 mx-3">
                <div className="text-center mb-4">
                    <img src="https://www.sena.edu.co/Style%20Library/alayout/images/logoSena.png?rev=40" className="logosena mb-3" alt="Logo SENA" />
                    <h2 className="fw-bold mb-0">SENA</h2>
                    <h5 className="fw-light text-success">Acceso CCyS</h5>
                    <hr className="border-success opacity-25" />
                    <h4 className="mt-3 fw-bold">Iniciar Sesión</h4>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input 
                            type="email" 
                            name="user_email" 
                            required 
                            placeholder=" "
                            value={user_email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Correo electrónico</label>
                    </div>
                    <div className="user-box">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="user_password" 
                            required 
                            placeholder=" "
                            value={user_password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Contraseña</label>
                        <button 
                            type="button" 
                            className="password-toggle" 
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
                    </div>

                    <div className="d-grid gap-3 mb-4">
                        <button className="btn btn-glow btn-primary-login w-100 fw-bold py-3" type="submit">
                            INGRESAR
                        </button>
                        
                        <div className="position-relative text-center my-2">
                            <hr className="border-secondary opacity-25" />
                            <span className="position-absolute top-50 start-50 translate-middle bg-dark px-3 text-light small opacity-50">O</span>
                        </div>

                        <Link to="/loading" className="btn btn-glow w-100 fw-bold" style={{textDecoration: 'none', color: 'inherit'}}>
                            INVITADO
                        </Link>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="mb-2 text-light opacity-75 small">¿No estás registrado? <Link to="/register" className="custom-link fw-bold text-success">¡Regístrate aquí!</Link></p>
                    <p className="mb-4 text-light opacity-75 small">¿Olvidaste tu contraseña? <Link to="/password-recovery" className="custom-link fw-bold text-success">Recuperar</Link></p>
                    
                    <div className="d-grid gap-2">
                        <Link to="/fingerprint" className="btn btn-glow w-100 d-flex align-items-center justify-content-center gap-2" style={{textDecoration: 'none', color: 'inherit'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.06 1.141c-.604-.047-1.182.165-1.579.596-.341.37-.506.877-.456 1.393.04.402.164.773.354 1.103a.5.5 0 0 0 .86-.512 2.21 2.21 0 0 1-.225-.718c-.027-.282.062-.53.223-.703.2-.215.534-.336.963-.303.433.033.74.22.915.485.176.265.22.613.118 1.008a.5.5 0 1 0 .964.246c.15-.573.107-1.178-.222-1.673-.327-.492-.893-.883-1.693-.925M9.4 4a.5.5 0 0 0-.5.5c0 .341-.123.633-.338.848-.215.215-.507.338-.848.338a.5.5 0 0 0 0 1c.614 0 1.14-.22 1.554-.633.414-.415.633-.941.633-1.554A.5.5 0 0 0 9.4 4m-4.5 3a.5.5 0 0 0-.5.5c0 .614.22 1.14.633 1.554.415.414.941.633 1.554.633a.5.5 0 0 0 0-1c-.341 0-.633-.123-.848-.338-.215-.215-.338-.507-.338-.848A.5.5 0 0 0 4.9 7"/>
                                <path d="M12.986 8.583a1.5 1.5 0 0 0-.64-1.114 1.5 1.5 0 0 0-1.84.148 1.5 1.5 0 0 0-2.227.135 1.5 1.5 0 0 0-2.427.014 1.5 1.5 0 0 0-2.348.618c-.14.398-.242.827-.305 1.258a6.042 6.042 0 0 0-.022.428v.001c-.001.21.001.405.008.573.012.274.032.483.072.646.037.15.112.308.243.435.132.128.312.196.536.196s.404-.068.536-.196c.13-.127.206-.285.243-.435a3.3 3.3 0 0 0 .072-.646c.007-.168.009-.362.008-.573a5.037 5.037 0 0 1 .018-.356c.05-.347.13-.69.243-1.012a.5.5 0 0 1 .89.366c-.1.272-.17.564-.213.844l-.001.009c-.012.083-.02.176-.026.277h.01c-.01.192-.012.395-.008.62.008.43.033.882.126 1.256.096.388.307.784.733 1.077.427.292.937.387 1.45.334a4.114 4.114 0 0 0 2.222-1.01l.006-.006c.414-.41.744-.92 1.002-1.472l.004-.009c.253-.54.437-1.127.56-1.708l.003-.016c.125-.595.18-1.181.185-1.742a.5.5 0 1 1 1 0c-.005.626-.067 1.282-.204 1.933-.143.68-.355 1.36-.65 1.99a7.062 7.062 0 0 1-1.22 1.79l-.004.004a5.115 5.115 0 0 1-2.756 1.254 2.5 2.5 0 0 1-1.3-.14c-.655-.26-1.164-.72-1.505-1.265-.343-.55-.494-1.206-.575-1.85a10.456 10.456 0 0 1-.012-1.22l.001-.005a30.2 30.2 0 0 1 .054-1.116 10.151 10.151 0 0 1 .184-1.161.5.5 0 0 1 .91.319c-.066.302-.123.61-.171.92a29.176 29.176 0 0 0-.053 1.085l-.001.014c-.004.223-.002.457.009.704.01.248.026.495.056.732a1.5 1.5 0 0 0 2.454.76l.005-.005c.343-.341.608-.767.813-1.206l.005-.01c.204-.436.35-.91.446-1.38l.004-.017c.101-.482.146-.95.15-1.394a.5.5 0 0 1 1 0c-.005.503-.056 1.03-.17 1.564-.117.546-.296 1.11-.54 1.63-.223.476-.51.942-.888 1.32l-.004.004a3.116 3.116 0 0 1-1.681.875 2.115 2.115 0 0 1-.611.012c.504.621 1.218 1.032 2.128 1.026 1.132-.008 2.05-.625 2.623-1.424l.006-.009c.535-.745.823-1.616.924-2.484l.004-.03c.1-.861.103-1.693.078-2.434a.5.5 0 0 1 1 0c.026.792.022 1.688-.087 2.624l-.004.034c-.113.978-.435 1.97-.1 2.8a5.132 5.132 0 0 0 1.574 1.52c.883.565 2.003.73 2.924.32a.5.5 0 0 1 .414.91c-1.22.553-2.695.34-3.818-.38a6.132 6.132 0 0 1-1.88-1.815c-.218-.331-.387-.69-.508-1.07l-.006-.017a11.536 11.536 0 0 1-.16-1.516l-.002-.02c-.015-.59-.009-1.157.01-1.67a.5.5 0 0 1 1 0c-.02.48-.025 1.013-.01 1.567l.002.022c.012.446.04.9.083 1.343a1.5 1.5 0 0 0 1.258 1.343c.712.11 1.436-.013 2.016-.36.527-.315.932-.782 1.21-1.314l.006-.011c.27-.518.441-1.114.503-1.722l.002-.022c.06-.596.058-1.205.003-1.802a.5.5 0 0 1 1 0c.061.64.064 1.3.003 1.942l-.002.025c-.069.67-.257 1.332-.555 1.902a4.155 4.155 0 0 1-1.624 1.832 3.5 3.5 0 0 1-1.923.497 3.5 3.5 0 0 1-2.148-.737 6.132 6.132 0 0 1-1.88-1.815.5.5 0 1 1 .83-.556c.15.227.317.443.5.644a1.5 1.5 0 0 0 2.508-1.096l-.001-.017c-.012-.416-.017-.834-.015-1.251l.001-.027c.01-.54.048-1.08.114-1.611a.5.5 0 0 1 1 .123 10.385 10.385 0 0 0-.106 1.498l-.001.025c-.002.4.003.799.014 1.196a.5.5 0 1 1-1 0c-.012-.39-.016-.78-.014-1.17l.001-.022c.011-.476.046-.952.105-1.424a1.5 1.5 0 0 0-1.821-1.642 1.5 1.5 0 0 0-1.179 1.46c-.01.312-.012.636-.006.964l.001.033c.01.52.046 1.04.108 1.554a.5.5 0 1 1-1 .12c-.065-.544-.102-1.094-.112-1.646l-.001-.03c-.006-.35-.004-.7.007-1.044a.5.5 0 1 1 1 0c-.01.32-.012.645-.006.973l.001.03c.01.536.048 1.07.111 1.6l.003.023a1.5 1.5 0 0 0 2.964-.17 1.5 1.5 0 0 0-.964-1.46c-.224-.085-.46-.134-.7-.147a.5.5 0 0 1 .473-.997c.346.019.684.09 1 .21l.012.005c.573.235.952.793.975 1.41a.5.5 0 0 1-1 0c-.015-.4-.26-.76-.63-.912l-.009-.004a.5.5 0 1 1 .386-.922c.767.321 1.25 1.07 1.253 1.905a.5.5 0 0 1-1 0c-.002-.55-.325-1.05-.831-1.258a.5.5 0 0 1 .386-.922c1.01.416 1.645 1.397 1.65 2.49a.5.5 0 0 1-1 0c-.004-.725-.424-1.383-1.088-1.655a.5.5 0 1 1 .386-.922M1.5 7a.5.5 0 0 1 .5.5c0 .341.123.633.338.848.215.215.507.338.848.338a.5.5 0 0 1 0 1c-.614 0-1.14-.22-1.554-.633-.414-.415-.633-.941-.633-1.554A.5.5 0 0 1 1.5 7"/>
                            </svg>
                            HUELLA
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="mt-auto py-3 text-center w-100 footer-text">
                <p className="mb-0 fw-bold">_SenaAccess_</p>
                <p className="mb-0 small opacity-75">© 2026 SENA & SCS. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Login;
