// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var clientId = '704606213056-k48j3cnoiekrbvn2mp85bbt1clcc0a52.apps.googleusercontent.com';
var apiKey = 'AIzaSyAqgseyOujBN77nDtNCZuQF284A7zGU_Jw';
var scopes = 'https://www.googleapis.com/auth/drive.file';

var auth2; // The Sign-In object.
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

function handleClientLoad() {
    // Load the API client and auth library
    gapi.load('client:auth2', initAuth);
}

function initAuth() {
    gapi.client.setApiKey(apiKey);
    gapi.auth2.init({
        client_id: clientId,
        scope: scopes
    }).then(function () {
      auth2 = gapi.auth2.getAuthInstance();
      // Listen for sign-in state changes.
      auth2.isSignedIn.listen(updateSigninStatus);
      // Handle the initial sign-in state.
      updateSigninStatus(auth2.isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      loadDriveApi();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
}
function handleAuthClick(event) {
    auth2.signIn();
}
function handleSignoutClick(event) {
    auth2.signOut();
}


/**
 * Load Drive API client library.
 */
function loadDriveApi() {
    gapi.client.load('drive', 'v3', listFiles);
}

/**
 * Print files.
 */
function listFiles() {
    var request = gapi.client.drive.files.list({
            'pageSize': 10,
            'fields': "nextPageToken, files(id, name)"
        });

        request.execute(function(resp) {
            appendPre('Files:');
            var files = resp.files;
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    appendPre(file.name + ' (' + file.id + ')');
                }
            } else {
                appendPre('No files found.');
            }
        });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}