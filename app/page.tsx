"use client";

import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
        <div className="topbar">
          <div className="page-title">
            <h1>Buenos días, Aldo</h1>
            <div className="sub">Viernes 19 de junio · Sucursal Centro</div>
          </div>

          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Buscar productos, clientes, ventas…
            <kbd>⌘K</kbd>
          </div>

          <div className="topbar-actions">
            <div className="icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="dot"></span>
            </div>
            <button className="btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nueva venta
            </button>
          </div>
        </div>

        <div className="content">
          {/* ============ KPI STRIP (signature) ============ */}
          <div className="kpi-strip">
            <div className="kpi-cell">
              <div className="kpi-label-big">Ventas de hoy</div>
              <div className="kpi-value">Q 8<span style={{ opacity: .5 }}>,</span>240</div>
              <div className="kpi-delta up">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M17 7 7 17M7 7h10v10" />
                </svg>
                12.4% <span className="ctx">vs. ayer</span>
              </div>
              <div className="sparkline">
                <div className="bar" style={{ height: '30%' }}></div>
                <div className="bar" style={{ height: '48%' }}></div>
                <div className="bar" style={{ height: '38%' }}></div>
                <div className="bar" style={{ height: '62%' }}></div>
                <div className="bar" style={{ height: '50%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
                <div className="bar now" style={{ height: '92%' }}></div>
              </div>
            </div>

            <div className="kpi-cell">
              <div className="kpi-label-big">Ventas del mes</div>
              <div className="kpi-value">Q 164<span style={{ opacity: .5 }}>,</span>900</div>
              <div className="kpi-delta up">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M17 7 7 17M7 7h10v10" />
                </svg>
                8.1% <span className="ctx">vs. mes pasado</span>
              </div>
              <div className="sparkline">
                <div className="bar" style={{ height: '40%' }}></div>
                <div className="bar" style={{ height: '55%' }}></div>
                <div className="bar" style={{ height: '45%' }}></div>
                <div className="bar" style={{ height: '60%' }}></div>
                <div className="bar" style={{ height: '58%' }}></div>
                <div className="bar" style={{ height: '75%' }}></div>
                <div className="bar now" style={{ height: '80%' }}></div>
              </div>
            </div>

            <div className="kpi-cell">
              <div className="kpi-label-big">Margen bruto</div>
              <div className="kpi-value">38<sup>%</sup></div>
              <div className="kpi-delta down">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M7 7l10 10M17 7v10H7" />
                </svg>
                1.2% <span className="ctx">vs. mes pasado</span>
              </div>
              <div className="sparkline">
                <div className="bar" style={{ height: '60%' }}></div>
                <div className="bar" style={{ height: '58%' }}></div>
                <div className="bar" style={{ height: '62%' }}></div>
                <div className="bar" style={{ height: '50%' }}></div>
                <div className="bar" style={{ height: '48%' }}></div>
                <div className="bar" style={{ height: '44%' }}></div>
                <div className="bar now" style={{ height: '40%' }}></div>
              </div>
            </div>

            <div className="kpi-cell">
              <div className="kpi-label-big">Stock bajo</div>
              <div className="kpi-value" style={{ color: '#F2C68A' }}>7</div>
              <div className="kpi-delta" style={{ color: '#E8A893' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v5M12 16h.01" />
                </svg>
                <span className="ctx" style={{ color: '#C9B6A8' }}>requieren reposición</span>
              </div>
              <div className="sparkline">
                <div className="bar" style={{ height: '20%', background: '#C77B00', opacity: .5 }}></div>
                <div className="bar" style={{ height: '30%', background: '#C77B00', opacity: .5 }}></div>
                <div className="bar" style={{ height: '25%', background: '#C77B00', opacity: .6 }}></div>
                <div className="bar" style={{ height: '45%', background: '#C77B00', opacity: .7 }}></div>
                <div className="bar" style={{ height: '55%', background: '#C77B00', opacity: .8 }}></div>
                <div className="bar" style={{ height: '60%', background: '#C77B00', opacity: .9 }}></div>
                <div className="bar now" style={{ height: '70%', background: '#C77B00' }}></div>
              </div>
            </div>
          </div>

          {/* ============ ROW 1: chart + stock bajo ============ */}
          <div className="row r1">
            <div className="card">
              <div className="card-head">
                <div>
                  <h3>Ventas por día</h3>
                  <div className="sub">Últimos 14 días · Sucursal Centro</div>
                </div>
                <div className="pill-toggle">
                  <span className="active">14D</span>
                  <span>30D</span>
                  <span>90D</span>
                </div>
              </div>

              <div className="chart-area">
                <svg viewBox="0 0 600 220" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="600" y2="0" stroke="#E2D9C8" strokeWidth="1" />
                  <line x1="0" y1="55" x2="600" y2="55" stroke="#E2D9C8" strokeWidth="1" />
                  <line x1="0" y1="110" x2="600" y2="110" stroke="#E2D9C8" strokeWidth="1" />
                  <line x1="0" y1="165" x2="600" y2="165" stroke="#E2D9C8" strokeWidth="1" />
                  <line x1="0" y1="219" x2="600" y2="219" stroke="#E2D9C8" strokeWidth="1" />

                  <path d="M0,150 L46,140 L92,160 L138,120 L184,130 L230,90 L276,100 L322,70 L368,95 L414,60 L460,75 L506,40 L552,55 L598,20"
                        fill="none" stroke="#1B5E20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0,150 L46,140 L92,160 L138,120 L184,130 L230,90 L276,100 L322,70 L368,95 L414,60 L460,75 L506,40 L552,55 L598,20 L598,220 L0,220 Z"
                        fill="url(#grad)" opacity="0.5" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3F8E44" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3F8E44" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path d="M0,180 L46,178 L92,182 L138,170 L184,172 L230,160 L276,165 L322,150 L368,158 L414,145 L460,150 L506,135 L552,140 L598,125"
                        fill="none" stroke="#A98C7E" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />

                  <circle cx="598" cy="20" r="4.5" fill="#1B5E20" />
                  <circle cx="598" cy="20" r="8" fill="#1B5E20" opacity="0.15" />
                </svg>
              </div>
              <div className="chart-legend">
                <div className="item"><span className="dot" style={{ background: '#1B5E20' }}></span> Ventas reales</div>
                <div className="item"><span className="dot" style={{ background: '#A98C7E' }}></span> Meta proyectada</div>
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <div>
                  <h3>Stock bajo</h3>
                  <div className="sub">Requieren reposición pronto</div>
                </div>
              </div>

              <div className="stock-row">
                <div className="stock-thumb">🌱</div>
                <div className="stock-info">
                  <div className="pname">Sustrato premium 5kg</div>
                  <div className="pmeta">SKU-1042 · Vivero Central</div>
                </div>
                <div className="stock-gauge">
                  <div className="lvl crit">3 / 40</div>
                  <div className="bar-bg"><div className="bar-fill" style={{ width: '7%', background: '#A8412F' }}></div></div>
                </div>
              </div>
              <div className="stock-row">
                <div className="stock-thumb">🪴</div>
                <div className="stock-info">
                  <div className="pname">Maceta cerámica 20cm</div>
                  <div className="pmeta">SKU-2231 · Hogar &amp; Jardín</div>
                </div>
                <div className="stock-gauge">
                  <div className="lvl low">8 / 50</div>
                  <div className="bar-bg"><div className="bar-fill" style={{ width: '16%', background: '#C77B00' }}></div></div>
                </div>
              </div>
              <div className="stock-row">
                <div className="stock-thumb">🧤</div>
                <div className="stock-info">
                  <div className="pname">Guantes de jardinería</div>
                  <div className="pmeta">SKU-0871 · Herramientas</div>
                </div>
                <div className="stock-gauge">
                  <div className="lvl low">11 / 60</div>
                  <div className="bar-bg"><div className="bar-fill" style={{ width: '18%', background: '#C77B00' }}></div></div>
                </div>
              </div>
              <div className="stock-row">
                <div className="stock-thumb">🌿</div>
                <div className="stock-info">
                  <div className="pname">Fertilizante líquido 1L</div>
                  <div className="pmeta">SKU-3390 · Nutrición</div>
                </div>
                <div className="stock-gauge">
                  <div className="lvl low">14 / 80</div>
                  <div className="bar-bg"><div className="bar-fill" style={{ width: '17%', background: '#C77B00' }}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ ROW 2: ventas recientes + top productos ============ */}
          <div className="row r2" style={{ gridTemplateColumns: '1.7fr 1fr' }}>
            <div className="card">
              <div className="card-head">
                <div>
                  <h3>Últimas ventas</h3>
                  <div className="sub">12 transacciones hoy</div>
                </div>
                <div className="pill-toggle"><span className="active">Ver todas</span></div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Factura</th>
                    <th>Método</th>
                    <th>Estado</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="cust-cell">
                        <div className="cust-avatar">MR</div>
                        <div>
                          <div className="cust-name">María Reyes</div>
                          <div className="cust-sub">10:42 a.m.</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono">FAC-00482</td>
                    <td>Tarjeta</td>
                    <td><span className="badge ok"><span className="dot"></span>Pagada</span></td>
                    <td className="amount">Q 420.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cust-cell">
                        <div className="cust-avatar">JL</div>
                        <div>
                          <div className="cust-name">Jorge López</div>
                          <div className="cust-sub">10:15 a.m.</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono">FAC-00481</td>
                    <td>Efectivo</td>
                    <td><span className="badge ok"><span className="dot"></span>Pagada</span></td>
                    <td className="amount">Q 1,180.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cust-cell">
                        <div className="cust-avatar">CP</div>
                        <div>
                          <div className="cust-name">Comercial Petén S.A.</div>
                          <div className="cust-sub">09:51 a.m.</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono">FAC-00480</td>
                    <td>Transferencia</td>
                    <td><span className="badge pend"><span className="dot"></span>Pendiente</span></td>
                    <td className="amount">Q 3,640.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cust-cell">
                        <div className="cust-avatar">SV</div>
                        <div>
                          <div className="cust-name">Sofía Velásquez</div>
                          <div className="cust-sub">09:30 a.m.</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono">FAC-00479</td>
                    <td>Mixto</td>
                    <td><span className="badge ok"><span className="dot"></span>Pagada</span></td>
                    <td className="amount">Q 268.50</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cust-cell">
                        <div className="cust-avatar">DH</div>
                        <div>
                          <div className="cust-name">Diego Herrera</div>
                          <div className="cust-sub">09:02 a.m.</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono">FAC-00478</td>
                    <td>Tarjeta</td>
                    <td><span className="badge ok"><span className="dot"></span>Pagada</span></td>
                    <td className="amount">Q 712.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card-head">
                <div>
                  <h3>Productos más vendidos</h3>
                  <div className="sub">Esta semana</div>
                </div>
              </div>

              <div className="tp-row">
                <div className="tp-rank">01</div>
                <div className="tp-info"><div className="n">Sustrato premium 5kg</div><div className="c">Tierra y sustratos</div></div>
                <div className="tp-bar-bg"><div className="tp-bar-fill" style={{ width: '92%' }}></div></div>
                <div className="tp-val">184u</div>
              </div>
              <div className="tp-row">
                <div className="tp-rank">02</div>
                <div className="tp-info"><div className="n">Maceta cerámica 20cm</div><div className="c">Hogar &amp; Jardín</div></div>
                <div className="tp-bar-bg"><div className="tp-bar-fill" style={{ width: '74%' }}></div></div>
                <div className="tp-val">146u</div>
              </div>
              <div className="tp-row">
                <div className="tp-rank">03</div>
                <div className="tp-info"><div className="n">Fertilizante líquido 1L</div><div className="c">Nutrición</div></div>
                <div className="tp-bar-bg"><div className="tp-bar-fill" style={{ width: '61%' }}></div></div>
                <div className="tp-val">121u</div>
              </div>
              <div className="tp-row">
                <div className="tp-rank">04</div>
                <div className="tp-info"><div className="n">Guantes de jardinería</div><div className="c">Herramientas</div></div>
                <div className="tp-bar-bg"><div className="tp-bar-fill" style={{ width: '48%' }}></div></div>
                <div className="tp-val">95u</div>
              </div>
              <div className="tp-row">
                <div className="tp-rank">05</div>
                <div className="tp-info"><div className="n">Pala de mano</div><div className="c">Herramientas</div></div>
                <div className="tp-bar-bg"><div className="tp-bar-fill" style={{ width: '33%' }}></div></div>
                <div className="tp-val">67u</div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
