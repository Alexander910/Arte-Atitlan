"use client";

import { useAuth } from "../firebase/auth";
import { firebaseApp } from "../firebase/client";
import { getAuth, signOut } from "firebase/auth";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">
          <Image
            src="/Logo_El arte de Atitlán_5.jpg"
            alt="Arte Atitlán Logo"
            width={40}
            height={40}
            style={{ objectFit: 'contain', borderRadius: '8px' }}
          />
        </div>
        Arte Atitlán
      </div>

      <div className="nav-section-label">Resumen</div>
      <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
        Dashboard
      </Link>

      <div className="nav-section-label">Operación</div>
      <Link href="/ventas" className={`nav-item ${pathname === '/ventas' ? 'active' : ''}`}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        Ventas (POS)
      </Link>
      <Link href="/productos" className={`nav-item ${pathname === '/productos' ? 'active' : ''}`}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.27 6.96 8.73 5.04 8.73-5.04M12 22.08V12" />
        </svg>
        Productos
      </Link>
      <Link href="/inventario" className={`nav-item ${pathname === '/inventario' ? 'active' : ''}`}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 7h-9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
          <path d="M9 12h6M9 16h6" />
        </svg>
        Inventario
        <span className="nav-badge">7</span>
      </Link>
      <Link href="/clientes" className={`nav-item ${pathname === '/clientes' ? 'active' : ''}`}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        Clientes
      </Link>
      <Link href="/compras" className={`nav-item ${pathname === '/compras' ? 'active' : ''}`}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="M3.3 6.96 12 12.01l8.7-5.05M12 22.08V12" />
        </svg>
        Compras
      </Link>

      <div className="nav-section-label">Análisis</div>
      <Link href="/reportes" className={`nav-item ${pathname === '/reportes' ? 'active' : ''}`}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18.7 8 13 13.7l-3-3L4 17" />
        </svg>
        Reportes
      </Link>
      <Link href="/configuracion" className={`nav-item ${pathname === '/configuracion' ? 'active' : ''}`}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.3l.06.06A1.65 1.65 0 0 0 8.92 4.7a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
        Configuración
      </Link>

      <div className="sidebar-foot">
        {user ? (
          <>
            <div className="avatar">
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
              ) : (
                user.displayName?.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div className="who">
              <div className="name">{user.displayName || "Usuario"}</div>
              <div className="role">{user.email}</div>
            </div>
            <button
              className="signout btn-primary mt-2"
              onClick={() => {
                const auth = getAuth(firebaseApp);
                signOut(auth);
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <div className="who">
            <div className="name">Invitado</div>
            <div className="role">No autenticado</div>
            <Link href="/login" className="btn-primary mt-2">Iniciar sesión</Link>
          </div>
        )}
      </div>
    </aside>
  );
}
