import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class userList extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('solanSun');
    this.unsubscribe = null;
    this.state = {
      solanSun: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const solanSun = [];
    querySnapshot.forEach((doc) => {
      const { location, description, equipment, date, time } = doc.data();
      solanSun.push({
        key: doc.id,
        doc, // DocumentSnapshot
        location,
        description,
        equipment,
        date,
        time
      });
    });
    this.setState({
      solanSun
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
        <div>
      <div class="container">
        <div class="panel panel-default">
       
          <div class="panel-heading">
          <div class="Link">
            <h4><Link to="/create"></Link></h4>
            </div>
            <h3 class="panel-title">
              Solan Sunbed Pending Jobs
            </h3>
          </div>
            <div class="table">
            <table>
              <thead class="table-stripe">
                <tr>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Equipment</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              
              <tbody class="table-stripe2">
                {this.state.solanSun.map(solanSunV =>
                  <tr>
                    <td><Link to={`/show/${solanSunV.key}`}>{solanSunV.location}</Link></td>
                    <td>{solanSunV.description}</td>
                    <td>{solanSunV.equipment}</td>
                    <td>{solanSunV.date}</td>
                    <td>{solanSunV.time}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    );
  }
}


export default userList;
