import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import About from './components/pages/About';
import Alert from './components/layout/Alert';

class App extends Component  {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //  this.setState({loading: true});

  //   const res = await axios.get(`https://api.github.com/users?client_id=${
  //     process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //     client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({users: res.data, loading: false});

  // }

  // Search Github users
  searchUsers = async text => {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false});
  }

  // Clear users from state
  clearUsers = () => this.setState({users: [], loading: false})

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})

    setTimeout(()=> this.setState({alert: null}), 5000)
  }

  render() {
    const {loading, users} = this.state;
    
    return (
      <Router>
        <div className="App">
       <Navbar />
       <div className='container'>
         <Alert alert={this.state.alert}/>
         <Routes>
           <Route path='/' element = {
             <Fragment>
               <Search
                searchUsers = {this.searchUsers}
                clearUsers = {this.clearUsers}
                showClear = {users.length > 0 ? true : false}
                setAlert = {this.setAlert}/>
               <Users loading={loading} users={users}/>
             </Fragment>
           } />
           <Route exact path='/about' element={<About />} />
         </Routes>
        
       </div>
      </div>
      </Router>
      
    ); 
  }
}

export default App;
