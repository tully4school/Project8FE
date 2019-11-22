import React, { Component } from "react";
import Form from "../../stories/Forms/Forms";
import "./CreateReview.css";

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: this.props.data,
      name: "",
      review: "",
      rating: 0
    };
  }
  getReviewData = data => {
    this.setState({ currentData: data });
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.name);
  };

  render() {
    return (
      <Form
        type="comment"
        name={this.state.name}
        label="Name"
        comment
        getReviewData={this.getReviewData.bind(this)}
        changeHandler={this.changeHandler.bind(this)}
      />
    );
  }
}

export default CreateReview;
