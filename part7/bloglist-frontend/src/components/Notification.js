import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification.message)
  const notification = props.notification.message

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification){
    return (
    <div style={style}>
      {notification}
    </div>
    )
  }
  return null
  
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)