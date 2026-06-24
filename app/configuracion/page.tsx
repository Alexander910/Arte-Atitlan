"use client";

import React, { useEffect, useState } from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db, secondaryApp } from '../firebase/client';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

type UserData = {
  email: string;
  name: string;
  role: string;
};

export default function Configuracion() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('admin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList: UserData[] = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ email: doc.id, ...doc.data() } as UserData);
      });
      setUsers(usersList);
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (email: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar los permisos del usuario ${email}? No podrá acceder a la aplicación.`)) {
      return;
    }
    try {
      const { deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, "users", email));
      // Remove from UI immediately
      setUsers(users.filter(u => u.email !== email));
    } catch (e) {
      console.error("Error eliminando usuario:", e);
      alert("Hubo un error al eliminar el usuario.");
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newPassword || !newName) {
      setErrorMsg('Todos los campos son obligatorios');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Create auth user in secondary app so current user isn't logged out
      const secondaryAuth = getAuth(secondaryApp);
      await createUserWithEmailAndPassword(secondaryAuth, newEmail, newPassword);

      // 2. Save user role and metadata in Firestore
      await setDoc(doc(db, "users", newEmail), {
        name: newName,
        role: newRole
      });

      // 3. Close modal and refresh list
      setShowModal(false);
      setNewEmail('');
      setNewPassword('');
      setNewName('');
      setNewRole('admin');
      fetchUsers();
    } catch (e: unknown) {
      console.error("Error creating user:", e);
      setErrorMsg(e instanceof Error ? e.message : 'Error al crear usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="page-title">
          <h1>Configuración</h1>
          <div className="sub">Ajustes del sistema y preferencias</div>
        </div>
        <div className="topbar-actions">
          <button className="btn-primary">
            Guardar cambios
          </button>
        </div>
      </div>

      <div className="content">
        <div className="row r2">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card-head" style={{ marginBottom: 0 }}>
              <h3>Perfil de Empresa</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cafe-900)' }}>Nombre de la empresa</label>
              <input type="text" defaultValue="Arte Atitlán" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--blanco)', fontSize: '14px', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cafe-900)' }}>Moneda principal</label>
              <select style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--blanco)', fontSize: '14px', outline: 'none' }}>
                <option>Quetzales (Q)</option>
                <option>Dólares (USD)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cafe-900)' }}>Impuesto predeterminado (IVA)</label>
              <input type="text" defaultValue="12%" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--blanco)', fontSize: '14px', outline: 'none' }} />
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Usuarios y Permisos</h3>
              <button 
                onClick={() => setShowModal(true)}
                style={{ background: 'var(--verde-100)', color: 'var(--verde-900)', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                + Agregar Usuario
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {loading ? (
                <div style={{ fontSize: '13px', color: 'var(--cafe-500)' }}>Cargando usuarios...</div>
              ) : users.length === 0 ? (
                <div style={{ fontSize: '13px', color: 'var(--cafe-500)' }}>No hay usuarios registrados.</div>
              ) : (
                users.map(u => (
                  <div key={u.email} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--line)', borderRadius: '10px' }}>
                    <div className="avatar">{u.name.substring(0, 2).toUpperCase()}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--cafe-500)' }}>{u.email}</div>
                    </div>
                    <div className="badge ok">{u.role === 'admin' ? 'Administrador' : 'Usuario'}</div>
                    
                    <button 
                      onClick={() => handleDeleteUser(u.email)}
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: 'var(--rojo)', 
                        cursor: 'pointer', 
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.7,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.opacity = '1'}
                      onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
                      title="Eliminar usuario"
                    >
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(43,31,26,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '400px', maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Nuevo Usuario</h3>
            
            {errorMsg && (
              <div style={{ background: 'var(--rojo-bg)', color: 'var(--rojo)', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Nombre completo</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Correo electrónico</label>
                <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Contraseña temporal</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Rol</label>
                <select value={newRole} onChange={e => setNewRole(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario (Ventas)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--blanco)', fontWeight: 600, cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {isSubmitting ? 'Guardando...' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
