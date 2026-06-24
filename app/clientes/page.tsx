"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Clientes() {
  const [filter, setFilter] = useState('Todos');

  // Mock clients
  const clients = [
    { id: 1, name: 'María Reyes', initials: 'MR', email: 'mreyes@ejemplo.com', phone: '+502 5544-3322', type: 'Minorista', totalPurchases: 4200.00, lastPurchase: 'Hoy, 10:42 a.m.', status: 'Activo' },
    { id: 2, name: 'Jorge López', initials: 'JL', email: 'jorge.l@ejemplo.com', phone: '+502 4433-2211', type: 'Minorista', totalPurchases: 1180.00, lastPurchase: 'Hoy, 10:15 a.m.', status: 'Activo' },
    { id: 3, name: 'Comercial Petén S.A.', initials: 'CP', email: 'compras@cpeten.com', phone: '+502 2233-4455', type: 'Corporativo', totalPurchases: 34500.00, lastPurchase: 'Hoy, 09:51 a.m.', status: 'Activo' },
    { id: 4, name: 'Sofía Velásquez', initials: 'SV', email: 'sofia.v@ejemplo.com', phone: '+502 5566-7788', type: 'Minorista', totalPurchases: 850.50, lastPurchase: 'Hoy, 09:30 a.m.', status: 'Activo' },
    { id: 5, name: 'Diego Herrera', initials: 'DH', email: 'dherrera@ejemplo.com', phone: '+502 3344-5566', type: 'Minorista', totalPurchases: 2712.00, lastPurchase: 'Hoy, 09:02 a.m.', status: 'Activo' },
    { id: 6, name: 'Viveros La Aurora', initials: 'VA', email: 'contacto@vlaaurora.com', phone: '+502 2455-6677', type: 'Mayorista', totalPurchases: 89000.00, lastPurchase: 'Ayer, 16:45 p.m.', status: 'Activo' },
    { id: 7, name: 'Ana Morales', initials: 'AM', email: 'amorales@ejemplo.com', phone: '+502 5511-2233', type: 'Minorista', totalPurchases: 450.00, lastPurchase: '12 Jun 2026', status: 'Inactivo' },
    { id: 8, name: 'Carlos Fuentes', initials: 'CF', email: 'cfuentes@ejemplo.com', phone: '+502 4499-8877', type: 'Minorista', totalPurchases: 120.00, lastPurchase: '05 May 2026', status: 'Inactivo' },
  ];

  return (
    <>
        <div className="topbar">
          <div className="page-title">
            <h1>Directorio de Clientes</h1>
            <div className="sub">Gestión de relaciones (CRM) y fidelización</div>
          </div>

          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Buscar por nombre, correo, teléfono o empresa…
            <kbd>⌘K</kbd>
          </div>

          <div className="topbar-actions">
            <div className="icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </div>
            <button className="btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
              Añadir cliente
            </button>
          </div>
        </div>

        <div className="content">
          
          {/* KPI Strip specific to CRM */}
          <div className="kpi-strip" style={{ gridTemplateColumns: 'repeat(3, 1fr)', padding: '20px 28px', borderRadius: '14px', marginBottom: '8px' }}>
            <div className="kpi-cell">
              <div className="kpi-label-big">Total Clientes</div>
              <div className="kpi-value">1,402</div>
              <div className="kpi-delta up">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M17 7 7 17M7 7h10v10" />
                </svg>
                +24 <span className="ctx">este mes</span>
              </div>
            </div>
            <div className="kpi-cell">
              <div className="kpi-label-big">Clientes Activos</div>
              <div className="kpi-value">845</div>
              <div className="kpi-delta up">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M17 7 7 17M7 7h10v10" />
                </svg>
                60.2% <span className="ctx">tasa de retención</span>
              </div>
            </div>
            <div className="kpi-cell">
              <div className="kpi-label-big">Ticket Promedio</div>
              <div className="kpi-value">Q 412<sup style={{ fontSize: '18px' }}>.50</sup></div>
              <div className="kpi-delta down">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M7 7l10 10M17 7v10H7" />
                </svg>
                2.1% <span className="ctx">vs. mes pasado</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '0' }}>
            <div className="card-head" style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--line)', marginBottom: 0 }}>
              <div className="pill-toggle">
                <span className={filter === 'Todos' ? 'active' : ''} onClick={() => setFilter('Todos')} style={{ cursor: 'pointer' }}>Todos</span>
                <span className={filter === 'Minoristas' ? 'active' : ''} onClick={() => setFilter('Minoristas')} style={{ cursor: 'pointer' }}>Minoristas</span>
                <span className={filter === 'Mayoristas' ? 'active' : ''} onClick={() => setFilter('Mayoristas')} style={{ cursor: 'pointer' }}>Mayoristas</span>
                <span className={filter === 'Corporativos' ? 'active' : ''} onClick={() => setFilter('Corporativos')} style={{ cursor: 'pointer' }}>Corporativos</span>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '850px' }}>
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '24px' }}>Cliente</th>
                    <th>Contacto</th>
                    <th>Tipo</th>
                    <th>Total Compras</th>
                    <th>Última Compra</th>
                    <th>Estado</th>
                    <th style={{ paddingRight: '24px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--beige-deep)', transition: 'background 0.15s' }}>
                      <td style={{ paddingLeft: '24px' }}>
                        <div className="cust-cell">
                          <div className="cust-avatar">{c.initials}</div>
                          <div>
                            <div className="cust-name">{c.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--cafe-900)' }}>{c.email}</span>
                          <span style={{ fontSize: '11.5px', color: 'var(--cafe-500)' }}>{c.phone}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>
                        <span style={{ 
                          background: 'var(--beige-deep)', 
                          padding: '3px 8px', 
                          borderRadius: '6px', 
                          fontSize: '11.5px', 
                          fontWeight: 600,
                          color: 'var(--cafe-900)'
                        }}>
                          {c.type}
                        </span>
                      </td>
                      <td className="mono amount" style={{ color: 'var(--verde-700)' }}>Q {c.totalPurchases.toFixed(2)}</td>
                      <td style={{ fontSize: '13px', color: 'var(--cafe-500)' }}>{c.lastPurchase}</td>
                      <td>
                        {c.status === 'Activo' && <span className="badge ok"><span className="dot"></span>Activo</span>}
                        {c.status === 'Inactivo' && <span className="badge" style={{ background: 'var(--beige-deep)', color: 'var(--cafe-500)' }}><span className="dot"></span>Inactivo</span>}
                      </td>
                      <td style={{ paddingRight: '24px' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cafe-500)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                          </button>
                          <button style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cafe-500)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--line)', fontSize: '12px', color: 'var(--cafe-500)' }}>
              <div>Mostrando 8 de 1,402 clientes</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', color: 'var(--cafe-500)', opacity: 0.5 }} disabled>Anterior</button>
                <button style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--blanco)', cursor: 'pointer', color: 'var(--cafe-900)' }}>Siguiente</button>
                <button style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--blanco)', cursor: 'pointer', color: 'var(--cafe-900)' }}>10</button>
                <button style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--blanco)', cursor: 'pointer', color: 'var(--cafe-900)' }}>20</button>
              </div>
            </div>

          </div>
        </div>
      </>
  );
}
