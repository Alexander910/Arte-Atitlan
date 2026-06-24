"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Ventas() {
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);

  // Mock products
  const products = [
    { id: 1, name: 'Sustrato premium 5kg', price: 85, category: 'Tierra', stock: 12 },
    { id: 2, name: 'Maceta cerámica 20cm', price: 120, category: 'Macetas', stock: 8 },
    { id: 3, name: 'Fertilizante líquido 1L', price: 65, category: 'Nutrición', stock: 14 },
    { id: 4, name: 'Guantes de jardinería', price: 45, category: 'Herramientas', stock: 11 },
    { id: 5, name: 'Pala de mano', price: 35, category: 'Herramientas', stock: 20 },
    { id: 6, name: 'Regadera metal 2L', price: 90, category: 'Accesorios', stock: 5 },
    { id: 7, name: 'Semillas de Girasol', price: 15, category: 'Semillas', stock: 40 },
    { id: 8, name: 'Tijeras de podar', price: 110, category: 'Herramientas', stock: 6 },
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <>
        <div className="topbar">
          <div className="page-title">
            <h1>Punto de Venta (POS)</h1>
            <div className="sub">Sucursal Centro · Caja 01</div>
          </div>

          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Buscar por nombre o escanear código (SKU)…
            <kbd>⌘K</kbd>
          </div>

          <div className="topbar-actions">
            <div className="icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </div>
            <button className="btn-primary" style={{ background: 'var(--ambar)', color: 'var(--cafe-900)' }}>
              Cerrar turno
            </button>
          </div>
        </div>

        <div className="content" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', height: 'calc(100vh - 85px)', padding: '24px 32px' }}>
          
          {/* CATALOGO */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden', padding: '20px 24px' }}>
            <div className="card-head" style={{ marginBottom: 0 }}>
              <div>
                <h3>Catálogo de Productos</h3>
              </div>
              <div className="pill-toggle">
                <span className="active">Todos</span>
                <span>Plantas</span>
                <span>Herramientas</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', overflowY: 'auto', paddingRight: '6px', margin: '0 -6px', padding: '6px' }}>
              {products.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => addToCart(p)} 
                  style={{ 
                    border: '1px solid var(--line)', 
                    borderRadius: '14px', 
                    padding: '16px', 
                    cursor: 'pointer', 
                    transition: 'all 0.2s', 
                    background: 'var(--blanco)',
                    boxShadow: '0 2px 4px rgba(43,31,26,0.02)'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--verde-300)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--line)'}
                >
                  <div style={{ height: '110px', background: 'var(--beige-deep)', borderRadius: '10px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px' }}>
                    {p.name.includes('Sustrato') ? '🌱' : p.name.includes('Maceta') ? '🪴' : p.name.includes('Guantes') ? '🧤' : p.name.includes('Fertilizante') ? '🌿' : p.name.includes('Semillas') ? '🌻' : p.name.includes('Regadera') ? '🚿' : '✂️'}
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--cafe-900)', lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--cafe-500)', marginTop: '4px' }}>{p.stock} disponibles</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--verde-700)', marginTop: '10px' }}>Q {p.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ORDEN / CART */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '20px 24px' }}>
             <div className="card-head" style={{ marginBottom: '16px' }}>
               <div>
                 <h3>Orden Actual</h3>
               </div>
               <span className="badge ok">Nueva orden</span>
             </div>

             <div className="cart-items" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', margin: '0 -4px', padding: '0 4px' }}>
               {cart.length === 0 ? (
                 <div style={{ textAlign: 'center', color: 'var(--cafe-500)', fontSize: '13px', marginTop: '60px' }}>
                   No hay productos en la orden.<br />Selecciona un producto del catálogo para comenzar.
                 </div>
               ) : (
                 cart.map(item => (
                   <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--beige-deep)' }}>
                     <div style={{ flex: 1, minWidth: 0 }}>
                       <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cafe-900)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.name}</div>
                       <div style={{ fontSize: '13px', color: 'var(--verde-700)', fontWeight: 600, marginTop: '2px' }}>Q {(item.price * item.qty).toFixed(2)}</div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', background: 'var(--beige-deep)', borderRadius: '6px', overflow: 'hidden' }}>
                       <button onClick={() => updateQty(item.id, -1)} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--cafe-700)', fontWeight: 600 }}>-</button>
                       <div style={{ width: '28px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{item.qty}</div>
                       <button onClick={() => updateQty(item.id, 1)} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--cafe-700)', fontWeight: 600 }}>+</button>
                     </div>
                   </div>
                 ))
               )}
             </div>

             <div className="cart-summary" style={{ paddingTop: '20px', marginTop: '10px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--cafe-700)' }}>
                 <span>Subtotal</span>
                 <span className="mono">Q {subtotal.toFixed(2)}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px', color: 'var(--cafe-700)' }}>
                 <span>Impuestos (12%)</span>
                 <span className="mono">Q {tax.toFixed(2)}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '19px', fontWeight: 700, color: 'var(--cafe-900)' }}>
                 <span>Total</span>
                 <span className="mono">Q {total.toFixed(2)}</span>
               </div>

               <div style={{ display: 'flex', gap: '10px' }}>
                 <button onClick={() => setCart([])} style={{ width: '48px', flexShrink: 0, borderRadius: '9px', background: 'var(--rojo-bg)', color: 'var(--rojo)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                 </button>
                 <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '15px' }} disabled={cart.length === 0}>
                   Cobrar Q {total.toFixed(2)}
                 </button>
               </div>
             </div>
          </div>

        </div>
      </>
  );
}
