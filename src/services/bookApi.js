import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || ''

// Demo Data

let demoBooks = [
  { id: '1', title: 'The Great Gatsby',      author: 'F. Scott Fitzgerald', genre: 'Classic',      year: 1925 },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee',          genre: 'Classic',      year: 1960 },
  { id: '3', title: 'Dune',                  author: 'Frank Herbert',       genre: 'Sci-Fi',       year: 1965 },
  { id: '4', title: '1984',                  author: 'George Orwell',       genre: 'Dystopian',    year: 1949 },
  { id: '5', title: 'The Hobbit',            author: 'J.R.R. Tolkien',      genre: 'Fantasy',      year: 1937 },
  { id: '6', title: 'Harry Potter',          author: 'J.K. Rowling',        genre: 'Fantasy',      year: 1997 },
  { id: '7', title: 'The Alchemist',         author: 'Paulo Coelho',        genre: 'Fiction',      year: 1988 },
  { id: '8', title: 'Brave New World',       author: 'Aldous Huxley',       genre: 'Dystopian',    year: 1932 },
]
let demoNextId = 9

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms))

// Demo API

const demo = {
  async getAll()      { await delay(); return [...demoBooks] },
  async getById(id)   { await delay(); return demoBooks.find(b => b.id === String(id)) },
  async create(data)  { await delay(); const book = { ...data, id: String(demoNextId++) }; demoBooks.push(book); return book },
  async update(id, d) { await delay(); demoBooks = demoBooks.map(b => b.id === String(id) ? { ...b, ...d, id: String(id) } : b); return demoBooks.find(b => b.id === String(id)) },
  async remove(id)    { await delay(); demoBooks = demoBooks.filter(b => b.id !== String(id)) },
}


const api = axios.create({ baseURL: API_URL })

// live API
const live = {
  getAll:          ()      => api.get('/').then(r => r.data),
  getById:         (id)    => api.get(`/${id}`).then(r => r.data),
  create:          (data)  => api.post('/', data).then(r => r.data),
  update:          (id, d) => api.put(`/${id}`, d).then(r => r.data),
  remove:          (id)    => api.delete(`/${id}`),
}

const store = API_URL ? live : demo

export const getAllBooks    = ()       => store.getAll()
export const getBookById   = (id)     => store.getById(id)
export const createBook    = (data)   => store.create(data)
export const updateBook    = (id, d)  => store.update(id, d)
export const deleteBook    = (id)     => store.remove(id)
export const isDemoMode    = ()       => !API_URL

export default { getAllBooks, getBookById, createBook, updateBook, deleteBook, isDemoMode }
