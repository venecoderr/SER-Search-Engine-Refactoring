import { createContext, useContext } from 'react';
import { useMutation } from '@apollo/client'
import * as mutations from './Mutations'

const APIContext = createContext()

export const useAPIContext = () => useContext(APIContext)

export const APIProvider = ({ children }) => {
  const [ createUser, { createUserError } ] = useMutation(mutations.CREATE_USER)
  const [ loginUser, { loginUserError } ] = useMutation(mutations.LOGIN_USER)
  const [ saveBook, { saveBookError } ] = useMutation(mutations.SAVE_BOOK)
  const [ deleteBook, { deleteBookError } ] = useMutation(mutations.DELETE_BOOK)

  // make a search to google books api
  // https://www.googleapis.com/books/v1/volumes?q=harry+potter
  const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };

  const context ={
    createUser, createUserError,
    loginUser, loginUserError,
    saveBook, saveBookError,
    deleteBook, deleteBookError,
    searchGoogleBooks
  }

  return (
    <APIContext.Provider value={context}>
      {children}
    </APIContext.Provider>
  );
}