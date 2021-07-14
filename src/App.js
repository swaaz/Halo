import './App.css';
import Home from './components/Home/Home';
import SinglePlayer from './components/SinglePlayer/SinglePlayer';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Multiplayer from './components/Multiplayer/Multiplayer';
// import MultiStart from './components/MultiStart/MultiStart';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';

function App() {
  return (
    <Router>
      <div>
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
        <Switch>
          <Route exact path='/leaderboard' component={LeaderBoard} />
          {/* <Route exact path='/multistart' component={MultiStart} /> */}
          <Route exact path='/multi' component={Multiplayer} />
          <Route exact path='/single' component={SinglePlayer} />
          <Route path='/leader' component={LeaderBoard} />
          <Route  path="/" component={Home} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
