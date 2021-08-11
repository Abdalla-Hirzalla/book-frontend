import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import React, { Component } from 'react';
// import { Card } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel'
import { Container } from 'react-bootstrap';

class BestBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      errMsg: '',
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



  render() {
    return (<>
      {this.state.bookData.length ? (<Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={this.state.bookData[0].image}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{coler :'orang'}}>{this.state.bookData[0].title}</h3>
            <p style={{coler :'orang'}}>{this.state.bookData[0].description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={this.state.bookData[1].image}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 style={{coler :'orang'}}>{this.state.bookData[1].title}</h3>
            <p style={{coler :'orang'}}>{this.state.bookData[1].description}</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={this.state.bookData[2].image}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 style={{coler :'orang'}}>{this.state.bookData[2].title}</h3>
            <p style={{coler :'orang'}}>{this.state.bookData[2].description}</p>
          </Carousel.Caption>
        </Carousel.Item>


      </Carousel>) : 'No favorite Books'

      }




    </>

    );
  }
}
export default withAuth0(BestBooks);
