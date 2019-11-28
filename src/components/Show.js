import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      solanSun: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('solanSun').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
        solanSun: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('solanSun').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Edit Solan Sunbeds Job</Link></h4>
            <h3 class="panel-title">
              {this.state.solanSun.location}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.solanSun.description}</dd>
              <dt>Equipment:</dt>
              <dd>{this.state.solanSun.equipment}</dd>
              <dt>Date:</dt>
              <dd>{this.state.solanSun.date}</dd>
              <dt>Time:</dt>
              <dd>{this.state.solanSun.time}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger"></button>
          </div>
        </div>
      </div>
    );
  }
}


export default Show;
