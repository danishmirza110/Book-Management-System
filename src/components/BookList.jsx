import React from 'react'
import BookCard from './BookCard'

function SkeletonCard() {
  return (
    <div className="col">
      <div className="card border-0 shadow-sm h-100" style={{ overflow: 'hidden' }}>
        <div className="skeleton" style={{ height: 110 }}></div>
        <div className="card-body p-3">
          <div className="skeleton rounded mb-2" style={{ height: 16, width: '80%' }}></div>
          <div className="skeleton rounded mb-3" style={{ height: 13, width: '55%' }}></div>
          <div className="d-flex justify-content-between">
            <div className="skeleton rounded" style={{ height: 22, width: 70 }}></div>
            <div className="skeleton rounded" style={{ height: 22, width: 45 }}></div>
          </div>
        </div>
        <div className="card-footer bg-transparent border-0 px-3 pb-3 pt-0 d-flex gap-2">
          <div className="skeleton rounded flex-fill" style={{ height: 30 }}></div>
          <div className="skeleton rounded flex-fill" style={{ height: 30 }}></div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ search, genre, onClear }) {
  const isFiltered = search || (genre && genre !== 'All Genres')
  return (
    <div className="col-12 text-center py-5">
      <div className="empty-state mx-auto">
        <div className="empty-icon mb-3">
          <i className={`bi ${isFiltered ? 'bi-search' : 'bi-book'}`}></i>
        </div>
        <h5 className="fw-semibold text-dark mb-1">
          {isFiltered ? 'No books found' : 'Your shelf is empty'}
        </h5>
        <p className="text-muted small mb-3">
          {isFiltered
            ? `No books match "${search || genre}". Try adjusting your search.`
            : 'Add your first book to get started!'}
        </p>
        {isFiltered && (
          <button className="btn btn-outline-secondary btn-sm" onClick={onClear}>
            <i className="bi bi-x-circle me-1"></i>Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default function BookList({ books, loading, search, genre, onEdit, onDelete, onClearFilters }) {
  return (
    <div className="container-xl py-4">
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">

        {loading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : books.length === 0
            ? <EmptyState search={search} genre={genre} onClear={onClearFilters} />
            : books.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
        }

      </div>
    </div>
  )
}
