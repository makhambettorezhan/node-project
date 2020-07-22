# node-project
### Node js application 
* that summarizes my knowledge about REST API, MongoDB usage 
  and authentication using jsonwebtoken and passport.

* has a minimalistic style and user friendly interface

### User authentication:
* done by using jsonwebtoken, its Local and Jwt Strategy. Also it uses User 
  mongoose model to login and register new users

* uses access_token query parameter to ensure that a particular user is authenticated, 
  e.g. /films/add?access_token=543gdfqa...


### This Project uses Express and has four main Routers:
* userRouter ==> /users
* filmRouter ==> /films
* musicRouter ==> /music
* favoriteRouter ==> /favorite


### Main Page: '/'
* has login and sign up button
* a little summary of the project
* has a list of main endpoints such as /films, /music


### User Router: 
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
    
### Films Router:

* '/films'
    * shows basic instructions
    * displays links to the main endpoints
    * a film has a title, year, genre, and poster

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
    * shows one specific movie with that id in json form



### Music Router:

* '/albums'
    * shows basic instructions
    * displays links to the main endpoints
    * an album has title, cover link, artist, and tracks array that
      has track's name, preview link, and its duration


* '/albums/search'
    * search anything related to music, e.g. song, artist, album on Deezer API
    * uses query parameter called **title**

* '/albums/show'
    * shows albums selected by admin in json form

* '/albums/showPretty'
    * shows albums selected by admin in nice html/css form
    * cliking on album cover will redirect you to more detailed webpage about the album

* '/albums/showPretty/albumId'
    * shows album with that id in nice html/css form

* '/albums/add'
    * is for admin to add new albums entering album id retrieved from Deezer API using /search endpoint
    * has nice html/css form

* '/albums/del'
    * is for admin to delete all the music albums in the collection

* '/albums/del/albumId'
    * is for admin to delete one specific album with that id

* '/albums/show/filmId'
    * shows one specific album with that id in json form


### Favorite Router:

##### This is where user can select their favorite movies using movie Ids

* '/favorites'
    * shows basic instructions
    * displays links to the main ndpoints
    

* '/favorites/show'
    * shows favorites films of the user in json form

* '/favorites/showPretty'
    * shows favorite films selected by the user in nice html/css form

* '/favorites/add'
    * is for user to add new movies entering its id
    * has nice html/css form

* '/films/del'
    * is for user to delete all the favorite movies in the collection

* '/films/del/filmId'
    * is for user to delete one favorite movie with that id


Also, this project uses jQuery, Bootstrap4 for rendering most of the pages

To run the project, do the following:
```sh
$ npm start
```
From another tab for mongodb directory, type:

```sh
$ mongod --dbpath=data --bind_ip 127.0.0.1
```