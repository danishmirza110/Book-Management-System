import React from 'react'
import { isDemoMode } from '../services/bookApi'

export default function Navbar({ totalBooks }) {
  return (
    <nav className="navbar navbar-dark sticky-top shadow-sm" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <div className="container-xl">
        
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold" href="#">
          <span className="brand-icon d-flex align-items-center justify-content-center rounded-3"
            style={{ width: 36, height: 36, background: 'rgba(229,160,13,0.18)', border: '1.5px solid rgba(229,160,13,0.45)' }}>
            <i className="bi bi-book-half" style={{ color: '#e5a00d', fontSize: '1.1rem' }}></i>
          </span>
          <span style={{ letterSpacing: '0.5px', fontSize: '1.2rem' }}>
            Book<span style={{ color: '#e5a00d' }}>Shelf</span>
          </span>
        </a>


        <span className="badge rounded-pill d-none d-sm-inline-flex align-items-center gap-1"
          style={{ background: 'rgba(229,160,13,0.15)', border: '1px solid rgba(229,160,13,0.35)', color: '#e5a00d', fontSize: '0.78rem', padding: '5px 12px' }}>
          <i className="bi bi-collection"></i>
          {totalBooks} {totalBooks === 1 ? 'Book' : 'Books'}
        </span>

        {isDemoMode() && (
          <span className="badge d-flex align-items-center gap-1"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', fontSize: '0.72rem', padding: '5px 10px', borderRadius: 20 }}>
            <i className="bi bi-lightning-charge-fill"></i> Demo Mode
          </span>
        )}
      </div>
    </nav>
  )
}
