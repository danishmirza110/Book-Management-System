import React, { useState, useMemo, useCallback } from 'react'
import Navbar from './components/Navbar'
import SearchFilter from './components/SearchFilter'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import Toast from './components/Toast'
import { useBooks } from './hooks/useBooks'
import { isDemoMode } from './services/bookApi'

export default function App() {

  const { books, loading, error, toast, addBook, editBook, removeBook } = useBooks()


  const [search, setSearch] = useState('')
  const [genre, setGenre]   = useState('All Genres')



  const [formOpen, setFormOpen]       = useState(false)
  const [editTarget, setEditTarget]   = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving]           = useState(false)
  const [deleting, setDeleting]       = useState(false)


  const filteredBooks = useMemo(() => {
    const q = search.toLowerCase().trim()
    return books.filter(b => {
      const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      const matchGenre  = genre === 'All Genres' || b.genre === genre
      return matchSearch && matchGenre
    })
  }, [books, search, genre])


  const openAdd  = useCallback(() => { setEditTarget(null); setFormOpen(true) }, [])
  const openEdit = useCallback((book) => { setEditTarget(book); setFormOpen(true) }, [])
  const closeForm = useCallback(() => { setFormOpen(false); setEditTarget(null) }, [])

  const handleSave = useCallback(async (data) => {
    setSaving(true)
    const ok = editTarget
      ? await editBook(editTarget.id, data)
      : await addBook(data)
    setSaving(false)
    return ok
  }, [editTarget, addBook, editBook])

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return
    setDeleting(true)
    await removeBook(deleteTarget.id, deleteTarget.title)
    setDeleting(false)
    setDeleteTarget(null)
  }, [deleteTarget, removeBook])

  const clearFilters = useCallback(() => { setSearch(''); setGenre('All Genres') }, [])

  return (
    <div className="app-root">
      <Navbar totalBooks={books.length} />

      {/* Demo mode for app using  */}
      {isDemoMode() && (
        <div className="alert alert-info border-0 rounded-0 mb-0 py-2 text-center small" style={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5', borderBottom: '1px solid rgba(99,102,241,0.2) !important' }}>
          <i className="bi bi-lightning-charge me-1"></i>
          <strong>Demo Mode</strong> — data lives in memory and resets on refresh.
          Set <code className="mx-1">VITE_API_URL</code> in <code>.env</code> to connect a real MockAPI endpoint.
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="container-xl pt-3">
          <div className="alert alert-danger d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill"></i>
            {error}
          </div>
        </div>
      )}

      <SearchFilter
        search={search}
        genre={genre}
        onSearchChange={setSearch}
        onGenreChange={setGenre}
        onAddClick={openAdd}
        resultCount={filteredBooks.length}
      />

      <BookList
        books={filteredBooks}
        loading={loading}
        search={search}
        genre={genre}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
        onClearFilters={clearFilters}
      />

      <BookForm
        show={formOpen}
        editBook={editTarget}
        onSave={handleSave}
        onClose={closeForm}
        saving={saving}
      />

      <DeleteConfirmModal
        book={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        deleting={deleting}
      />

      <Toast toast={toast} />

      {/* Footer */}

      <footer className="app-footer text-center py-4 mt-2">
        <small className="text-muted">
          Book Manager &copy; {new Date().getFullYear()} &nbsp;·&nbsp;
          Built by Mirza Danish Baig
        </small>
      </footer>
    </div>
  )
}
