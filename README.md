# node-project
### * Node js application 
    * that summarizes my knowledge about REST API, MongoDB usage and authentication using jsonwebtoken and passport.
    * has a minimalistic style and user friendly interface

### * User authentication:
    * done by using jsonwebtoken, its Local and Jwt Strategy. Also it uses User mongoose model to login and register new users
    * uses access_token query parameter to ensure that a particular user is authenticated, e.g. /films/add?access_token=543gdfqa...


### * This Project uses Express and has four main Routers:
    * userRouter ==> /users
    * filmRouter ==> /films
    * musicRouter ==> /music
    * favoriteRouter ==> /favorite


### * Main Page: '/'
    * has login and sign up button
    * a little summary of the project
    * has a list of main endpoints such as /films, /music


### * User Router: 
    * '/users'
        * is only accessible by admin
        * shows all the registered users in json form

    * '/users/login
        * login page
        * uses html and css
        * input fields such as username and password
    * '/users/login/submit'
        * returns json object with access_token

    * '/users/signup'
        * user sign up page (html, css)
        * has input fields like username, password, firstname, and lastname
        * returns json object saying success

    * '/users/logout'
        * redirects to main page
    
### * Films Router:
    * '/films'
        * shows basic instructions
        * displays links to the main endpoints

    * '/films/show'
        * shows films selected by admin in json form

    * '/films/showPretty'
        * shows films selected by admin in nice html/css form

    * '/films/add'
        * is for admin to add new movies entering its title, year, genre, and poster link
        * has nice html/css form

    * '/films/addApi'
        * is for admin to add new movies based on movie title fetched from IMDb API
        * user-friendly interface

    * '/films/del'
        * is for admin to delete all the movies in the collection

    * '/films/del/filmId'
        * is for admin to delete one specific movie with that id

    * '/films/show/filmId'
        * shows one specific movie with that id


