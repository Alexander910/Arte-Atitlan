"use client";

import React from 'react';

export default function Compras() {
  return (
    <>
      <div className="topbar">
        <div className="page-title">
          <h1>Gestión de Compras</h1>
          <div className="sub">Proveedores y órdenes de compra</div>
        </div>

        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Buscar proveedores u órdenes…
          <kbd>⌘K</kbd>
        </div>

        <div className="topbar-actions">
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Nueva orden
          </button>
        </div>
      </div>

      <div className="content">
        <div className="kpi-strip" style={{ gridTemplateColumns: 'repeat(3, 1fr)', padding: '20px 28px', borderRadius: '14px', marginBottom: '8px' }}>
          <div className="kpi-cell">
            <div className="kpi-label-big">Compras (Mes)</div>
            <div className="kpi-value">Q 28<span style={{ opacity: .5 }}>,</span>400</div>
          </div>
          <div className="kpi-cell">
            <div className="kpi-label-big">Cuentas por pagar</div>
            <div className="kpi-value" style={{ color: '#E8A893' }}>Q 12<span style={{ opacity: .5 }}>,</span>050</div>
          </div>
          <div className="kpi-cell">
            <div className="kpi-label-big">Proveedores Activos</div>
            <div className="kpi-value">18</div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3>Órdenes de Compra</h3>
              <div className="sub">Historial reciente</div>
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>OC</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Pago</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mono" style={{ fontWeight: 600 }}>OC-2026-089</td>
                <td style={{ fontWeight: 600 }}>Agroinsumos del Norte S.A.</td>
                <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>Ayer</td>
                <td className="mono amount">Q 4,200.00</td>
                <td><span className="badge pend">En tránsito</span></td>
                <td><span className="badge" style={{ background: 'var(--beige-deep)' }}>Pendiente (30 días)</span></td>
              </tr>
              <tr>
                <td className="mono" style={{ fontWeight: 600 }}>OC-2026-088</td>
                <td style={{ fontWeight: 600 }}>Cerámicas El Quetzal</td>
                <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>15 Jun 2026</td>
                <td className="mono amount">Q 7,850.00</td>
                <td><span className="badge ok">Recibido</span></td>
                <td><span className="badge ok">Pagado</span></td>
              </tr>
              <tr>
                <td className="mono" style={{ fontWeight: 600 }}>OC-2026-087</td>
                <td style={{ fontWeight: 600 }}>Plásticos y Derivados S.A.</td>
                <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>10 Jun 2026</td>
                <td className="mono amount">Q 1,150.00</td>
                <td><span className="badge ok">Recibido</span></td>
                <td><span className="badge ok">Pagado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
