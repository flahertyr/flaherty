import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';



class navbar extends React.Component {
  
    render() {
      return (
            <div class="Link">
                  <Link to="/create">
                  <img src="https://img.icons8.com/wired/64/000000/add--v1.png"></img>
                  </Link>
            </div>
        
      );
    }
  }

  export default navbar;