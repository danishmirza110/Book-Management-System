import React from 'react'

export default function DeleteConfirmModal({ book, onConfirm, onCancel, deleting }) {
  if (!book) return null

  return (
    <>
      <div className="modal-backdrop-custom" onClick={onCancel}></div>
      <div className="modal-custom" role="dialog" aria-modal="true">
        <div className="modal-custom-dialog" style={{ maxWidth: 420 }}>

          <div className="modal-custom-header">
            <div className="d-flex align-items-center gap-2">
              <span className="modal-icon" style={{ background: 'rgba(220,53,69,0.12)', color: '#dc3545' }}>
                <i className="bi bi-trash3-fill"></i>
              </span>
              <h5 className="mb-0 fw-bold">Delete Book</h5>
            </div>
            <button className="btn-close-custom" onClick={onCancel}><i className="bi bi-x-lg"></i></button>
          </div>

          <div className="modal-custom-body text-center py-4">
            <p className="text-muted mb-1">You are about to delete</p>
            <p className="fw-bold fs-5 mb-1">"{book.title}"</p>
            <p className="text-muted small">by {book.author}</p>
            <p className="text-danger small mt-3 mb-0">
              <i className="bi bi-exclamation-triangle me-1"></i>
              This action cannot be undone.
            </p>
          </div>

          <div className="modal-custom-footer">
            <button className="btn btn-outline-secondary" onClick={onCancel} disabled={deleting}>
              Cancel
            </button>
            <button className="btn btn-danger px-4" onClick={onConfirm} disabled={deleting}>
              {deleting
                ? <><span className="spinner-border spinner-border-sm me-2"></span>Deleting…</>
                : <><i className="bi bi-trash me-1"></i>Yes, Delete</>
              }
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
