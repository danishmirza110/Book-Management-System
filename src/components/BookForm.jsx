import React, { useState, useEffect, useRef } from 'react'

const GENRES = ['Classic', 'Sci-Fi', 'Fantasy', 'Fiction', 'Dystopian',
  'Mystery', 'Thriller', 'Romance', 'Non-Fiction', 'Biography', 'History', 'Self-Help', 'Other']

const EMPTY_FORM = { title: '', author: '', genre: 'Fiction', year: new Date().getFullYear() }

function validate(data) {
  const errors = {}
  if (!data.title.trim())              errors.title  = 'Title is required.'
  if (!data.author.trim())             errors.author = 'Author is required.'
  if (!data.genre)                     errors.genre  = 'Please select a genre.'
  const y = Number(data.year)
  if (!data.year || isNaN(y) || y < 1000 || y > new Date().getFullYear())
    errors.year = `Year must be between 1000 and ${new Date().getFullYear()}.`
  return errors
}

export default function BookForm({ show, editBook, onSave, onClose, saving }) {
  const [form, setForm]     = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const titleRef            = useRef(null)
  const isEdit              = Boolean(editBook)

  // Populate form when editing
  useEffect(() => {
    if (show) {
      setForm(editBook ? { title: editBook.title, author: editBook.author,
        genre: editBook.genre || 'Fiction', year: editBook.year } : EMPTY_FORM)
      setErrors({})
      setTimeout(() => titleRef.current?.focus(), 150)
    }
  }, [show, editBook])

  const handleChange = ({ target: { name, value } }) => {
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: undefined }))
  }

  const handleSubmit = async () => {
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    const payload = { ...form, year: Number(form.year) }
    const ok = await onSave(payload)
    if (ok) onClose()
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit() }

  if (!show) return null

  return (
    <>
      <div className="modal-backdrop-custom" onClick={onClose}></div>

      {/* Modal */}
      <div className="modal-custom" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="modal-custom-dialog">

          {/* Header */}
          <div className="modal-custom-header">
            <div className="d-flex align-items-center gap-2">
              <span className="modal-icon">
                <i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-book-fill'}`}></i>
              </span>
              <h5 className="mb-0 fw-bold" id="modalTitle">
                {isEdit ? 'Edit Book' : 'Add New Book'}
              </h5>
            </div>
            <button className="btn-close-custom" onClick={onClose} aria-label="Close">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Body */}
          <div className="modal-custom-body">

            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold small">
                <i className="bi bi-type me-1 text-primary"></i>Book Title <span className="text-danger">*</span>
              </label>
              <input
                ref={titleRef}
                type="text" name="title"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                placeholder="e.g. The Great Gatsby"
                value={form.title}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                maxLength={120}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Author */}
            <div className="mb-3">
              <label className="form-label fw-semibold small">
                <i className="bi bi-person me-1 text-primary"></i>Author <span className="text-danger">*</span>
              </label>
              <input
                type="text" name="author"
                className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                placeholder="e.g. F. Scott Fitzgerald"
                value={form.author}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                maxLength={100}
              />
              {errors.author && <div className="invalid-feedback">{errors.author}</div>}
            </div>


            <div className="row g-3">
              <div className="col-7">
                <label className="form-label fw-semibold small">
                  <i className="bi bi-tag me-1 text-primary"></i>Genre <span className="text-danger">*</span>
                </label>
                <select
                  name="genre"
                  className={`form-select ${errors.genre ? 'is-invalid' : ''}`}
                  value={form.genre}
                  onChange={handleChange}>
                  {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
              </div>

              <div className="col-5">
                <label className="form-label fw-semibold small">
                  <i className="bi bi-calendar3 me-1 text-primary"></i>Year <span className="text-danger">*</span>
                </label>
                <input
                  type="number" name="year"
                  className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                  placeholder="e.g. 1997"
                  value={form.year}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  min="1000"
                  max={new Date().getFullYear()}
                />
                {errors.year && <div className="invalid-feedback">{errors.year}</div>}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="modal-custom-footer">
            <button className="btn btn-outline-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button className="btn btn-primary px-4" onClick={handleSubmit} disabled={saving}>
              {saving
                ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving…</>
                : <><i className={`bi ${isEdit ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>{isEdit ? 'Save Changes' : 'Add Book'}</>
              }
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
