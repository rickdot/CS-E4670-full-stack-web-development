import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteTo } from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return(state.anecdotes.slice().sort((a,b) => b.votes - a.votes))
  })
  const filterValue = useSelector((state) => state.filter)
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const voted = {...anecdote, votes: anecdote.votes+1}
    dispatch(voteTo(voted))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 10))


    // save to server
    // anecdoteService.voteOne(voted)
    // update state
    // dispatch(voteAnecdote(anecdote.id));

    // dispatch(setNotification(`you voted '${anecdote.content}'`))
    // setTimeout(() => {
    //   dispatch(removeNotification())
    // }, 5000)

    

  };

  return (
    <div>
      {anecdotes.map((anecdote) => 
        anecdote.content.includes(filterValue) ?
       (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ) :
        null
      )}
    </div>
  );
};

export default AnecdoteList;