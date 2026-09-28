import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { ShoppingCart, User } from 'lucide-react'

export const metadata = {
  title: 'Mercadito U | Brutal',
  description: 'Compra y vende ropa e insumos en tu Universidad',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav className="navbar">
          <div className="nav-brand">Mercadito</div>
          <div className="nav-links">
            <button>
              <ShoppingCart size={24} color="#111" />
            </button>
            <button>
              <User size={24} color="#111" />
            </button>
          </div>
        </nav>
        
        <main className="main-container">
          {children}
        </main>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
    </html>
  )
}