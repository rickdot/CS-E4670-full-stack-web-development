import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {showNotification} from "../reducers/notificationReducer"
import Blog from "./Blog";

const BlogList = ({user, setUser}) => {
  const blogs = useSelector((state) => {
    return(state.blogs)
  })
  const dispatch = useDispatch();
  return (
    <div>
      {blogs.map(blog => {
      return(
        <Blog key={blog._id} blog={blog} user={user} setUser={setUser}/>
      )
    })}
    </div>
  );
};

export default BlogList;