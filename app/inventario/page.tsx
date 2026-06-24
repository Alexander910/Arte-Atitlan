"use client";

import React from 'react';

export default function Inventario() {
  return (
    <>
      <div className="topbar">
        <div className="page-title">
          <h1>Control de Inventario</h1>
          <div className="sub">Gestión de stock, almacenes y movimientos</div>
        </div>

        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Buscar lotes, ubicaciones o SKU…
          <kbd>⌘K</kbd>
        </div>

        <div className="topbar-actions">
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Ajuste manual
          </button>
        </div>
      </div>

      <div className="content">
        <div className="kpi-strip" style={{ gridTemplateColumns: 'repeat(4, 1fr)', padding: '20px 28px', borderRadius: '14px', marginBottom: '8px' }}>
          <div className="kpi-cell">
            <div className="kpi-label-big">Valor Total</div>
            <div className="kpi-value">Q 45<span style={{ opacity: .5 }}>,</span>200</div>
          </div>
          <div className="kpi-cell">
            <div className="kpi-label-big">SKUs Activos</div>
            <div className="kpi-value">142</div>
          </div>
          <div className="kpi-cell">
            <div className="kpi-label-big">Bajo Stock</div>
            <div className="kpi-value" style={{ color: '#F2C68A' }}>7</div>
          </div>
          <div className="kpi-cell">
            <div className="kpi-label-big">Mermas (Mes)</div>
            <div className="kpi-value" style={{ color: '#E8A893' }}>Q 340</div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3>Movimientos recientes</h3>
              <div className="sub">Entradas y salidas de almacén</div>
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Ubicación</th>
                <th>Responsable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>Hoy, 08:30 a.m.</td>
                <td><span className="badge ok">Entrada</span></td>
                <td style={{ fontWeight: 600 }}>Sustrato premium 5kg</td>
                <td className="mono" style={{ color: 'var(--verde-700)' }}>+50</td>
                <td>Bodega Central</td>
                <td>Aldo Cano</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>Ayer, 17:15 p.m.</td>
                <td><span className="badge pend" style={{ background: 'var(--rojo-bg)', color: 'var(--rojo)' }}>Salida / Merma</span></td>
                <td style={{ fontWeight: 600 }}>Maceta cerámica 20cm</td>
                <td className="mono" style={{ color: 'var(--rojo)' }}>-2</td>
                <td>Piso de ventas</td>
                <td>María L.</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>18 Jun, 14:20 p.m.</td>
                <td><span className="badge" style={{ background: 'var(--beige-deep)' }}>Traslado</span></td>
                <td style={{ fontWeight: 600 }}>Fertilizante líquido 1L</td>
                <td className="mono">20</td>
                <td>Bodega → Tienda</td>
                <td>Aldo Cano</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
