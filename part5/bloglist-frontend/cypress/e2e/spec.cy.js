describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    const user = {
      username: 'test_user',
      password: 'test_password',
      name: 'user1',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
      cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#Username').type('test_user')
      cy.get('#Password').type('test_password')
      cy.get('#login-button').click()

      cy.contains('user1 logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#Username').type('user111')
      cy.get('#Password').type('123')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'test_user', password: 'test_password' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('a blog for cypress test')
      cy.get('#author-input').type('cypress user')
      cy.get('#url-input').type('an url')
      cy.get('#blog-form').contains('create').click()
      cy.contains('a blog for cypress test')
      cy.contains('cypress user')
    })

    describe('When created one blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'second blog for test',
          author: 'cypress user',
          url: 'an url',
        })
      })

      it('the user can like a blog', function () {
        cy.contains('second blog for test').parent().parent()
          .find("button").click()

        cy.contains('second blog for test').parent().parent()
          .contains("like").click()

        cy.contains('second blog for test').parent().parent()
          .contains("Likes: 1")
      })

      it('the user who created a blog can delete it', function () {
        cy.contains('second blog for test').parent().parent()
          .find("button").click()
        cy.contains('second blog for test').parent().parent()
          .contains("Delete").click()
        cy.should('not.contain', 'second blog for test')
      })

    })


  })


  describe('When there are multiple blogs', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'test_user', password: 'test_password' })
      cy.createBlog({
        title: 'blog with second most likes',
        author: 'cypress user',
        url: 'an url',
        likes: 66
      })

      cy.createBlog({
        title: 'blog with least likes',
        author: 'cypress user',
        url: 'an url',
        likes: 3
      })

      cy.createBlog({
        title: 'blog with most likes',
        author: 'cypress user',
        url: 'an url',
        likes: 100
      })
    })

    it('blogs are sorted according to likes', function () {
      cy.contains('blog with most likes').parent().parent()
        .find("button").click()
      cy.contains('blog with second most likes').parent().parent()
        .find("button").click()
      cy.contains('blog with least likes').parent().parent()
        .find("button").click()

      cy.get('.blog').eq(0).should('contain', 'blog with most likes')
      cy.get('.blog').eq(1).should('contain', 'blog with second most likes')
      cy.get('.blog').eq(2).should('contain', 'blog with least likes')

    })


  })


})