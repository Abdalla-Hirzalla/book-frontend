import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import React, { Component } from 'react';
// import { Card } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Container } from 'react-bootstrap';
import { Button } from 'bootstrap';
import RenderNewBook from './RenderNewBook';
import AddBookModal from './AddBookModal';

class BestBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      errMsg: '',
      showForm: false,
    };
  }

  componentDidMount() {
    const { user } = this.props.auth0;
    const url = `http://localhost:3001/books?email=${user.email}`;
    console.log(user.email);

    axios
      .get(url)
      .then(result => {
        const data = result.data;
        console.log(result.data);
        this.setState({
          bookData: data,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errMsg: err.message
        })
      });
  }

  showBookForm = () => {
    this.setState({
      showForm: true
    });
  };

  closeModal = () => {
    this.setState({
      showForm: false

    });
  };


  addNewBook = (book) => {
    const newBookArr = this.state.bookData;
    newBookArr.push(book);
    this.setState({
      bookData: newBookArr
    });
  }

  deleteBook = (id) => {
    const { user } = this.props.auth0
    const data = {
      email: user.email
    };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/books/${id}`, { params: data })
      .then(result => {
        this.setState({
          bookData: result.data
        });
      })
      .catch(err => { console.log('error'); });

  }






  render() {
    return (<>
      <Button onClick={this.showBookForm}>Add new Book</Button>
      {this.state.showForm && <AddBookModal showForm={this.state.showForm} closeModal={this.closeModal} addNewBook={this.addNewBook} />}
      {
        <Container>
          {
            this.state.bookData.map((item, index) => <RenderNewBook deleteBook={this.deleteBook} index={index} title={item.title} description={item.description} status={item.status}></RenderNewBook>)

          }
        </Container>
      }
    </>

    );
  }
}
export default withAuth0(BestBooks);
