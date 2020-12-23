client_id = ""
client_secret = ""

/* This function redirects us to the channel i oauth page, 
   asking the user if he wants to share their data with the third party
*/
function redirector() {

  const url = 'https://internet.channeli.in/oauth/authorise/?client_id=' + client_id

  window.location = url

}
