function ViewPasswordsFrame() {
    let sPage = "";
    sPage += "<div class='MainMenuFrame'>";

    sPage += "<div class='MainMenuHeader'>";

    sPage += "<div class='HeaderText RoundedBox'>"; // search icon button that replaces this text with ajax box
    sPage += "The Password Store";
    sPage += "</div>";

    // add a list to ajax passwords

    sPage += "<div class='BackButton RoundedBox' title='Back' onClick='MainMenuFrame()'>&laquo</div>";
    sPage += "</div>"; // header

    sPage += "<div class='MainMenuBody' id='ViewPWsBody'>";
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

function GetPasswords() {
    let sUsername = getCookie('UN');
    postFileFromServer("Backend/Main.php", "GetAllPasswords=" + encodeURIComponent(sUsername), GetAllCallback);
    function GetAllCallback(data) {
        let objPasswords = JSON.parse(data);
        let nLength = objPasswords.length;
        let sUserPW = getCookie('PW');
        let sKey = HashThis(sUserPW, 3000);
        let sPage = "";
        if (0 == nLength) { // no pws stored case
            sPage += "<div class='PWContainers RoundedBox'>";
            sPage += "No passwords currently stored";
            sPage += "</div>";
        }
        else if (nLength < 5) {
            for (let i=0; i<nLength; i++) {
                sDecrypted = AESDecrypt(decodeURIComponent(objPasswords[i].password), sKey);
                sPage += "<div class='PWContainers RoundedBox'>";
                sPage += objPasswords[i].site + ":<br>" + sDecrypted;
                sPage += "</div>";
            }
        }
        else { // cant page overflow with divs
            for (let i=0; i<5; i++) {
                sDecrypted = AESDecrypt(decodeURIComponent(objPasswords[i].password), sKey);
                sPage += "<div class='PWContainers RoundedBox'>";
                sPage += objPasswords[i].site + ":<br>" + sDecrypted;
                sPage += "</div><br>";
            }
        }
        document.getElementById("ViewPWsBody").innerHTML = sPage;
    }
}

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

    let sUserPW = getCookie('PW');
    let sKey = HashThis(sUserPW, 3000);
    let ePassword = AESEncrypt(sPW, sKey);
    ePassword = encodeURIComponent(ePassword);

    let objPasswordData = {};
    objPasswordData.username = getCookie('UN');
    objPasswordData.site = sSite;
    objPasswordData.password = ePassword;

    let jsonPasswordData = JSON.stringify(objPasswordData);
    postFileFromServer("Backend/Main.php", "StorePW=" + encodeURIComponent(jsonPasswordData), StorePWCallback);
    function StorePWCallback(data) {
        if (data) {
            MainMenuFrame();
            Toast("Password Stored");
        }
        else
            Toast("RUH ROH! entry did not work");
    }
}


//

