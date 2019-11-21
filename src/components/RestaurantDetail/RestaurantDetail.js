import React, { Component } from "react";
import "./RestaurantDetail.css";
import "../Backdrop/Backdrop";
import Form from "../../stories/Forms/Forms";
import Review from "../../components/Review/Review";
const axios = require("axios");

const reviewsUrl = "https://dc-100-restaurants-db.herokuapp.com/reviews";

class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReviews: false,
      loading: true
    };
  }

  getReviews = async () => {
    const res = await axios.get(reviewsUrl);
    console.log(res);
    return res.data.map(({ _id, restaurantId, name, rating, review }) => {
      return {
        id: _id,
        restReviewId: restaurantId,
        reviewName: name,
        reviewRating: rating,
        reviewContent: review
      };
    });
  };

  start = async () => {
    const allReviews = await this.getReviews();
    this.setState({ loading: false });
    return allReviews;
  };

  render() {
    let reviews = {};
    reviews = this.start();
    console.log(reviews);
    console.log(this.props.currentData);
    if (this.state.loading)
      return (
        <div className="rest-detail-box-container">
          <div
            className="detail-overlay"
            onMouseDown={() => this.props.closeClickedRestaurantDetails(true)}
          ></div>
          <div className="rest-detail-container">
            <div className="rest-image-container">
              <img
                className="rest-image-picture"
                src={this.props.currentData.data.imageUrl}
                alt="whoops"
              />
            </div>
            <div className="rest-details-data">
              <h1 className="rest-data-name">
                {this.props.currentData.data.name}
              </h1>
              <h3 className="rest-data-location">
                {`${this.props.currentData.data.location.address}, 
                ${this.props.currentData.data.location.city}`}
              </h3>
              <h3>Categories:</h3>
              {this.props.currentData.data.categories.map(item => {
                return <h3>{item}</h3>;
              })}
              <a href={this.props.currentData.data.yelpUrl}>Yelp Url</a>
              <h4>Phone Number: {this.props.currentData.data.phone}</h4>
              <h5>Rating: {this.props.currentData.data.rating}</h5>
              <Form type="comment" name="name" label="Name" comment />
              {reviews.length >= 1 ? <h1>HI</h1> : <h1>NO</h1>}
              <h1>REVIEWS WILL HOPEFULLY GO DOWN HERE</h1>
              <div className="reviews-total-container">
                <Review />
              </div>
            </div>
          </div>
        </div>
      );
  }
}
export default RestaurantDetail;
