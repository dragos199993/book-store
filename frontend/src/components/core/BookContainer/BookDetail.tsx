import React, { Component, ReactNode } from 'react';
import { Button, Card, Col, Row } from "reactstrap";
import { graphql } from "react-apollo";
import { getBookDetailQuery } from "../../../queries/queries";

interface IBookDetailProps {
  showList: () => void;
  detailBookId: null | string;
  data: any;
}

class BookDetail extends Component<IBookDetailProps> {
  render(): ReactNode{
    const { data, data: { book } }=this.props;
    if(data.loading) {
      return 'Loading detail ...';
    }
    return (
      <Row>
        <Card className="w-100 h-100 pb-5 px-4">
          <Col md={ { size: 6, offset: 6 } } className="text-right mt-4">
            <Button onClick={ this.props.showList }>Go back</Button>
          </Col>

          <h5 className="text-center">{ book.name }</h5>
          <small className="text-center">by <b>{ book.author.name }</b></small>
          <p className="pt-3">The genre of this book is { book.genre }.</p>
          <p>{ book.description }</p>
        </Card>
      </Row>
    );
  }
}

export default graphql<any>(getBookDetailQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.detailBookId
      }
    }
  }
})(BookDetail);