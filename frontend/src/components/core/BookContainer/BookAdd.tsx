import React, { Component, ReactNode } from 'react'
import { compose, graphql } from 'react-apollo';
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { addBookMutation, getAuthorsQuery, getBooksQuery } from "../../../queries/queries";


class BookAdd extends Component<any> {
  state={
    bookName: '',
    genre: '',
    authorId: '',
    description: '',
    error: ''
  }
  displayAuthors=() => {
    const { getAuthorsQuery }=this.props;
    if(getAuthorsQuery.loading) {
      return <option disabled={ true }>Loading authors...</option>
    }
    return getAuthorsQuery.authors.map((author: any) => (
      <option key={ author.id } value={ author.id }>{ author.name }</option>
    ));
  }

  addAuthor=(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { bookName, genre, description, authorId }=this.state;
    const { addBookMutation }=this.props;

    if(!bookName || !genre || !description || !authorId) {
      this.setState({ error: 'All fields are required' })
      return
    }
    addBookMutation({
      variables: {
        name: bookName,
        genre,
        description,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({ bookName: '', genre: '', description: '', id: '', error: '' });
  }
  handleChange=(e: { target: { name: any; value: any; }; }) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render(): ReactNode{
    const { bookName, genre, description, error }=this.state;
    return (
      <>
        <h3>Add new book</h3>
        <Form onSubmit={ this.addAuthor }>
          { error && <Alert color="danger"> { error } </Alert> }
          <FormGroup className="field">
            <Label>Book name:</Label>
            <Input onChange={ this.handleChange } value={ bookName } name="bookName" type="text"/>
          </FormGroup>

          <FormGroup className="field">
            <Label>Genre:</Label>
            <Input onChange={ this.handleChange } value={ genre } name="genre" type="text"/>
          </FormGroup>

          <FormGroup className="field">
            <Label>Author:</Label>
            <Input type="select" onChange={ this.handleChange } name="authorId">
              <option>Select an author</option>
              { this.displayAuthors() }
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Description:</Label>
            <Input onChange={ this.handleChange } value={ description } type="textarea" name="description"/>
          </FormGroup>
          <Button>Add book</Button>
        </Form>
      </>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(BookAdd);