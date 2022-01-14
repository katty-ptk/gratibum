import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import './styles/style.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router onUpdate={() => window.scrollTo( {top: 0} )}>
      <div className="App">
        <Switch>
          <Route
            path='/' exact
            component={ LandingPage }
          ></Route>
          <Route
            path='/sign-up' exact
            component={ SignUpPage }
          ></Route>
          <Route
            path='/login' exact
            component={ LoginPage }
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
