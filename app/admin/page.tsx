'use client'
import { useState } from 'react'
import { createClient } from './../lib/supabase'

export default function AdminPanel() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) {
      alert('¡Debes seleccionar una foto!')
      return
    }
    
    setLoading(true)
    
    // 1. Crear un nombre único para la foto y subirla a Storage
    const fileExt = image.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, image)

    if (uploadError) {
      alert('Error subiendo la foto: ' + uploadError.message)
      setLoading(false)
      return
    }

    // 2. Obtener el link público de la foto recién subida
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)
    
    // 3. Guardar el producto en la tabla con su link de imagen
    const { error: dbError } = await supabase.from('products').insert([
      { 
        title, 
        price: parseFloat(price), 
        category: 'General', 
        condition: 'Nuevo',
        image_url: publicUrl 
      }
    ])
    
    setLoading(false)
    if (dbError) {
      alert('Error de base de datos: ' + dbError.message)
    } else {
      alert('¡Producto agregado con foto exitosamente!')
      setTitle('')
      setPrice('')
      setImage(null)
    }
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">SUBIR PRODUCTO</h2>
      <form onSubmit={handleAddProduct}>
        <div className="form-group">
          <label>TÍTULO DEL PRODUCTO</label>
          <input 
            type="text" 
            required 
            className="search-input" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>PRECIO ($)</label>
          <input 
            type="number" 
            required 
            className="search-input" 
            value={price} 
            onChange={e => setPrice(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>FOTO DEL PRODUCTO</label>
          <input 
            type="file" 
            accept="image/*" 
            required 
            className="search-input" 
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0])
              }
            }} 
            style={{ padding: '0.8rem' }}
          />
        </div>
        <button type="submit" disabled={loading} className="btn-brutal w-full">
          {loading ? 'PROCESANDO...' : 'PUBLICAR PRODUCTO'}
        </button>
      </form>
    </div>
  )
}