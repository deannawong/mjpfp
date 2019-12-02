import React from "react";
import { initialState } from "../Redux/Reducer";
import store from "../Redux/Store";

class Offset extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  render() {
    const emptyArr = Array(this.state.offset).fill("");
    if (emptyArr.length) {
      return (
        <div id="offsetContainer">
          {emptyArr.map((val, idx) => (
            <div className="dayCard" key={idx}></div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
export default Offset;
