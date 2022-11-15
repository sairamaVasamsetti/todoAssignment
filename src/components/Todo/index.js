import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import ActiveTabItem from '../ActiveTabItem'
import TodoItem from '../TodoItem'

const categoriesList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {optionId: 'GROCERY', displayText: 'Grocery'},
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const activeTabsList = [
  {displayText: 'Tasks', id: 'TASKS'},
  {displayText: 'Show All', id: 'SHOW_ALL'},
  {displayText: 'Completed', id: 'COMPLETED'},
]

class Todo extends Component {
  state = {
    activeTab: activeTabsList[0].id,
    userName: '',
    task: '',

    category: 'Education',
    date: '',
    usersList: [],
    tasksList: [],
    errorMsg: false,
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {
      usersList,
      tasksList,
      userName,
      task,
      category,

      date,
    } = this.state

    const getUser = usersList.filter(eachItem => eachItem.name === userName)

    if (getUser.length === 0) {
      const newUser = {
        id: uuidv4(),
        name: userName,
      }

      this.setState(prevState => ({
        usersList: [...prevState.usersList, newUser],
      }))
      const newTask = {
        id: uuidv4(),
        name: userName,

        task,
        category,
        dueDate: date,
        isChecked: false,
      }
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        userName: '',
        task: '',
        category: 'Education',

        date: '',
      }))
    } else {
      const getUserTasks = tasksList.filter(
        eachItem => eachItem.name === userName,
      )
      const filterData = getUserTasks.filter(eachItem => eachItem.task === task)
      if (filterData.length === 0) {
        const newTask = {
          id: uuidv4(),
          name: userName,

          task,
          category,
          dueDate: date,
          isChecked: false,
        }
        this.setState(prevState => ({
          tasksList: [...prevState.tasksList, newTask],
          errorMsg: false,
        }))
      } else {
        this.setState({errorMsg: true})
      }
    }
  }

  getTasksData = () => {
    const {activeTab, tasksList} = this.state
    if (activeTab === 'TASKS') {
      const filteredData = tasksList.filter(
        eachItem => eachItem.isChecked === false,
      )
      return filteredData
    }
    if (activeTab === 'SHOW_ALL') {
      return tasksList
    }
    if (activeTab === 'COMPLETED') {
      const filteredData = tasksList.filter(
        eachItem => eachItem.isChecked === true,
      )
      return filteredData
    }
    return tasksList
  }

  onActiveTab = id => {
    this.setState({activeTab: id})
  }

  onChangeStatus = (status, id) => {
    const {tasksList} = this.state
    const newTasksList = tasksList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, isChecked: status}
      }
      return eachItem
    })

    this.setState({tasksList: newTasksList})
  }

  deleteTask = id => {
    const {tasksList} = this.state
    const filteredData = tasksList.filter(eachItem => eachItem.id !== id)
    this.setState({tasksList: filteredData})
  }

  render() {
    const {
      userName,
      task,
      category,
      date,
      errorMsg,

      activeTab,
    } = this.state
    const filteredData = this.getTasksData()

    return (
      <div className="app-container">
        <h1 className="heading">TODO</h1>
        <div className="content-container">
          <div className="input-container">
            <h1 className="create-task">Create a Task</h1>
            <form onSubmit={this.onSubmitForm}>
              <label className="label" htmlFor="user">
                USERNAME
              </label>
              <input
                type="text"
                className="input"
                placeholder="username"
                id="user"
                value={userName}
                onChange={this.onChangeUsername}
              />
              <label className="label" htmlFor="task">
                TASK
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter Task"
                id="task"
                value={task}
                onChange={this.onChangeTask}
              />
              <label className="label" htmlFor="category">
                CATEGORY
              </label>
              <select
                id="category"
                className="select"
                value={category}
                onChange={this.onChangeCategory}
              >
                {categoriesList.map(eachItem => (
                  <option key={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>

              <label className="label" htmlFor="date">
                DUE DATE
              </label>
              <input
                className="input"
                type="date"
                value={date}
                onChange={this.onChangeDate}
              />
              <div className="button-container">
                <button className="button" type="submit">
                  Add Task
                </button>
              </div>
              {errorMsg && <p className="errorMsg">Tasks already exits</p>}
            </form>
          </div>
          <div className="tasks-container">
            <ul className="tabs-list">
              {activeTabsList.map(eachItem => (
                <ActiveTabItem
                  key={eachItem.id}
                  details={eachItem}
                  isActive={eachItem.id === activeTab}
                  onActiveTab={this.onActiveTab}
                />
              ))}
            </ul>
            <ul className="tasks-items-container">
              {filteredData.map(eachItem => (
                <TodoItem
                  key={eachItem.id}
                  details={eachItem}
                  onChangeStatus={this.onChangeStatus}
                  deleteTask={this.deleteTask}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Todo
