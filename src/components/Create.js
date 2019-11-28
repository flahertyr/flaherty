import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('solanSun');
    this.state = {
      location: '',
      description: '',
      equipment: '',
      date: '',
      time: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { location, description, equipment, date, time  } = this.state;

    this.ref.add({
    location,
      description,
      equipment,
      date,
      time
    }).then((docRef) => {
      this.setState({
        location: '',
      description: '',
      equipment: '',
      date: '',
      time: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { location, description, equipment, date, time } = this.state;
    return (
        <div>
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD JOB
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Job Details</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="location">Location:</label>
                <textArea class="form-control" name="location" onChange={this.onChange} placeholder="Location" cols="80" rows="1">{location}</textArea>
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="equipment">Equipment:</label>
                <textArea class="form-control" name="equipment" onChange={this.onChange} placeholder="Equipment" cols="80" rows="1">{equipment}</textArea>
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <textArea class="form-control" name="date" onChange={this.onChange} placeholder="Date" cols="80" rows="1">{date}</textArea>
              </div>
              <div class="form-group">
                <label for="time">Time:</label>
                <textArea class="form-control" name="time" onChange={this.onChange} placeholder="Time" cols="80" rows="1">{time}</textArea>
              </div>
              <button type="submit" class="btn btn-success"><Link to="/create">Submit</Link></button>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Create;
