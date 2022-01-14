import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import './styles/style.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <LandingPage />
        <Switch>
          <Route
            path='/sign-up'
            component={ SignUpPage }
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
