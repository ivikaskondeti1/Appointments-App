// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    AppointementDetails: [
      {
        id: uuidv4(),
        name: 'to make Tea',
        time: '19 July 2021, Monday',
        like: false,
      },
    ],
    name: '',
    dateValue: '',
    starred: false,
  }

  getTitle = event => {
    this.setState({name: event.target.value})
  }

  getDate = event => {
    this.setState({dateValue: event.target.value})
  }

  addtask = event => {
    event.preventDefault()
    const {dateValue, name} = this.state
    const arr = dateValue.split('-')
    const formattedDate = format(
      new Date(arr[0], arr[1] - 1, arr[2]),
      'dd MMMM yyyy, EEEE',
    )
    const newObj = {
      id: uuidv4(),
      name,
      time: formattedDate,
      like: false,
    }
    this.setState(prevState => ({
      AppointementDetails: [...prevState.AppointementDetails, newObj],
      name: '',
      dateValue: '',
    }))
  }

  onclicklike = id => {
    console.log(id)
    this.setState(prevstate => ({
      AppointementDetails: prevstate.AppointementDetails.map(eachitem => {
        if (eachitem.id === id) {
          return {...eachitem, like: !eachitem.like}
        }
        return eachitem
      }),
    }))
  }

  starredFuncton = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }))
  }

  render() {
    const {AppointementDetails, starred, name, dateValue} = this.state
    const starredval = starred ? 'starredbutton' : 'unstarredbutton'
    const FilteredList = AppointementDetails.filter(
      eachlist => eachlist.like === true,
    )
    console.log(FilteredList)

    return (
      <div className="Mainpage">
        <div className="maincard">
          <div className="main2card">
            <div className="Formdiv">
              <h1 className="Heading">Add Appointment</h1>
              <form className="formn" onSubmit={this.addtask}>
                <label htmlFor="title">TITLE</label>
                <input
                  value={name}
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={this.getTitle}
                />
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  id="date"
                  onChange={this.getDate}
                  value={dateValue}
                />
                <button type="submit">Add</button>
              </form>
            </div>
            <img
              className="appImage"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <div>
            <hr className="line" />
          </div>
          <div className="bottomCard">
            <h1>Appointments</h1>
            <button
              type="submit"
              className={starredval}
              onClick={this.starredFuncton}
            >
              Starred
            </button>
          </div>
          {starred ? (
            <ul className="listItems">
              {FilteredList.map(eachlist => (
                <AppointmentItem
                  AppointementDetails={eachlist}
                  onclicklike={this.onclicklike}
                  key={eachlist.id}
                />
              ))}
            </ul>
          ) : (
            <ul className="listItems">
              {AppointementDetails.map(eachlist => (
                <AppointmentItem
                  AppointementDetails={eachlist}
                  onclicklike={this.onclicklike}
                  key={eachlist.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Appointments
