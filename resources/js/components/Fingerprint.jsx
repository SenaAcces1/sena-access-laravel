import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Fingerprint = () => {
    const [leftCaptured, setLeftCaptured] = useState(false);
    const [rightCaptured, setRightCaptured] = useState(false);
    const [scanningLeft, setScanningLeft] = useState(false);
    const [scanningRight, setScanningRight] = useState(false);

    // Add keyframes for spin animation
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .spin {
                animation: spin 1s linear infinite;
                display: inline-block;
                vertical-align: middle;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleScan = (hand) => {
        if (hand === 'left') {
            setScanningLeft(true);
            setTimeout(() => {
                setScanningLeft(false);
                setLeftCaptured(true);
            }, 2000);
        } else {
            setScanningRight(true);
            setTimeout(() => {
                setScanningRight(false);
                setRightCaptured(true);
            }, 2000);
        }
    };

    const allCaptured = leftCaptured && rightCaptured;

    return (
        <div className="container">
            <h2>Ingreso con huella digital</h2>
            <p>Por favor, coloque el dedo en el escáner.</p>

            <div className="fingerprint-section">
                
                <div className={`hand-card ${leftCaptured ? 'captured' : ''}`} id="left-hand">
                    <span className={`material-symbols-outlined icon-huella ${leftCaptured ? 'text-success' : ''}`}>fingerprint</span>
                    <h3>Indice Izquierdo</h3>
                    <button 
                        className="btn-registrar" 
                        onClick={() => handleScan('left')}
                        disabled={scanningLeft || leftCaptured}
                    >
                        {scanningLeft ? (
                            <><span className="material-symbols-outlined spin">sync</span> Escaneando...</>
                        ) : leftCaptured ? (
                            <><span className="material-symbols-outlined">check_circle</span> Completado</>
                        ) : (
                            <><span className="material-symbols-outlined">sensors</span> Escanear Izquierda</>
                        )}
                    </button>
                    <div className="status-badge" style={{ backgroundColor: leftCaptured ? '#16a34a' : '' }}>
                        {scanningLeft ? 'Escaneando huella...' : leftCaptured ? 'Huella verificada con éxito' : 'Listo para capturar'}
                    </div>
                </div>

                <div className={`hand-card active ${rightCaptured ? 'captured' : ''}`} id="right-hand">
                    <span className={`material-symbols-outlined icon-huella ${rightCaptured ? 'text-success' : ''}`}>fingerprint</span>
                    <h3>Indice Derecho</h3>
                    <button 
                        className="btn-registrar" 
                        onClick={() => handleScan('right')}
                        disabled={scanningRight || rightCaptured}
                    >
                        {scanningRight ? (
                            <><span className="material-symbols-outlined spin">sync</span> Escaneando...</>
                        ) : rightCaptured ? (
                            <><span className="material-symbols-outlined">check_circle</span> Completado</>
                        ) : (
                            <><span className="material-symbols-outlined">sensors</span> Escanear Derecha</>
                        )}
                    </button>
                    <div className="status-badge" style={{ backgroundColor: rightCaptured ? '#16a34a' : '' }}>
                        {scanningRight ? 'Escaneando huella...' : rightCaptured ? 'Huella Verificada con éxito' : 'Listo para capturar'}
                    </div>
                </div>

            </div>
            <br />
            <button className={`btn btn-glow w-100 ${allCaptured ? 'btn-success' : ''}`} type="button">
                <Link to="/loading" className="custom-link fw-bold" style={{textDecoration: 'none', color: 'inherit'}}>
                    {allCaptured ? 'CONTINUAR' : 'INGRESA AMBAS HUELLAS PARA CONTINUAR'}
                </Link>
            </button>
        </div>
    );
};

export default Fingerprint;
