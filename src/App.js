import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { initialState } from "./Redux/Reducer";
import store from "./Redux/Store";
import MonthContainer from "./Components/MonthContainer.js";

import {
  fetchCalDates,
  updateOffset,
  updateMonthName,
  previousMonth,
  nextMonth,
  findToday
} from "./HelperFuncs.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    fetchCalDates(this.state.viewYear, this.state.viewMonth);
  }

  render() {
    return (
      <HashRouter>
        <div id="main-container">
          <div id="nav">
            <h1 id="yearHeader">{this.state.viewYear}</h1>
            <div id="MonthNav">
              <button id="previousMonthButton" onClick={() => previousMonth()}>
                Previous Month
              </button>
              <h2 id="monthHeader">{this.state.viewMonthName}</h2>
              <button id="nextMonthButton" onClick={() => nextMonth()}>
                Next Month
              </button>
            </div>
            <div>
              <button id="todayButton" onClick={() => findToday()}>
                Today
              </button>
            </div>
          </div>

          <Switch>
            <Route render={() => <MonthContainer />} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
