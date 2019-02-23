import React, { Component, ReactNode } from 'react'
import { compose, graphql } from 'react-apollo';
import { Button, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { getBooksQuery, removeBookMutation } from "../../../queries/queries";
import BookAdd from './BookAdd';
import BookDetail from "./BookDetail";


interface IBookContainerProps {
  getBooksQuery: any;
  removeBookMutation: any;
}

interface IBook {
  id: string;
  name: string;
  genre: string;
  author: IAuthor;
}

interface IAuthor {
  name: string;
}

class BookList extends Component<IBookContainerProps> {

  state={
    detailActive: false,
    detailBookId: null
  };

  deleteBook: (id: string) => void=(id) => {
    this.props.removeBookMutation({
      variables: { id },
      refetchQueries: [{ query: getBooksQuery }]
    })
  };

  showDetail: (id: string) => void=(id) => {
    this.setState({ detailActive: true, detailBookId: id })
  };

  showList: () => void=() => {
    this.setState({ detailActive: false })
  }

  displayBooks=() => {
    const { getBooksQuery }=this.props;

    if(getBooksQuery.loading) {
      return <div>Loading ...</div>
    }
    return (
      <>
        <h3>Book list</h3>
        <ListGroup className="books">
          {
            getBooksQuery.books.map((book: IBook) => (
              <ListGroupItem className="my-2 d-flex justify-content-between" key={ book.id }>
                <div className="title">{ book.name }</div>
                <div className="buttons">
                  <Button onClick={ () => this.showDetail(book.id) } color="success" size="sm"
                          className="mx-2">More</Button>
                  <Button onClick={ () => this.deleteBook(book.id) } color="danger" size="sm">x</Button>
                </div>
              </ListGroupItem>
            ))
          }
        </ListGroup>
      </>)
  }

  render(): ReactNode{
    const { detailActive, detailBookId }=this.state;
    return (
      <Row className="pt-4">
        <Col lg="6">
          <BookAdd/>
        </Col>
        <Col lg="6">
          { !detailActive ? this.displayBooks() :
            <BookDetail showList={ this.showList } detailBookId={ detailBookId }/> }
        </Col>
      </Row>
    )
  }
}

export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(removeBookMutation, { name: 'removeBookMutation' })
)(BookList);
