import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Blog from "./Blog"
import BlogForm from "./BlogForm"


// 5.13
test("renders content", async () => {
  const blog = {
    title: "a blog for testing",
    author: "someone",
    url: "www.google.com",
    likes: 123
  }

  render(<Blog blog={blog} />)

  const { container } = render(<Blog blog={blog} />)

  // screen.debug()

  const title = container.querySelector(".blogTitle")
  expect(title).toHaveTextContent(blog.title)

  const author = container.querySelector(".blogAuthor")
  expect(author).toHaveTextContent(blog.author)

  const url = container.querySelector(".blogUrl")
  expect(url).toBe(null)

  const likes = container.querySelector(".blogLikes")
  expect(likes).toBe(null)
})


// 5.14
test("clicking the view button", async () => {
  const blog = {
    title: "a blog for testing",
    author: "someone",
    url: "www.google.com",
    likes: 123
  }

  let container = render(<Blog blog={blog} />).container

  const user = userEvent.setup()
  const button = screen.getByText("View")
  await user.click(button)

  // screen.debug()

  const url = container.querySelector(".blogUrl")
  expect(url).toBeDefined()

  const likes = container.querySelector(".blogLikes")
  expect(likes).toBeDefined()
})

// 5.15
test("event handler is called twice if the like button is clicked twice", async () => {
  const blog = {
    title: "a blog for testing",
    author: "someone",
    url: "www.google.com",
    likes: 123
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} likeHandler={mockHandler}/>)

  const user = userEvent.setup()

  const viewButton = screen.getByText("View")
  await user.click(viewButton)

  // screen.debug()

  const likeButton = screen.getByText("like")
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})

