import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real app, you'd need the sanctum token here
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
        <div className="container mt-5 text-white">
            <h2 className="mb-4">Panel de Administración</h2>
            <div className="table-responsive glass-box p-4">
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Ficha</th>
                            <th>Programa</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id_usuario}>
                                <td>{user.id_usuario}</td>
                                <td>{user.user_name} {user.user_lastname}</td>
                                <td>{user.user_email}</td>
                                <td>{user.role?.rol_name}</td>
                                <td>{user.user_coursenumber}</td>
                                <td>{user.user_program}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id_usuario)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
