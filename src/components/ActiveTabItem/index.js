import './index.css'

const ActiveTabItem = props => {
  const {details, isActive, onActiveTab} = props
  const {id, displayText} = details
  const activeTabClass = isActive ? 'active' : ''
  const onClickTab = () => {
    onActiveTab(id)
  }
  return (
    <li className="tasks-button-item">
      <button
        className={`${activeTabClass} tab`}
        type="button"
        onClick={onClickTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default ActiveTabItem
