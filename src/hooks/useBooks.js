import { useState, useEffect, useCallback } from 'react'
import { getAllBooks, createBook, updateBook, deleteBook } from '../services/bookApi'

export function useBooks() {
  const [books, setBooks]       = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [toast, setToast]       = useState(null)

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllBooks()
      setBooks(data)
    } catch (err) {
      setError('Failed to load books. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBooks() }, [fetchBooks])

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  // For Addition
  const addBook = useCallback(async (bookData) => {
    try {
      const newBook = await createBook(bookData)
      setBooks(prev => [newBook, ...prev])
      showToast('success', `"${newBook.title}" added successfully!`)
      return true
    } catch {
      showToast('danger', 'Failed to add book. Please try again.')
      return false
    }
  }, [])

  // For Edit
  const editBook = useCallback(async (id, bookData) => {
    try {
      const updated = await updateBook(id, bookData)
      setBooks(prev => prev.map(b => b.id === id ? updated : b))
      showToast('success', `"${updated.title}" updated successfully!`)
      return true
    } catch {
      showToast('danger', 'Failed to update book. Please try again.')
      return false
    }
  }, [])

  // For Delete
  const removeBook = useCallback(async (id, title) => {
    try {
      await deleteBook(id)
      setBooks(prev => prev.filter(b => b.id !== id))
      showToast('success', `"${title}" deleted successfully!`)
      return true
    } catch {
      showToast('danger', 'Failed to delete book. Please try again.')
      return false
    }
  }, [])

  return { books, loading, error, toast, fetchBooks, addBook, editBook, removeBook }
}
