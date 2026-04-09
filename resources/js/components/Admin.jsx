import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

const Admin = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [ingresos, setIngresos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTermUsers, setSearchTermUsers] = useState('');
    const [searchTermIngresos, setSearchTermIngresos] = useState('');
    const [formData, setFormData] = useState({
        user_identification: '',
        user_name: '',
        user_lastname: '',
        user_email: '',
        user_password: '',
        user_coursenumber: '',
        user_program: '',
        fk_id_rol: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, rolesResponse, ingresosResponse] = await Promise.all([
                    axios.get('/api/admin/users'),
                    axios.get('/api/admin/roles'),
                    axios.get('/api/admin/ingresos')
                ]);
                setUsers(usersResponse.data);
                setRoles(rolesResponse.data);
                setIngresos(ingresosResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filtering logic
    const filteredUsers = users.filter(user => {
        const search = searchTermUsers.toLowerCase();
        return (
            (user.user_identification?.toLowerCase() || '').includes(search) ||
            user.user_name.toLowerCase().includes(search) ||
            user.user_lastname.toLowerCase().includes(search) ||
            user.user_email.toLowerCase().includes(search) ||
            user.user_coursenumber.toString().includes(search) ||
            user.role?.rol_name.toLowerCase().includes(search)
        );
    });

    const filteredIngresos = ingresos.filter(ingreso => {
        const search = searchTermIngresos.toLowerCase();
        const userName = `${ingreso.user?.user_name} ${ingreso.user?.user_lastname}`.toLowerCase();
        return (
            userName.includes(search) ||
            ingreso.user?.user_email.toLowerCase().includes(search) ||
            ingreso.ingreso_place.toLowerCase().includes(search) ||
            new Date(ingreso.ingreso_datetime).toLocaleString().toLowerCase().includes(search)
        );
    });

    const handleLogout = async () => { // Logica para el log-out asincronica 
        try {
            await axios.post('/api/logout');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_role');
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión', error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_role');
            navigate('/');
        }
    };

    // funcion flecha para manejar la funcion de edicion de usuario
    const handleEditClick = (user) => {
        setEditingUser(user.id_usuario);
        setFormData({
            user_identification: user.user_identification || '',
            user_name: user.user_name,
            user_lastname: user.user_lastname,
            user_email: user.user_email,
            //Password vacio para no mostrarlo, se actualiza solo si se ingresa uno nuevo
            user_password: '', 
            user_coursenumber: user.user_coursenumber,
            user_program: user.user_program,
            fk_id_rol: user.fk_id_rol
        });
    };
    // funcion flecha para manejar la cancelacion de edicion de usuario
    const handleCancelEdit = () => {
        setEditingUser(null);
        setFormData({
            user_identification: '',
            user_name: '',
            user_lastname: '',
            user_email: '',
            user_password: '',
            user_coursenumber: '',
            user_program: '',
            fk_id_rol: ''
        });
    };
    // funcion flecha para manejar los cambios en el formulario de edicion de usuario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/admin/users/${editingUser}`, formData);
            setUsers(users.map(u => u.id_usuario === editingUser ? response.data : u));
            alert('Usuario actualizado con éxito');
            handleCancelEdit();
        } catch (error) {
            alert('Error al actualizar usuario: ' + (error.response?.data?.message || 'Error desconocido'));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                await axios.delete(`/api/admin/users/${id}`);
                setUsers(users.filter(u => u.id_usuario !== id));
                alert('Usuario eliminado');
            } catch (error) {
                alert('Error al eliminar usuario');
            }
        }
    };

    if (loading) return <div className="text-white text-center mt-5">Cargando...</div>;

    return (
        <div className="d-flex flex-column align-items-center min-vh-100">
            <div className="container mt-5 text-white fade-in-up my-auto py-5" style={{maxWidth: '1100px', background: 'transparent', border: 'none', boxShadow: 'none'}}>
                
                <div className="text-center mb-5">
                    <h2 className="mb-2" style={{fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px'}}>
                        Panel de <span style={{color: 'var(--primary-color)'}}>Control</span>
                    </h2>
                    <p className="opacity-75">Gestión integral de usuarios y registros de acceso</p>
                </div>

                {/* Resumen de Estadísticas */}
                <div className="stats-container mx-auto">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <span className="material-symbols-outlined" style={{fontSize: '32px'}}>group</span>
                        </div>
                        <div className="stat-info">
                            <h4>Usuarios</h4>
                            <p>{users.length}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <span className="material-symbols-outlined" style={{fontSize: '32px'}}>login</span>
                        </div>
                        <div className="stat-info">
                            <h4>Ingresos Hoy</h4>
                            <p>{ingresos.filter(i => new Date(i.ingreso_datetime).toDateString() === new Date().toDateString()).length}</p>
                        </div>
                    </div>
                </div>

                {editingUser && (
                    <div className="glass-box p-4 mb-5 mx-auto fade-in-up" style={{maxWidth: '850px'}}>
                        <div className="section-header">
                            <h3 className="mb-0">Editar Perfil de Usuario</h3>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label opacity-75 small">N° Documento</label>
                                    <input type="text" name="user_identification" className="form-control bg-dark text-white border-success" value={formData.user_identification} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label opacity-75 small">Nombre</label>
                                    <input type="text" name="user_name" className="form-control bg-dark text-white border-success" value={formData.user_name} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label opacity-75 small">Apellido</label>
                                    <input type="text" name="user_lastname" className="form-control bg-dark text-white border-success" value={formData.user_lastname} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label opacity-75 small">Email Institucional</label>
                                    <input type="email" name="user_email" className="form-control bg-dark text-white border-success" value={formData.user_email} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label opacity-75 small">Seguridad (Opcional)</label>
                                    <input type="password" name="user_password" placeholder="Nueva contraseña..." className="form-control bg-dark text-white border-success" value={formData.user_password} onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label opacity-75 small">Ficha</label>
                                    <input type="number" name="user_coursenumber" className="form-control bg-dark text-white border-success" value={formData.user_coursenumber} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label opacity-75 small">Programa</label>
                                    <input type="text" name="user_program" className="form-control bg-dark text-white border-success" value={formData.user_program} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label opacity-75 small">Rol Asignado</label>
                                    <select name="fk_id_rol" className="form-control bg-dark text-white border-success" value={formData.fk_id_rol} onChange={handleChange} required>
                                        <option value="">Seleccione un rol</option>
                                        {roles.map(role => (
                                            <option key={role.id_rol} value={role.id_rol}>{role.rol_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex gap-2 mt-4">
                                <button type="submit" className="btn btn-success action-btn flex-grow-1 py-2">
                                    <span className="material-symbols-outlined">save</span> Actualizar Datos
                                </button>
                                <button type="button" className="btn btn-outline-secondary action-btn px-4" onClick={handleCancelEdit}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tabla de Usuarios */}
                <div className="table-responsive glass-box p-4 mb-5 mx-auto" style={{maxWidth: '1000px'}}>
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <div className="section-header mb-0">
                            <h3 className="mb-0">Gestión de Usuarios</h3>
                        </div>
                        <div className="input-group search-input-group" style={{maxWidth: '350px'}}>
                            <span className="input-group-text">
                                <span className="material-symbols-outlined">search</span>
                            </span>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Filtrar por nombre, correo, ficha..." 
                                value={searchTermUsers}
                                onChange={(e) => setSearchTermUsers(e.target.value)}
                            />
                        </div>
                    </div>
                    <table className="table table-dark admin-table mb-0">
                        <thead>
                            <tr>
                                <th>ID / Doc</th>
                                <th>Usuario</th>
                                <th>Contacto</th>
                                <th>Rol</th>
                                <th>Ficha</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id_usuario}>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <span className="fw-bold text-success">{user.user_identification || 'S/N'}</span>
                                            <span className="small opacity-50"># {user.id_usuario}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                                                {user.user_name[0]}{user.user_lastname[0]}
                                            </div>
                                            <span>{user.user_name} {user.user_lastname}</span>
                                        </div>
                                    </td>
                                    <td className="small opacity-75">{user.user_email}</td>
                                    <td>
                                        <span className={`badge ${user.role?.rol_name === 'Admin' ? 'bg-danger' : 'bg-success'} bg-opacity-25 text-white border border-${user.role?.rol_name === 'Admin' ? 'danger' : 'success'} border-opacity-50`} style={{fontSize: '0.7rem'}}>
                                            {user.role?.rol_name}
                                        </span>
                                    </td>
                                    <td className="fw-bold text-success">{user.user_coursenumber}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button className="btn btn-outline-warning btn-sm action-btn" onClick={() => handleEditClick(user)}>
                                                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>edit</span>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm action-btn" onClick={() => handleDelete(user.id_usuario)}>
                                                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tabla de Ingresos */}
                <div className="table-responsive glass-box p-4 mb-5 mx-auto" style={{maxWidth: '1000px'}}>
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <div className="section-header mb-0">
                            <h3 className="mb-0">Historial de Accesos</h3>
                        </div>
                        <div className="input-group search-input-group" style={{maxWidth: '350px'}}>
                            <span className="input-group-text">
                                <span className="material-symbols-outlined">search</span>
                            </span>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar en el historial..." 
                                value={searchTermIngresos}
                                onChange={(e) => setSearchTermIngresos(e.target.value)}
                            />
                        </div>
                    </div>
                    <table className="table table-dark admin-table mb-0">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Fecha y Hora</th>
                                <th>Ubicación / Punto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIngresos.map(ingreso => (
                                <tr key={ingreso.id_ingreso}>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <span className="fw-bold">{ingreso.user?.user_name} {ingreso.user?.user_lastname}</span>
                                            <span className="small opacity-50">{ingreso.user?.user_email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="material-symbols-outlined opacity-50" style={{fontSize: '18px'}}>calendar_today</span>
                                            {new Date(ingreso.ingreso_datetime).toLocaleString()}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge bg-dark border border-success border-opacity-25 px-3 py-2">
                                            {ingreso.ingreso_place}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-5 mb-4">
                    <button 
                        className="btn btn-glow px-5 py-2 border-danger text-danger d-inline-flex align-items-center gap-2" 
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(220, 53, 69, 0.05)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(220, 53, 69, 0.15)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 53, 69, 0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(220, 53, 69, 0.05)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span className="fw-bold" style={{letterSpacing: '1px'}}>CERRAR SESIÓN</span>
                    </button>
                </div>

            </div>
            <Footer />
        </div>
    );
    };


export default Admin;
