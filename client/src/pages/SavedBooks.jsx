import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery } from '@apollo/client'
import { GET_USER } from '../utils/Queries'
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useAPIContext } from '../utils/API';
import auth from '../utils/auth';

const SavedBooks = () => {
  const user = auth.getProfile()
  const { loading, data, error } = useQuery(GET_USER, {
    variables: {
      id: user.data._id
    }
  })
  
  console.log(data)

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // const handleDeleteBook = async (bookId) => {

  //   try {
  //     const response = await deleteBook({
  //       variables: {
  //         bookId: bookId
  //       }
  //     });

  //     if (!response) {
  //       throw new Error('something went wrong!');
  //     }

  //     setuser(updatedUser);
  //     // upon success, remove book's id from localStorage
  //     removeBookId(bookId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {/* {data.savedBooks.length
            ? `Viewing ${data.savedBooks.length} saved ${data.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'} */}
        </h2>
        <Row>
          {/* {data.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })} */}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
