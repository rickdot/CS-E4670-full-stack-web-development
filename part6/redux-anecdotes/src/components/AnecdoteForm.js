import React from "react";
// import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer"
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const addNew = async (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;
    event.target.anecdote.value = ''
    props.addAnecdote(anecdoteContent)
    props.showNotification(`you created '${anecdoteContent}'`, 10)

    // save to server (db.json)
    // const newAnecdote = await anecdoteService.createNew(anecdoteContent) 
    // update state
    // dispatch(createAnecdote(newAnecdote));
    
    // dispatch(setNotification(`you created '${anecdoteContent}' `))
    // setTimeout(() => {
    //   dispatch(removeNotification())
    // }, 5000)

    
  };

  return (
    <div>
       <h2>create new</h2>
        <form onSubmit={addNew}>
        <div>
            <input name="anecdote" />
        </div>
        <button type="submit">create</button>
        </form> 
    </div>
    
  );
};





const mapDispatchToProps = {
  addAnecdote,
  showNotification
}


export default connect(null, mapDispatchToProps)(AnecdoteForm)