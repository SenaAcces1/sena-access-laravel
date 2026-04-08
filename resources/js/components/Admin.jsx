import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => { // funcion flecha para el componente Admin
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
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
                const usersResponse = await axios.get('/api/admin/users');
                const rolesResponse = await axios.get('/api/admin/roles');
                setUsers(usersResponse.data);
                setRoles(rolesResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
        <div className="container mt-5 text-white text-center fade-in-up">
            <div className=" justify-content-between align-items-center text-center mb-4">
                <h2 className="mb-0">Panel de Administración</h2>
            </div>
            
            {editingUser && (
                <div className="glass-box p-4 mb-5 mx-auto" style={{maxWidth: '800px'}}>
                    <h3 className="text-center mb-4">Editar Usuario</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" name="user_name" className="form-control bg-dark text-white border-success" value={formData.user_name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Apellido</label>
                                <input type="text" name="user_lastname" className="form-control bg-dark text-white border-success" value={formData.user_lastname} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name="user_email" className="form-control bg-dark text-white border-success" value={formData.user_email} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nueva Contraseña (dejar en blanco para no cambiar)</label>
                                <input type="password" name="user_password" className="form-control bg-dark text-white border-success" value={formData.user_password} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Ficha</label>
                                <input type="number" name="user_coursenumber" className="form-control bg-dark text-white border-success" value={formData.user_coursenumber} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Programa</label>
                                <input type="text" name="user_program" className="form-control bg-dark text-white border-success" value={formData.user_program} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Rol</label>
                                <select name="fk_id_rol" className="form-control bg-dark text-white border-success" value={formData.fk_id_rol} onChange={handleChange} required>
                                    <option value="">Seleccione un rol</option>
                                    {roles.map(role => (
                                        <option key={role.id_rol} value={role.id_rol}>{role.rol_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex gap-2 mt-3">
                            <button type="submit" className="btn btn-success flex-grow-1">Guardar Cambios</button>
                            <button type="button" className="btn btn-secondary flex-grow-1" onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-responsive glass-box p-4 mb-5 mx-auto " style={{maxWidth: '1000px'}}>
                <table className="table table-dark table-hover mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Ficha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id_usuario}>
                                <td>{user.id_usuario}</td>
                                <td>{user.user_name} {user.user_lastname}</td>
                                <td>{user.user_email}</td>
                                <td><span className="badge bg-success">{user.role?.rol_name}</span></td>
                                <td>{user.user_coursenumber}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(user)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id_usuario)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br></br>
                                                            <button className="btn btn-sm btn-outline-danger " onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                    Cerrar Sesión
                </button>
        </div>
        
        
    );
};

export default Admin;
