const AUTHORIZE_URL =
  'http://github.com/login/oauth/authorize'

const GITHUB_CLIENT_ID = '198e090ae7c6f384a9e4'
const CALLBACK_URL = 'http://localhost:8080/callback.html'

const random = () => Math.floor(Math.random() * 1000)

window.onload = () => {
  document
    .querySelector('#gameButton')
    .addEventListener('click', ({ target }) => {
      target.innerHTML = 'Well done!'
      target.disabled = true
      document.querySelector('#random').innerHTML = random()
      document.querySelector(
        '#githubButton',
      ).style.display =
        'block'
    })

  document
    .querySelector('#githubButton')
    .addEventListener('click', ({ target }) => {
      const unguessableRandomString = random() + Date.now()
      window.location = AUTHORIZE_URL.concat(
        `?client_id=${GITHUB_CLIENT_ID}`,
      )
        .concat(`&redirect_uri=${CALLBACK_URL}`)
        .concat(`&state=${unguessableRandomString}`)
    })
}
