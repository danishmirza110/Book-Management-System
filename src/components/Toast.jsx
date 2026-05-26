import React from 'react'

export default function Toast({ toast }) {
  if (!toast) return null

  const icons = { success: 'bi-check-circle-fill', danger: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill' }

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div className={`toast-custom toast-${toast.type} show`} role="alert">
        <i className={`bi ${icons[toast.type] || icons.success} me-2`}></i>
        {toast.message}
      </div>
    </div>
  )
}
