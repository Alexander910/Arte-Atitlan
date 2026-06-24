"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/client';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  cost: number;
  price: number;
  stock: number;
  measurements: string;
  status: string;
  photoUrl?: string;
};

export default function Productos() {
  const [filter, setFilter] = useState('Todos');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newMeasurements, setNewMeasurements] = useState('');
  const [newStatus, setNewStatus] = useState('Activo');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsList);
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCategory || !newCost || !newPrice || !newStock) {
      setErrorMsg('Por favor llena los campos requeridos (*)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Upload image if exists — se guarda en el servidor local
      let photoUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Error al subir la imagen');
        }
        const data = await res.json();
        photoUrl = data.url;
      }

      // 2. Save product to Firestore
      // Generate a simple ID or use sku if preferred. We'll use a random ID.
      const productId = Date.now().toString();
      
      const newProduct: Omit<Product, 'id'> = {
        name: newName,
        sku: newSku || `SKU-${Math.floor(Math.random() * 10000)}`,
        category: newCategory,
        cost: parseFloat(newCost),
        price: parseFloat(newPrice),
        stock: parseInt(newStock, 10),
        measurements: newMeasurements,
        status: newStatus,
        photoUrl: photoUrl || undefined
      };

      await setDoc(doc(db, "products", productId), newProduct);

      // 3. Reset and close modal
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error("Error adding product:", error);
      setErrorMsg(error.message || 'Hubo un error al guardar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el producto "${name}"?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
    } catch (e) {
      console.error("Error deleting product:", e);
      alert("Hubo un error al eliminar el producto.");
    }
  };

  const resetForm = () => {
    setNewName('');
    setNewSku('');
    setNewCategory('');
    setNewCost('');
    setNewPrice('');
    setNewStock('');
    setNewMeasurements('');
    setNewStatus('Activo');
    setImageFile(null);
  };

  const filteredProducts = products.filter(p => {
    if (filter === 'Todos') return true;
    if (filter === 'Activos' && p.status === 'Activo') return true;
    if (filter === 'Agotados' && p.status === 'Agotado') return true;
    if (filter === 'Inactivos' && p.status === 'Inactivo') return true;
    return false;
  });

  return (
    <>
      <div className="topbar">
        <div className="page-title">
          <h1>Productos</h1>
          <div className="sub">Gestión de catálogo y precios</div>
        </div>

        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Buscar por nombre, SKU o categoría…
          <kbd>⌘K</kbd>
        </div>

        <div className="topbar-actions">
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Nuevo producto
          </button>
        </div>
      </div>

      <div className="content">
        <div className="card" style={{ padding: '0' }}>
          <div className="card-head" style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--line)', marginBottom: 0 }}>
            <div className="pill-toggle">
              <span className={filter === 'Todos' ? 'active' : ''} onClick={() => setFilter('Todos')} style={{ cursor: 'pointer' }}>Todos los productos</span>
              <span className={filter === 'Activos' ? 'active' : ''} onClick={() => setFilter('Activos')} style={{ cursor: 'pointer' }}>Activos</span>
              <span className={filter === 'Agotados' ? 'active' : ''} onClick={() => setFilter('Agotados')} style={{ cursor: 'pointer' }}>Agotados</span>
              <span className={filter === 'Inactivos' ? 'active' : ''} onClick={() => setFilter('Inactivos')} style={{ cursor: 'pointer' }}>Inactivos</span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: '24px' }}>Producto</th>
                  <th>Categoría</th>
                  <th>Costo</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Medidas</th>
                  <th>Estado</th>
                  <th style={{ paddingRight: '24px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--cafe-500)' }}>
                      Cargando productos...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--cafe-500)' }}>
                      No se encontraron productos.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--beige-deep)', transition: 'background 0.15s' }}>
                      <td style={{ paddingLeft: '24px' }}>
                        <div className="cust-cell">
                          <div className="cust-avatar" style={{ background: p.photoUrl ? 'transparent' : 'var(--beige-deep)', color: 'var(--cafe-500)', fontSize: '15px', overflow: 'hidden' }}>
                            {p.photoUrl ? (
                              <img src={p.photoUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              p.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="cust-name">{p.name}</div>
                            <div className="cust-sub">{p.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>{p.category}</td>
                      <td className="mono" style={{ color: 'var(--cafe-500)' }}>Q {p.cost?.toFixed(2)}</td>
                      <td className="mono amount" style={{ color: 'var(--verde-700)' }}>Q {p.price?.toFixed(2)}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="mono" style={{ fontWeight: 600 }}>{p.stock}</span>
                          <span style={{ fontSize: '11px', color: 'var(--cafe-500)' }}>u.</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--cafe-500)', fontSize: '13px' }}>{p.measurements || '-'}</td>
                      <td>
                        {p.status === 'Activo' && <span className="badge ok"><span className="dot"></span>Activo</span>}
                        {p.status === 'Alerta' && <span className="badge pend" style={{ background: 'var(--ambar-bg)', color: 'var(--ambar)' }}><span className="dot"></span>Alerta</span>}
                        {p.status === 'Agotado' && <span className="badge" style={{ background: 'var(--rojo-bg)', color: 'var(--rojo)' }}><span className="dot"></span>Agotado</span>}
                        {p.status === 'Inactivo' && <span className="badge" style={{ background: 'var(--beige-deep)', color: 'var(--cafe-500)' }}><span className="dot"></span>Inactivo</span>}
                      </td>
                      <td style={{ paddingRight: '24px' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button 
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            style={{ width: '30px', height: '30px', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rojo)', opacity: 0.7 }}
                            onMouseOver={e => e.currentTarget.style.opacity = '1'}
                            onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
                            title="Eliminar producto"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Nuevo Producto */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(43,31,26,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Nuevo Producto</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cafe-500)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {errorMsg && (
              <div style={{ background: 'var(--rojo-bg)', color: 'var(--rojo)', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Nombre del Producto *</label>
                  <input type="text" value={newName} onChange={e => setNewName(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>SKU (Opcional)</label>
                  <input type="text" value={newSku} onChange={e => setNewSku(e.target.value)} placeholder="Ej. SKU-1042" style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Categoría *</label>
                <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} required placeholder="Ej. Plantas, Macetas..." style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Costo (Q) *</label>
                  <input type="number" step="0.01" value={newCost} onChange={e => setNewCost(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Precio de Venta (Q) *</label>
                  <input type="number" step="0.01" value={newPrice} onChange={e => setNewPrice(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Stock *</label>
                  <input type="number" value={newStock} onChange={e => setNewStock(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Medidas</label>
                  <input type="text" value={newMeasurements} onChange={e => setNewMeasurements(e.target.value)} placeholder="Ej. 20x30 cm, 1 Litro" style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Estado *</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                  <option value="Activo">Activo</option>
                  <option value="Alerta">Alerta (Bajo Stock)</option>
                  <option value="Agotado">Agotado</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cafe-700)' }}>Foto del Producto (Opcional)</label>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ padding: '8px', fontSize: '13px' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--blanco)', fontWeight: 600, cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px', borderRadius: '10px' }}>
                  {isSubmitting ? 'Guardando...' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
