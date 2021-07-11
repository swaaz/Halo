import './App.css';
import Home from './components/Home/Home';
import SinglePlayer from './components/SinglePlayer/SinglePlayer';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Multiplayer from './components/Multiplayer/Multiplayer';

function App() {
  return (
    <Router>
      <div>
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
        <Switch>
        <Route exact path='/multi' component={Multiplayer} />
          <Route exact path='/single' component={SinglePlayer} />
          <Route exact path="/" component={Home} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
