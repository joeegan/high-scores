Simple high scores implementation for single player games.

## User journeys for demo app
### Unauthenticated user
* A button is shown on the page to click which gives you a random score (integer).
* Clicking on this presents you with a few OAuth options: github, google and facebook.
* Once authenticated, 'Enter a custom username' form field is displayed
* Once submitted a scoreboard is displayed showing the top 20 scores and your rank below (if it is outside the top 20)

### Authenticated user
* A button is shown on the page to click which gives you a random score (integer).
* Clicking on this presents you with the highscores table. If your score is less than your highscore, you see your highscore highlighted in the table and your current score is just mentioned beneath it. Otherwise you see your new highscore highlighted in the table.

## Scores API

The backend will need to create a high score instance. Which will create a db for the supplied `gameName` with 2 tables.

```js
new HighScores('minesweeper')
```

## Database

### Scores table
| userName (string) | score (integer) | level (optional) (string)|
| - | - | - |
| joe84 | 145 | 8 |
| foobar2000 | 101 | 6 |

### Users table
A table of users will be required to protect against impersonation.

| userName (string) | OAuthId or email? (string?)|
| -------- | ----- |
| joe84 | dflksjdfsdflkj987sf8d8fs9er8 |
| foobar2000 | foobar200@gmail.com |
| joeGithub | joeegan84 |

Frontend will need a way of retrieving all scores and adding new scores
```js
GET /highscores
{
  [
    username: joe84,
    score: 145,
    level: '8' // optional
  ],
  ...
}
```

```js
POST /highscores
{
  username: joe84,
  score: 145,
  level: '8',
}

```
Response from this should be the same as the GET
or an error
```js
{
  message: 'Invalid score, could not process'
}
```

Front end will need to post user data to add to the user db:
```js
POST /highscores/users/create
{
  username: joe84,
  oAuthId: dflksjdfsdflkj987sf8d8fs9er8
}
```
Responses:
```js
200
{
  message: 'User successfully added to db'
}
```
```js
400
{
  message: 'Duplicate username|oAuthUser found in db, please try another'
}
```

To make this production ready the API should include the extra CRUD operations.
