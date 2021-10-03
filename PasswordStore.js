var onload = () => {
    LoginFrame();
}

function LoginFrame() {
    let sPage = "";
    sPage += "<div class='LoginFrame'>";

    sPage += "<div class='LoginHeader RoundedBox'>";
    sPage += "Welcome to Password Store\n";
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

    sPage += "</div>";

    document.getElementById("Main").innerHTML = sPage;
}

function CreateAccount() {
    let sUsername = document.getElementById('Username').value;
    let sPassword = document.getElementById('Password').value;
    let sPasswordConfirm = document.getElementById('ConfirmPassword').value;
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
}
