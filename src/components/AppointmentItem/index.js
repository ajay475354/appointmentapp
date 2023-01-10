import "./index.css";

const AppointmentItem = (props) => {
  const { each, onClickStarChange } = props;
  const { id, title, dateInput, isStared } = each;

  const star =
    "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";
  const stared =
    "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png";

  const image_urls = isStared ? stared : star;

  const onClickStar = () => {
    onClickStarChange(id);
  };

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{title}</p>
        <button type="button" testid="star" className="star-button">
          <img
            src={image_urls}
            className="star"
            alt="star"
            onClick={onClickStar}
          />
        </button>
      </div>
      <p className="date">Date: {dateInput}</p>
    </li>
  );
};

export default AppointmentItem;
