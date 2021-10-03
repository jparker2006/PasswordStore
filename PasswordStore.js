var onload = () => {
    LoginFrame();
    //MainFunction();
}

// function MainFunction() {
//     let UN = getCookie('UN');
//     let PW = getCookie('PW');
//     if (UN && PW) {
//         Login(UN, PW); // Dealing with case where log in fails?
//         return;
//     }
//     LoginFrame();
// }

function LoginFrame() {
    let sPage = "";
    sPage += "<div class='LoginFrame'>";

    sPage += "<div class='LoginHeader RoundedBox'>";
    sPage += "Welcome to the Password Store\n";
    //sPage += "<a href='https://github.com/jparker2006/PasswordStore' style='font-size: 14px; color: #7CB9E8;'>Feel free to look at the sites code</a>\n";
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
    sPage += "<input type='button' class='LoginButton' value='Create Account' onClick='CreateAccount()'>";
    sPage += "</div>";

    sPage += "<div class='LoginHeader'>";
    sPage += "<a href='https://github.com/jparker2006/PasswordStore' style='color: #7CB9E8;'>Already Have an Account?</a><br>";
    sPage += "<label for='StayLoggedIn'> Stay Logged In?</label>";
    sPage += "<input type='checkbox' id='StayLoggedIn' checked>"
    sPage += "</div>";

    sPage += "<div id='Toast' class='Toast'></div>";

    sPage += "</div>";

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
/*
function CreateAccount() {
    let objNewAccount = {};
    objNewAccount.username = document.getElementById('Username').value.trim();
    let sPW = document.getElementById('Password').value.trim();
    objNewAccount.password = HashThis(sPW, 5);

    if (document.getElementById('StayLoggedIn').checked) { // Save username & hashed PW cookies
        setCookie('UN', objNewAccount.username, 999);
        setCookie('PW', objNewAccount.password, 999);
    }

    let jsonNewAccount = JSON.stringify(objNewAccount);
    postFileFromServer("PasswordStore.php", "NewAccount=" + encodeURIComponent(jsonNewAccount), NewAccountCallback);
    function NewAccountCallback(data) {
        if (data) {
            //PickAGameFrame();
            Toast("Account created");
        }
        else {
            Toast("Account creation failed.");
        }
    }
}*/

// function Login (UN, PW) {
//     let objCredentials = {};
//     objCredentials.un = UN;
//     objCredentials.pw = PW;
//     let jsonCredentials = JSON.stringify (objCredentials);
//     postFileFromServer("Games.php", "LogIn=" + encodeURIComponent(jsonCredentials), LogInCallback);
//     function LogInCallback(data) {
//         if (data) {
//             g_objUserData = JSON.parse(data);
//             PickAGameFrame();
//             Toast(g_objUserData.first + " " + g_objUserData.last + " is logged in");
//         }
//         else {
//             g_objUserData = null;
//             FeedbackFrame("Ruh-roh!", "<span style='color: red;'>Log in failed.</span>");
//             Toast("Log in failed");
//         }
//     }
// }

// function CheckLogin() {
//     let UN = document.getElementById('LoginUsername').value.trim();
//     let PW = document.getElementById('LoginPassword').value.trim();
//     PW = HashThis(PW, 5);
//     if (document.getElementById('StayLoggedIn').checked) { // Save username & hashed PW cookies
//         setCookie('UN', UN, 999);
//         setCookie('PW', PW, 999);
//     }
//     console.log(UN + " : " + PW);
//     Login(UN, PW);
// }

// function CheckUserNameAvail() {
//     let sUN = document.getElementById('Username').value.trim();
//     if (2 < sUN.length)
//         postFileFromServer("Games.php", "CheckUNAvail=" + encodeURIComponent(sUN), UserNameAvailCallback);
//     function UserNameAvailCallback (data) {
//         if (data > 0) {
//             Toast("Username already used.");
//             document.getElementById('feedback').innerHTML = "Username already used.";
//             document.getElementById('Username').focus();
//         }
//         else {
//             Toast("Username valid");
//             document.getElementById('feedback').innerHTML = "<span style='color: green'>Username valid.</span>";
//         }
//     }
// }

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
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = c_name + "=" + value + ";" + exdays + ";path=/;SameSite=Strict";
}
function getCookie(c_name) {
    let name = c_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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

