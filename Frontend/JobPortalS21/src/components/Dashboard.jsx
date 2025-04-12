import { Component } from 'react';
import './dashboard.css';
import { getSession, setSession } from '../api';
import MenuBar from './MenuBar';
import JobPosting from './JobPosting';
import JobSearch from './JobSearch';
import Profile from './Profile';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      activeComponent: null
    };
    this.loadComponent = this.loadComponent.bind(this);
  }

  loadComponent(mid) {
    let components = {
      "1": <JobPosting />,
      "2": <JobSearch />,
      "3": <Profile />
    };
    this.setState({ activeComponent: components[mid] });
  }

  componentDidMount() {
    const token = getSession("csrid");
    if (!token) {
      window.location.replace("/");
      return;
    }

    fetch('http://localhost:8080/users/getfullname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ csrid: token })
    })
    .then(response => response.text())
    .then(data => {
      if (data.startsWith("401")) {
        window.location.replace("/");
      } else {
        this.setState({ fullname: data });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      window.location.replace("/");
    });
  }

  logout = () => {
    setSession("csrid", "", -1);
    window.location.replace("/");
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='header'>
          <img className='logo' src='./images/logo1.png' alt='company logo' />
          <div className='user-section'>
            <label>{this.state.fullname}</label>
            <img 
              className='logout' 
              src='./images/logout.png' 
              alt='logout icon' 
              onClick={this.logout}
            />
          </div>
        </div>
        <div className='menu'>
          <MenuBar onMenuClick={this.loadComponent} />
        </div>
        <div className='outlet'>
          {this.state.activeComponent || <h2>Welcome to Dashboard!</h2>}
        </div>
      </div>
    );
  }
}
