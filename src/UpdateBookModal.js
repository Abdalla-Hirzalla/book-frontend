import { Component } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
class UpdateBookModal extends Component {
    updateSubmitHandler = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const status = event.target.status.value;
        const email = this.props.user.email;
        this.props.closeModal();
        const data = {
            title: title,
            description: description,
            status: status,
            email: email
        }
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/books/${this.props.index}`, data)
            .then(result => {

                this.props.updateBook(result.data);

            }
            )

            .catch((err) => {
                console.log(err);

            });



    }
    render() {
        return (<>

            <Modal
                show={this.props.showUpdateForm}
                onHide={() => this.props.closeModal()}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Update Book
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.updateSubmitHandler}>
                        <Form.Group>
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="text" name="title" defaultValue={this.props.title} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Book Description</Form.Label>
                            <Form.Control as="textarea" name="description" defaultValue={this.props.description} />
                        </Form.Group>

                        <Form.Control as="select" name="status" defaultValue={this.props.status}>
                            <option value="recomended">RECOMENDED TO ME</option>
                            <option value="top five" >TOP FIVE</option>
                            <option value="favorite one" >FAVORITE ONE</option>
                        </Form.Control>
                        <Button type="submit">Add</Button>
                    </Form>
                </Modal.Body>
            </Modal>


        </>)



    }







}
export default withAuth0(UpdateBookModal);