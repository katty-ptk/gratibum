import LandingPage from './pages/presentation/LandingPage';
import SignInPage from './pages/presentation/SignInPage';
import SignUpPage from './pages/presentation/SignUpPage';
import LoginPage from './pages/presentation/LoginPage';
import './styles/style.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/gratibum/Main';
import ForgotPassword from './pages/presentation/ForgotPassword';
import ProfilePage from './pages/gratibum/ProfilePage';
import AboutGratibum from './pages/gratibum/AboutGratibum';
import AddGratitude from './pages/gratibum/AddGratitude';
import FocusedGratitude from './pages/gratibum/FocusedGratitude';
import EditGratitude from './pages/gratibum/EditGratitude';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path='/' exact
            component={ LandingPage }
          ></Route>
          <Route
            exact path='/sign-in'
            component={ SignInPage }
          ></Route>
          <Route
            exact path='/sign-up'
            component={ SignUpPage }
          ></Route>
          <Route
            exact path='/login'
            component={ LoginPage }
          ></Route>

          <Route
            exact path='/gratibum'
            component={ Main }
          ></Route>
          <Route
            exact path='/forgot_password'
            component={ ForgotPassword }
          ></Route>
          <Route
            exact path='/profile'
            component={ ProfilePage }
          ></Route>
          <Route
            exact path='/about-gratibum'
            component={ AboutGratibum }
          ></Route>
          <Route
            exact path='/create-gratitude'
            component={ AddGratitude }
          ></Route>
          <Route
            exact path='/gratibum/:id'
            component={ FocusedGratitude }
          ></Route>
          <Route
            exact path='/gratibum/edit/:id'
            component={ EditGratitude }
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
