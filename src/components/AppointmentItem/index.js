import './index.css'

const AppointmentItem = props => {
  const {AppointementDetails, onclicklike} = props
  const {name, time, like, id} = AppointementDetails
  // console.log(props)
  // console.log(name, time)
  const likeButtonPress = () => {
    onclicklike(id)
  }
  const commentimg = like
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="listItem">
      <div className="cardblck">
        <p className="paragraph">{name}</p>
        <p className="time">Date: {time}</p>
      </div>
      <button
        className="startButton"
        type="submit"
        testid="star"
        onClick={likeButtonPress}
      >
        <img className="startImage" src={commentimg} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
