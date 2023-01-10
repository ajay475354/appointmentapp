import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import AppointmentItem from "../AppointmentItem/index";

import "./index.css";

class Appointments extends Component {
  state = {
    inputText: "",
    date: "",
    appointmentList: [],
  };

  onChangeInputText = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  onDateChange = (event) => {
    this.setState({
      date: event.target.value,
    });
  };

  onAddOpointment = (event) => {
    event.preventDefault();
    const { inputText, date } = this.state;

    const formattedDate = date
      ? format(new Date(date), "dd MMMM yyyy, EEEE")
      : "";

    const newAppointment = {
      id: uuidv4(),
      title: inputText,
      dateInput: formattedDate,
      isStared: false,
    };

    this.setState((prevState) => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputText: "",
      date: "",
    }));
  };

  onClickStarChange = (id) => {
    this.setState((prevState) => ({
      appointmentList: prevState.appointmentList.map((each) => {
        if (id === each.id) {
          return { ...each, isStared: !each.isStared };
        }
        return each;
      }),
    }));
  };

  onFilter = () => {
    const { isStared } = this.state;

    this.setState({
      isStared: !isStared,
    });
  };

  getFilteredAppointmentsList = () => {
    const { appointmentList, isStared } = this.state;

    if (isStared) {
      return appointmentList.filter((each) => each.isStared === true);
    }
    return appointmentList;
  };

  render() {
    const { isStared, inputText, date } = this.state;
    const filteredAppointmentsList = this.getFilteredAppointmentsList();
    const starButtonClass = isStared ? "trans_button" : "dark_button";

    return (
      <div className="app_bg_container">
        <div className="responsive_container">
          <div className="app_details_card_container">
            <h1 className="heading">Add Appointment</h1>

            <div className="input_details_container">
              <form className="form_container" onSubmit={this.onAddOpointment}>
                <label htmlFor="title" className="label_element">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="title"
                  className="input_text"
                  value={inputText}
                  onChange={this.onChangeInputText}
                />
                <label htmlFor="date_input" className="label_element">
                  Date
                </label>
                <input
                  type="date"
                  id="date_input"
                  value={date}
                  className="date_input"
                  onChange={this.onDateChange}
                />
                <button type="submit" className="add_button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="image_input"
                alt="ajay"
              />
            </div>

            <hr className="horizontal_line" />

            <div className="storing_appointments_container">
              <div className="header_star_superate_container">
                <h1 className="heading_star">Appointments</h1>

                <button
                  type="button"
                  className={`button_star ${starButtonClass}`}
                  onClick={this.onFilter}
                >
                  stared
                </button>
              </div>

              <ul className="unorder_list">
                {filteredAppointmentsList.map((each) => (
                  <AppointmentItem
                    each={each}
                    key={each.id}
                    onClickStarChange={this.onClickStarChange}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Appointments;
