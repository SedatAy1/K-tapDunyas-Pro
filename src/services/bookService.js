import api from './axios'


export const getBooks = () => api.get('/books')


export const createBook = (book) => api.post('/books', book)


export const deleteBook = (id) => api.delete(`/books/${id}`)

export const updateBook = (id, updatedData) => api.put(`/books/${id}`, updatedData)

export const getBookById = (id) => api.get(`/books/${id}`)