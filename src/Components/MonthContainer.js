import React from "react";
import { initialState } from "../Redux/Reducer";
import store from "../Redux/Store";
import Offset from "./Offset";
import DayCard from "./DayCard";

class MonthContainer extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div id="MonthContainer">
        <Offset />
        {this.state.calDates.map(date => (
          <DayCard date={date} key={date.id} />
        ))}
      </div>
    );
  }
}
export default MonthContainer;
