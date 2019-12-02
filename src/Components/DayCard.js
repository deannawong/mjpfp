import React from "react";
import store from "../Redux/Store";
import Axios from "Axios";

class DayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      currTask: "",
      tasks: []
    };
  }
  submitTask(ev) {
    Axios.post("/api/tasks", {
      description: this.state.currTask,
      calDateId: ev.target.id,
      completed: false
    }).then(() => {
      Axios.get(`/api/tasks/${this.state.date.id}`)
        .then(response => response.data)
        .then(data => {
          this.setState({ tasks: data });
          this.setState({ currTask: "" });
        });
    });
  }
  deleteTask(ev) {
    Axios.delete(`/api/tasks/${ev.target.id}`, {}).then(() => {
      Axios.get(`/api/tasks/${this.state.date.id}`)
        .then(response => response.data)
        .then(data => {
          this.setState({ tasks: data });
        });
    });
  }

  handleTaskChange(ev) {
    this.setState({ currTask: ev.target.value });
  }

  componentDidMount() {
    Axios.get(`/api/tasks/${this.state.date.id}`)
      .then(response => response.data)
      .then(data => {
        this.setState({ tasks: data });
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.date.month !== this.props.date.month) {
      this.setState({ date: this.props.date }, () => {
        Axios.get(`/api/tasks/${this.state.date.id}`)
          .then(response => response.data)
          .then(data => {
            this.setState({ tasks: data });
          });
      });
    }
  }
  //Should add update/edit functionality on each task rather than just onClick response
  render() {
    const { date, currTask, tasks } = this.state;
    return (
      <div
        className="dayCard"
        key={date.id}
        id={
          date.day === store.getState().currentDay &&
          date.month === store.getState().currentMonth &&
          date.year === store.getState().currentYear
            ? "today"
            : ""
        }
      >
        <p>{date.weekDayName}</p>
        <p>{date.day}</p>
        <form>
          <input
            placeholder="new task"
            onChange={ev => this.handleTaskChange(ev)}
            value={currTask}
          ></input>
          <button id={date.id} onClick={ev => this.submitTask(ev)}>
            +
          </button>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div onClick={ev => ev.target.classList.toggle("done")}>
                  {task.description}
                </div>
                <button id={task.id} onClick={ev => this.deleteTask(ev)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}
export default DayCard;
