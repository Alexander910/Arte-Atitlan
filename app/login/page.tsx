"use client";

import Link from "next/link";
import { signInWithGoogle } from "../firebase/googleAuth";
import { signInWithEmail, useAuth } from "../firebase/auth";
import { useState } from "react";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const handleGoogle = async () => {
    if (googleLoading || emailLoading) return;
    setGoogleLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
      setError("Error al iniciar sesión con Google. Inténtalo de nuevo.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (googleLoading || emailLoading) return;
    setEmailLoading(true);
    setError(null);
    try {
      await signInWithEmail(email, password);
    } catch (e) {
      console.error(e);
      setError("Usuario o contraseña incorrectos. Verifica tus datos.");
    } finally {
      setEmailLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="login-loading">
        <div className="login-spinner"></div>
        <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--cafe-700)" }}>Cargando...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="login-container">
        <div className="login-card" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--verde-100)", color: "var(--verde-700)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
            <svg style={{ width: "32px", height: "32px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="login-title">¡Ya estás autenticado!</h2>
          <p className="login-subtitle" style={{ marginBottom: "24px" }}>
            Sesión activa como: <strong style={{ color: "var(--cafe-700)" }}>{user.displayName || user.email}</strong>
          </p>
          <Link href="/" className="login-btn-submit" style={{ textDecoration: "none" }}>
            <span>Ir al Dashboard</span>
            <svg style={{ width: "16px", height: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Header section with brand */}
        <div className="login-logo">A</div>
        <h1 className="login-title">Arte Atitlán</h1>
        <p className="login-subtitle">Control de Inventario y Ventas</p>

        <h2 className="login-header">Inicia sesión</h2>

        {/* Error notification */}
        {error && (
          <div className="login-error">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Google sign-in button */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading || emailLoading}
          className="login-btn-google"
          style={{ opacity: (googleLoading || emailLoading) ? 0.5 : 1 }}
        >
          {googleLoading ? (
            <div className="login-spinner" style={{ width: "20px", height: "20px", borderWidth: "2px" }}></div>
          ) : (
            <svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path d="M533.5 278.4c0-17.4-1.5-34.2-4.3-50.4H272v95.5h146.9c-6.3 34.1-25.5 63-54.4 82.3v68.4h87.9c51.4-47.4 81.1-117.3 81.1-196.8z" fill="#4285F4" />
              <path d="M272 544.3c73.5 0 135.3-24.5 180.4-66.5l-87.9-68.4c-24.4 16.5-55.6 26.2-92.5 26.2-71.2 0-131.5-48-153.1-112.6H27.4v70.8c45.2 89.9 138.4 150.5 244.6 150.5z" fill="#34A853" />
              <path d="M118.9 323.1c-10.4-30.7-10.4-63.6 0-94.3V158h-91.5c-38.4 75.7-38.4 166.2 0 241.9l91.5-70.8z" fill="#FBBC05" />
              <path d="M272 107.7c39.8-.6 78.2 14.7 107.2 42.5l80.3-80.3C410.9 22.9 342.5-1.9 272 0 165.8 0 72.6 60.6 27.4 150.5l91.5 70.8C140.5 155.7 200.8 107.7 272 107.7z" fill="#EA4335" />
            </svg>
          )}
          <span>{googleLoading ? "Conectando..." : "Iniciar con Google"}</span>
        </button>

        {/* Separator */}
        <div className="login-separator">
          <span>o con tu correo</span>
        </div>

        {/* Email form */}
        <form onSubmit={handleEmail} className="login-form">
          <div className="login-form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={googleLoading || emailLoading}
            />
          </div>

          <div className="login-form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={googleLoading || emailLoading}
            />
          </div>

          <button
            type="submit"
            disabled={googleLoading || emailLoading}
            className="login-btn-submit"
            style={{ opacity: (googleLoading || emailLoading) ? 0.5 : 1 }}
          >
            {emailLoading ? (
              <div className="login-spinner" style={{ width: "20px", height: "20px", borderWidth: "2px", borderTopColor: "var(--blanco)", borderColor: "rgba(255,255,255,0.3)" }}></div>
            ) : null}
            <span>{emailLoading ? "Iniciando sesión..." : "Iniciar con Email"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
