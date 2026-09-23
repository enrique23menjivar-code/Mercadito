'use client'
import { useState, useEffect } from 'react'
import { createClient } from './lib/supabase'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
  }

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <section className="search-section">
        <div className="search-input-wrapper">
          <input 
            type="text" 
            placeholder="¿QUÉ BUSCAS HOY?" 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-brutal">FILTRAR</button>
      </section>

      <section className="product-grid">
        {filteredProducts.map(product => (
          <article key={product.id} className="product-card">
            <div className="product-image-container">
              <span className="product-condition">{product.condition}</span>
              <img 
                src={product.image_url || 'https://via.placeholder.com/400'} 
                alt={product.title}
                className="product-image" 
              />
            </div>
            
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3 className="product-title">{product.title}</h3>
              
              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <button className="btn-buy">COMPRAR</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}