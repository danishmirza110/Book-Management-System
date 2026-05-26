import React from 'react'

const GENRES = ['All Genres', 'Classic', 'Sci-Fi', 'Fantasy', 'Fiction', 'Dystopian',
  'Mystery', 'Thriller', 'Romance', 'Non-Fiction', 'Biography', 'History', 'Self-Help', 'Other']

export default function SearchFilter({ search, genre, onSearchChange, onGenreChange, onAddClick, resultCount }) {
  return (
    <div className="search-filter-bar py-3">
      <div className="container-xl">
        <div className="row g-2 align-items-center">

          
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text border-0 bg-white" style={{ borderRadius: '10px 0 0 10px' }}>
                <i className="bi bi-search text-secondary"></i>
              </span>
              <input
                type="text"
                className="form-control border-0 ps-0 shadow-none"
                placeholder="Search by title or author…"
                value={search}
                onChange={e => onSearchChange(e.target.value)}
                style={{ borderRadius: '0 10px 10px 0', background: 'white' }}
              />
              {search && (
                <button className="btn btn-link text-secondary p-0 pe-2" onClick={() => onSearchChange('')}
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 5 }}>
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </div>
          </div>



          <div className="col-6 col-md-3">
            <select
              className="form-select border-0 shadow-none"
              value={genre}
              onChange={e => onGenreChange(e.target.value)}
              style={{ borderRadius: 10, background: 'white', cursor: 'pointer' }}>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>


          <div className="col-6 col-md-2 d-flex align-items-center">
            <small className="text-muted">
              <i className="bi bi-filter me-1"></i>
              <strong>{resultCount}</strong> {resultCount === 1 ? 'result' : 'results'}
            </small>
          </div>




          <div className="col-12 col-md-2 d-flex justify-content-md-end">
            <button className="btn btn-add w-100" onClick={onAddClick}>
              <i className="bi bi-plus-lg me-1"></i> Add Book
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
