import Popup from 'reactjs-popup'

import {MdDelete} from 'react-icons/md'

import './index.css'

const TodoItem = props => {
  const {details, onChangeStatus, deleteTask} = props
  const {id, name, task, category, dueDate, isChecked} = details

  const onChangeCheckbox = event => {
    onChangeStatus(event.target.checked, id)
  }

  const onClickDelete = () => {
    deleteTask(id)
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="checkbox"
        onChange={onChangeCheckbox}
        checked={isChecked}
      />
      <div className="task-details-container">
        <p className="name">{name}</p>
        <p className="task-name">{task}</p>

        <p className="type-text">{category}</p>
        <p className="date">due date: {dueDate}</p>
      </div>
      <Popup
        modal
        trigger={
          <button className="delete-icon-button" type="button">
            <MdDelete size="30" />
          </button>
        }
        className="popup-content"
      >
        {close => (
          <div className="modal-container">
            <p className="delete-text">
              Are you sure you want to delete this item?
            </p>
            <div className="button-container">
              <button
                className="popup-btn"
                type="button"
                onClick={() => close()}
              >
                Cancel
              </button>
              <button
                className="delete-button popup-btn"
                type="button"
                onClick={(() => close(), onClickDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Popup>
    </li>
  )
}

export default TodoItem
