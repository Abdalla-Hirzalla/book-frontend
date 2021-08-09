import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';


// // class MyFavoriteBooks extends React.Component {
// //   render() {
// //     return(
// //       <Jumbotron>
// //         <h1>My Favorite Books</h1>
// //         <p>
// //           This is a collection of my favorite books
// //         </p>
// //       </Jumbotron>
// //     )
// //   }
// // }

// // export default MyFavoriteBooks;







class MyFavoriteBooks extends React.Component {

  //  TODO: get a list of cats from the backend
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBooks: false,
      server: process.env.REACT_APP_SERVER_URL
    }
  }

  getBooks = async (event) => {
    event.preventDefault();
    try {
      const paramsObj = {
        name: event.target.ownerName.value
      }
      const books = await axios.get(`${this.state.server}/book`, { params: paramsObj });

      this.setState({
        books: books.data,
        showBooks: true
      });
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <>
        <div>
          <Form
            updateName={this.updateName}
            getBooks={this.getBooks}
          />
         
        </div>
      </>
    )
  }
}

export default MyFavoriteBooks;


