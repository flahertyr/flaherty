import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      location: '',
      description: '',
      equipment: '',
      date: '',
      time: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('solanSun').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const solanSun = doc.data();
        this.setState({
          key: doc.id,
          location: solanSun.location,
          description: solanSun.description,
          equipment: solanSun.equipment,
          date: solanSun.date,
          time: solanSun.time
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({solanSun:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { location, description, equipment, date, time } = this.state;

    const updateRef = firebase.firestore().collection('solanSun').doc(this.state.key);
    updateRef.set({
        location,
        description,
        equipment,
        date,
        time
    }).then((docRef) => {
      this.setState({
        key: '',
        location: '',
        description: '',
        equipment: '',
        date: '',
        time: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT JOB
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">JOB LIST</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="Location">Title:</label>
                <input type="text" class="form-control" name="location" value={this.state.location} onChange={this.onChange} placeholder="Location" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{this.state.description}</textArea>
              </div>
              <div class="form-group">
                <label for="equipment">Equipment:</label>
                <input type="text" class="form-control" name="location" value={this.state.equipment} onChange={this.onChange} placeholder="Equipment" />
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="text" class="form-control" name="date" value={this.state.date} onChange={this.onChange} placeholder="Date" />
              </div>
              <div class="form-group">
                <label for="time">Time:</label>
                <input type="text" class="form-control" name="time" value={this.state.time} onChange={this.onChange} placeholder="Time" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
