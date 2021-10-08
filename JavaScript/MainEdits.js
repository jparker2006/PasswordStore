function ViewPasswordsFrame() {
    let sPage = "";
    sPage += "<div class='MainMenuFrame'>";

    sPage += "<div class='MainMenuHeader'>";

    sPage += "<div class='HeaderText RoundedBox'>";
    sPage += "The Password Store";
    sPage += "</div>";

    sPage += "<div class='BackButton RoundedBox' title='Back' onClick='MainMenuFrame()'>&laquo</div>";
    sPage += "</div>"; // header

    sPage += "<div class='MainMenuBody' id='ViewPWsBody' style='border: solid;'>";
    sPage += "</div>";

    sPage += "</div>";

    sPage += "<div id='Toast' class='Toast'></div>";

    document.getElementById("Main").innerHTML = sPage;
    GetPasswords();
}

function AddPasswordsFrame() {
    let sPage = "";
    sPage += "<div class='MainMenuFrame'>";

    sPage += "<div class='MainMenuHeader'>";

    sPage += "<div class='HeaderText RoundedBox'>";
    sPage += "The Password Store";
    sPage += "</div>";

    sPage += "<div class='BackButton RoundedBox' title='Back' onClick='MainMenuFrame()'>&laquo</div>";
    sPage += "</div>"; // header

    sPage += "<div class='MainMenuBody' id='ViewPWsBody'>";

    sPage += "<div class='TextboxContainers'>"; // text
    sPage += "<span id='Feedback' class='BodyText'>Store A Password</span>";
    sPage += "</div>";

    sPage += "<div class='TextboxContainers'>"; // site name
    sPage += "<input type='text' id='SiteName' class='PasswordTextbox' placeholder='Website Name' maxlength=30>";
    sPage += "</div><br>";

    sPage += "<div class='TextboxContainers'>"; // password
    sPage += "<input type='text' id='Password' class='PasswordTextbox' placeholder='Password' maxlength=150>";
    sPage += "</div><br>";

    sPage += "<div class='TextboxContainers ConfirmPassword' onClick='AddPassword()'>"; // confirm
    sPage += "Add!";
    sPage += "</div>";

    sPage += "</div>"; // body

    sPage += "</div>"; // all

    sPage += "<div id='Toast' class='Toast'></div>";

    document.getElementById("Main").innerHTML = sPage;
}

function LosePasswordsFrame() {
}

// function GetPasswords() {
//     let sUsername = getCookie('UN');
//     postFileFromServer("Backend/Main.php", "GetPasswordAll=" + encodeURIComponent(sUsername), GetAllPWsCallback);
//     function GetAllPWsCallback(data) {
//         alert(data);
//     }
// }

function AddPassword() {
    let sSite = document.getElementById("SiteName").value;
    let sPW = document.getElementById("Password").value;
    if (!sSite) {
        document.getElementById("Feedback").innerHTML = "Enter A Site Name";
        return;
    }
    if (!sPW) {
        document.getElementById("Feedback").innerHTML = "Enter A Password";
        return;
    }
    document.getElementById("Feedback").innerHTML = "Entry Successful";
    let objPasswordData = {};
    objPasswordData.username = getCookie('UN');
    objPasswordData.site = sSite;
    //var aes256 = require('aes256');
    let sUserPW = getCookie('PW');
    let sKey = HashThis(sUserPW, 3000);

    let jsonPasswordData = JSON.stringify(objPasswordData);
    alert(jsonPasswordData);
    return;
    postFileFromServer("Main.php", "StorePW=" + encodeURIComponent(jsonPasswordData), StorePWCallback);
    function StorePWCallback(data) {
        alert(data);
    }
}


