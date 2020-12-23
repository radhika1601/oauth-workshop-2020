/*
    This js is used to get the OAuth access token, and after that the we use the access token
    to get the user data from the channel i OAuth server
*/

// The client id and client secret received from the channel i developers' console 
client_id = "client_id"
client_secret = "client_secret"


// We first extract the authorization code send to us (the redirect URI) from the url parameters
url_params = window.location.search
console.log(url_params)
authorization_code = url_params.split("&")[0].replace('?code=', '')
console.log(authorization_code)

// XMLHttpRequest is used to asynchronously make HTTP requests to a web-server
const Http = new XMLHttpRequest();
const retrieve_token_url = 'https://internet.channeli.in/open_auth/token/';

/* This function is used to retrieve user data after getting the access token from the server.
   It also fills the recieved profile information into a paragraph tag in the index.html page 
*/
function user_data() {
  const retrieve_data_url = 'https://internet.channeli.in/open_auth/get_user_data/';
  Http.open("GET", retrieve_data_url);
  Http.setRequestHeader("Authorization", "Bearer " + access_token)
  Http.send();
  Http.onreadystatechange = (e) => {
    if (Http.readyState == XMLHttpRequest.DONE && Http.status === 200) {
      console.log(Http.responseText)
      profile_data = JSON.parse(Http.responseText)
      var profile_data_html = document.getElementById("data")
      profile_data_str = 'Enrolment Number: ' + profile_data.username + '<br>'
      profile_data_str += 'Full Name: ' + profile_data.person.fullName + '<br>'
      profile_data_str += 'Branch Name: ' + profile_data.student["branch name"] + '<br>'
      profile_data_str += 'Institute Email Address: ' + profile_data.contactInformation.instituteWebmailAddress
      profile_data_html.innerHTML = profile_data_str
    }
  }
}

/* Request data are the post parameters used for the request to retrieve the access token. 
    These may differ in accordance with the OAuth Provider. 
*/
request_data = "client_id=" + client_id + "&client_secret=" + client_secret
request_data += "&grant_type=authorization_code"
request_data += "&redirect_uri=http://localhost:8080/"
request_data += "&code=" + authorization_code
Http.open("POST", retrieve_token_url);
Http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
Http.send(request_data);
var access_token = ""
Http.onreadystatechange = () => {
  // We wait for a successful response from the channel i server and if a successful response is received, we proceed further
  if (Http.readyState === XMLHttpRequest.DONE && Http.status === 200) {
    console.log(Http.responseText);
    access_token = JSON.parse(Http.responseText).access_token;
    console.log(access_token);
    var button = document.createElement("BUTTON")
    button.innerHTML = "Print Your Data"
    button.onclick = user_data
    document.body.appendChild(button)
  }
}
