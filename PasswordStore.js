var onload = () => {
    LoadFunction();
}

function LoadFunction() {
    let UN = getCookie('UN');
    let PW = getCookie('PW');
    if (UN && PW) {
        Login(UN, PW);
        return;
    }
    SignUpFrame();
}

function SignUpFrame() {
    let sPage = "";
    sPage += "<div class='LoginFrame'>";

    sPage += "<div class='LoginHeader RoundedBox'>";
    sPage += "Welcome to the Password Store\n";
    sPage += "Sign Up Below";
    sPage += "</div>";

    sPage += "<div class='UsernameBox'>";
    sPage += "<input type='text' id='Username' class='LoginTextbox' placeholder='Username' maxlength=14>";
    sPage += "</div>";

    sPage += "<div class='UsernameBox'>";
    sPage += "<input type='password' id='Password' class='LoginTextbox' placeholder='Password'>";
    sPage += "</div>";

    sPage += "<div class='UsernameBox'>";
    sPage += "<input type='password' id='ConfirmPassword' class='LoginTextbox' placeholder=' Confirm Password'>";
    sPage += "</div>";

    sPage += "<div id='Feedback' class='LoginFeedback'>";
    sPage += "</div>";

    sPage += "<div class='UsernameBox'>";
    sPage += "<input type='button' class='LoginButton' value='Create Account' onClick='AccountDataCheck()'>";
    sPage += "</div>";

    sPage += "<div class='LoginHeader'>";
    sPage += "<a href=\"javascript:LoginFrame()\" style='color: #7CB9E8;'>Already Have an Account?</a><br>";
    sPage += "<label for='StayLoggedIn'> Stay Logged In?</label>";
    sPage += "<input type='checkbox' id='StayLoggedIn' checked>"
    sPage += "</div>";

    sPage += "</div>";

    sPage += "<div class='GitHubImgLogin' title='feel free to look at and edit all the code behind this project'>";
    sPage += "<a href='https://github.com/jparker2006/PasswordStore'>";
    sPage += "<img src='Images/GitHub48.png'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div id='Toast' class='Toast'></div>";

    document.getElementById("Main").innerHTML = sPage;
}

function LoginFrame() {
    let sPage = "";
    sPage += "<div class='LoginFrame'>";

    sPage += "<div class='LoginHeader RoundedBox'>";
    sPage += "Welcome back to the<br>Password Store<br>";
    sPage += "Log in Below";
    sPage += "</div>";

    sPage += "<div class='UsernameBox'>";
    sPage += "<input type='text' id='Username' class='LoginTextbox' placeholder='Username' maxlength=14>";
    sPage += "</div>";

    sPage += "<div class='UsernameBox'>";
    sPage += "<input type='password' id='Password' class='LoginTextbox' placeholder='Password'>";
    sPage += "</div>";

    sPage += "<div id='Feedback' class='LoginFeedback'>";
    sPage += "</div>";

    sPage += "<div class='UsernameBox'>";
    sPage += "<input type='button' class='LoginButton' value='Log In' onClick='CheckLogin()'>";
    sPage += "</div>";

    sPage += "<div class='LoginHeader'>";
    sPage += "<a href=\"javascript:SignUpFrame()\" style='color: #7CB9E8;'>Don't Have an Account?</a><br>";
    sPage += "<label for='StayLoggedIn'> Stay Logged In?</label>";
    sPage += "<input type='checkbox' id='StayLoggedIn' checked>"
    sPage += "</div>";

    sPage += "</div>";

    sPage += "<div class='GitHubImgLogin'>";
    sPage += "<a href='https://github.com/jparker2006/PasswordStore'>";
    sPage += "<img src='Images/GitHub48.png' title='feel free to look at and edit all the code behind this project'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div id='Toast' class='Toast'></div>";

    document.getElementById("Main").innerHTML = sPage;
}

function MainMenuFrame() { // here for testing
    let sPage = "";
    sPage += "<div class='LoginFrame'>";
    sPage += "</div>";

    sPage += "<div class='GitHubImgLogin'>";
    sPage += "<a href='https://github.com/jparker2006/PasswordStore'>";
    sPage += "<img src='Images/GitHub48.png' title='feel free to look at and edit all the code behind this project'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div id='Toast' class='Toast'></div>";

    document.getElementById("Main").innerHTML = sPage;
}

function AccountDataCheck() {
    let sUsername = document.getElementById('Username').value.trim();
    let sPassword = document.getElementById('Password').value.trim();
    let sPasswordConfirm = document.getElementById('ConfirmPassword').value.trim();
    if (sUsername.length < 3) {
        document.getElementById('Feedback').innerHTML = "Username too short";
        return;
    }
    if (sPassword.length < 7) {
        document.getElementById('Feedback').innerHTML = "Password too short";
        return;
    }
    if (sPassword != sPasswordConfirm) {
        document.getElementById('Feedback').innerHTML = "Password does not match confirm";
        return;
    }
    document.getElementById('Feedback').innerHTML = "";
    CreateAccount();
}

function CreateAccount() {
    let objNewAccount = {};
    objNewAccount.username = document.getElementById('Username').value.trim();
    let sPW = document.getElementById('Password').value.trim();
    objNewAccount.password = HashThis(sPW, 25);

    if (document.getElementById('StayLoggedIn').checked) { // Save username & hashed PW cookies
        setCookie('UN', objNewAccount.username, 999);
        setCookie('PW', objNewAccount.password, 999);
    }

    let jsonNewAccount = JSON.stringify(objNewAccount);
    postFileFromServer("PasswordStore.php", "NewAccount=" + encodeURIComponent(jsonNewAccount), NewAccountCallback);
    function NewAccountCallback(data) {
        if (data) {
            Toast("Account created");
            MainMenuFrame();
        }
        else
            Toast("Account creation failed");
    }
}

function Login (UN, PW) {
    let objCredentials = {};
    objCredentials.un = UN;
    objCredentials.pw = PW;
    let jsonCredentials = JSON.stringify (objCredentials);
    postFileFromServer("PasswordStore.php", "LogIn=" + encodeURIComponent(jsonCredentials), LogInCallback);
    function LogInCallback(data) {
        if (data)
            MainMenuFrame();
        else
            Toast("Login failed");
    }
}

function CheckLogin() {
    let UN = document.getElementById('Username').value.trim();
    let PW = document.getElementById('Password').value.trim();
    PW = HashThis(PW, 25);
    if (document.getElementById('StayLoggedIn').checked) { // Save username & hashed PW cookies
        setCookie('UN', UN, 999);
        setCookie('PW', PW, 999);
    }
    Login(UN, PW);
}

var HashThis = (sText, nRounds) => {
    for (let x = 0; x < nRounds; x++) {
        sText = sha3_256(sText);
    }
    return sText;
}

function Toast(sMess) {
    if (document.getElementById('Toast')) {
        document.getElementById('Toast').innerHTML = "<div class='ToastMsg'>"+sMess+"</div>";
        setTimeout(function(){ document.getElementById('Toast').innerHTML = ''; }, 5000);
    }
}

function setCookie(c_name, value, exdays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays===null) ? '' : '; expires='+exdate.toUTCString());
  document.cookie=c_name + '=' + c_value;
}

function getCookie(c_name) {
  var i,x,y,ARRcookies = document.cookie.split(';');
  for (i=0;i<ARRcookies.length;i++) {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf('='));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf('=')+1);
    x=x.replace(/^\s+|\s+$/g,'');
    if (x===c_name)
      return unescape(y);
  }
}

function postFileFromServer(url, sData, doneCallback) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(sData);
    function handleStateChange() {
        if (xhr.readyState === 4) {
            doneCallback(xhr.status == 200 ? xhr.responseText : null);
        }
    }
}

