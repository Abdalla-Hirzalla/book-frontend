import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {

      loading: false,
      bookData: [],
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,

    });
    this.getData();
  }
  getData = async () => {
    const { user } = this.props.auth0;
    try {
 
      const url = `${process.env.REACT_APP_SERVER_URL}/books?email=${user.email}`;
      const bookRequest = await axios.get(url);
      this.setState({
        bookData: bookRequest.data[0].books,
        loading: false,
      });

    } catch (err) {
      this.setState({
        loading: false,
      });
    }

  }


  render() {
    return (
      <>
        {this.state.loading ? (
          <>
            
          </>
        ) : (
          <>
            <h2>My Favorite book</h2>
            {this.state.bookData.map((book, idx) =>

              <>
                <Card.Body key={idx}>
                  <Card.Title>book title: {book.name}</Card.Title>
                  <Card.Text>book description: {book.description}</Card.Text>
                  <Card.Text>book status: {book.status}</Card.Text>
                </Card.Body>
              </>


            )}
          </>
        )

        }


      </>
    );
  }
}
export default withAuth0(BestBooks);