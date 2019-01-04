import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from "reactstrap";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: "static"
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  deleteConfirmed = () => {
    this.props.yesDeleteFeedback();
  };
  deleteCancelled = () => {
    this.props.deleteCancelled();
  };
  render() {
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()} />
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>Delete Feedback?</ModalHeader>
          <ModalBody>Are you sure?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteConfirmed}>
              Yes, Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.deleteCancelled}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
