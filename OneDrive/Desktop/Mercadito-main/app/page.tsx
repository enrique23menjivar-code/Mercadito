'use client'; // Necesario en Next.js para usar interactividad y estados

import { useState, useEffect } from 'react';

// 1. Base de Datos Simulada (Productos actuales + improvisados)
const productosMock = [
    { id: 1, nombre: 'Sándwich Clásico', precio: '$3.50', imagen: 'https://placehold.co/400x300/E2E8F0/888888?text=Sandwich' },
    { id: 2, nombre: 'Jugo Natural', precio: '$2.00', imagen: 'https://placehold.co/400x300/E2E8F0/888888?text=Jugo' },
    { id: 3, nombre: 'Gomitas Dulces', precio: '$1.25', imagen: 'https://placehold.co/400x300/E2E8F0/888888?text=Gomitas' },
    { id: 4, nombre: 'Dulces Mexicanos', precio: '$1.50', imagen: 'https://placehold.co/400x300/E2E8F0/888888?text=Dulces+MX' },
    { id: 5, nombre: 'Producto Sorpresa 1', precio: '$2.75', imagen: 'https://placehold.co/400x300/E2E8F0/888888?text=Improvisado+1' },
    { id: 6, nombre: 'Producto Sorpresa 2', precio: '$4.00', imagen: 'https://placehold.co/400x300/E2E8F0/888888?text=Improvisado+2' }
];

export default function Home() {
    const [productos, setProductos] = useState<any[]>([]);

    // 2. Cargar los productos al iniciar la página
    useEffect(() => {
        async function cargarProductos() {
            try {
                // Cuando tu backend (Supabase/API) esté listo, reemplazarás esta línea:
                // const { data } = await supabase.from('productos').select('*');
                // setProductos(data);

                // Por ahora, usamos el mock:
                setProductos(productosMock);
            } catch (error) {
                console.error("Error al cargar la base de datos:", error);
            }
        }
        cargarProductos();
    }, []);

    // 3. Función para agregar al carrito
    const agregarAlCarrito = (id: number) => {
        console.log('Producto agregado al carrito con ID:', id);
    };

    return (
        <>
            {/* Filtro SVG oculto para el efecto Gooey */}
            <svg className="gooey-filter" width="0" height="0">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                    </filter>
                </defs>
            </svg>

            <header className="page-header">
                <h1>MERCADITO</h1>
                <p>Simple, fresco y a tu alcance.</p>
            </header>

            <main className="product-grid">
                {productos.map((producto) => (
                    <div key={producto.id} className="product-card">
                        {/* Usamos etiqueta img normal por simplicidad con placehold.co */}
                        <img src={producto.imagen} alt={producto.nombre} />
                        <h2 className="product-name">{producto.nombre}</h2>
                        <p className="product-price">{producto.precio}</p>
                        <div className="btn-container">
                            <button 
                                className="btn-comprar" 
                                onClick={() => agregarAlCarrito(producto.id)}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
}