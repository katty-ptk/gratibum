import LandingPage from './pages/presentation/LandingPage';
import SignInPage from './pages/presentation/SignInPage';
import SignUpPage from './pages/presentation/SignUpPage';
import LoginPage from './pages/presentation/LoginPage';
import './styles/style.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
