import { useQuery, useMutation } from '@apollo/client'
import { GET_USER } from './Queries'
import * as mutations from './Mutations'

// route to get logged in user's info (needs the token)

const getUser = () => useQuery(GET_USER)
const [ createUser, { createUserError } ] = useMutation(mutations.CREATE_USER)
const [ loginUser, { loginUserError } ] = useMutation(mutations.LOGIN_USER)
const [ saveBook, { saveBookError } ] = useMutation(mutations.SAVE_BOOK)
const [ deleteBook, { deleteBookError } ] = useMutation(mutations.DELETE_BOOK)

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

export {
  getUser,
  createUser, createUserError,
  loginUser, loginUserError,
  saveBook, saveBookError,
  deleteBook, deleteBookError,
  searchGoogleBooks
}