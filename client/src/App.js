import './App.css';
import React, {Fragment, Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'

// redux
import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Createprofile from './components/profile-forms/Createprofile';
import EditProfile from './components/profile-forms/EditProfile'
import AddXp from './components/profile-forms/AddXp'
import AddEdu from './components/profile-forms/AddEdu'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser()) 
  }

  render() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path='/' component={Landing}></Route>
          <section className="container">
          <Alert/>
          <Switch>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/profiles' component={Profiles}></Route>
            <Route exact path='/profile/:id' component={Profile}></Route>
            <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path='/create-profile' component={Createprofile}></PrivateRoute>
            <PrivateRoute exact path='/edit-profile' component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path='/add-experience' component={AddXp}></PrivateRoute>
            <PrivateRoute exact path='/add-education' component={AddEdu}></PrivateRoute>
            <PrivateRoute exact path='/posts' component={Posts}></PrivateRoute>
            <PrivateRoute exact path='/post/:id' component={Post}></PrivateRoute>
          </Switch>

          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}
}

export default App;
