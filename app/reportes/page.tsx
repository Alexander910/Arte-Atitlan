"use client";

import React from 'react';

export default function Reportes() {
  return (
    <>
      <div className="topbar">
        <div className="page-title">
          <h1>Análisis y Reportes</h1>
          <div className="sub">Inteligencia de negocios</div>
        </div>

        <div className="topbar-actions">
          <button className="btn-primary" style={{ background: 'var(--cafe-900)', color: 'var(--beige)' }}>
            Exportar datos (CSV)
          </button>
        </div>
      </div>

      <div className="content">
        <div className="row r1">
          <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--cafe-500)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '48px', height: '48px', marginBottom: '16px', opacity: 0.5 }}>
              <path d="M3 3v18h18" />
              <path d="M18.7 8 13 13.7l-3-3L4 17" />
            </svg>
            Gráfico de Ventas vs Costos (Mensual)
          </div>
          <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--cafe-500)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '48px', height: '48px', marginBottom: '16px', opacity: 0.5 }}>
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
            Distribución de Ventas por Categoría
          </div>
        </div>
      </div>
    </>
  );
}
