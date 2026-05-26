import React from 'react'

// Genre → colour mapping
const GENRE_COLORS = {
  'Classic':    { bg: '#fff3cd', text: '#856404', border: '#ffc107' },
  'Sci-Fi':     { bg: '#cff4fc', text: '#055160', border: '#0dcaf0' },
  'Fantasy':    { bg: '#e8d5ff', text: '#6f42c1', border: '#a56cd6' },
  'Fiction':    { bg: '#d1e7dd', text: '#0a3622', border: '#198754' },
  'Dystopian':  { bg: '#f8d7da', text: '#58151c', border: '#dc3545' },
  'Mystery':    { bg: '#e2e3e5', text: '#41464b', border: '#6c757d' },
  'Thriller':   { bg: '#f8d7da', text: '#58151c', border: '#dc3545' },
  'Romance':    { bg: '#fce4ec', text: '#880e4f', border: '#e91e63' },
  'Non-Fiction':{ bg: '#e3f2fd', text: '#0d47a1', border: '#1976d2' },
  'Biography':  { bg: '#fff8e1', text: '#e65100', border: '#ff9800' },
  'History':    { bg: '#efebe9', text: '#4e342e', border: '#795548' },
  'Self-Help':  { bg: '#e8f5e9', text: '#1b5e20', border: '#43a047' },
}

function getGenreStyle(genre) {
  return GENRE_COLORS[genre] || { bg: '#f1f3f5', text: '#495057', border: '#adb5bd' }
}

function getCoverGradient(title) {
  const palettes = [
    ['#667eea', '#764ba2'], ['#f093fb', '#f5576c'], ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'], ['#fa709a', '#fee140'], ['#a18cd1', '#fbc2eb'],
    ['#ffecd2', '#fcb69f'], ['#a1c4fd', '#c2e9fb'], ['#fd7043', '#ffca28'],
    ['#00c6fb', '#005bea'], ['#f77062', '#fe5196'], ['#2af598', '#009efd'],
  ]
  let hash = 0
  for (let i = 0; i < title.length; i++) hash = (hash << 5) - hash + title.charCodeAt(i)
  return palettes[Math.abs(hash) % palettes.length]
}

export default function BookCard({ book, onEdit, onDelete }) {
  const [c1, c2] = getCoverGradient(book.title)
  const genreStyle = getGenreStyle(book.genre)
  const initial = book.title.charAt(0).toUpperCase()

  return (
    <div className="col">
      <div className="card book-card h-100 border-0 shadow-sm">

        {/* Cover spine */}
        <div className="book-cover" style={{ background: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)` }}>
          <span className="cover-initial">{initial}</span>
          <div className="cover-lines">
            <div></div><div></div><div></div>
          </div>
        </div>

        {/* Card body */}
        <div className="card-body d-flex flex-column p-3">
          <h6 className="card-title fw-bold mb-1 text-truncate" title={book.title}>{book.title}</h6>
          <p className="text-muted small mb-2 text-truncate" title={book.author}>
            <i className="bi bi-person me-1"></i>{book.author}
          </p>

          <div className="d-flex align-items-center justify-content-between mt-auto pt-2">
            {/* Genre badge */}
            <span className="badge genre-badge" style={{
              background: genreStyle.bg, color: genreStyle.text,
              border: `1px solid ${genreStyle.border}`, fontSize: '0.7rem', fontWeight: 600
            }}>
              {book.genre || 'Unknown'}
            </span>

            {/* Year */}
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              <i className="bi bi-calendar3 me-1"></i>{book.year}
            </span>
          </div>
        </div>

      {/* Footer */}
        <div className="card-footer bg-transparent border-0 px-3 pb-3 pt-0 d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary flex-fill"
            onClick={() => onEdit(book)}
            title="Edit book">
            <i className="bi bi-pencil me-1"></i>Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger flex-fill"
            onClick={() => onDelete(book)}
            title="Delete book">
            <i className="bi bi-trash me-1"></i>Delete
          </button>
        </div>

      </div>
    </div>
  )
}
