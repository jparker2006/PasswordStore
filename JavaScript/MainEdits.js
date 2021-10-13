function ViewPasswordsFrame() {
    let sPage = "";
    sPage += "<div class='MainMenuFrame'>";

    sPage += "<div class='MainMenuHeader'>";

    sPage += "<div class='HeaderText RoundedBox' style='margin-bottom: 5px;'>";
    sPage += "The Password Store";
    sPage += "</div>";

    sPage += "<div class='BackButton RoundedBox' title='Back' onClick='MainMenuFrame()'>&laquo</div>";
    sPage += "</div>"; // header

    sPage += "<div class='TextboxContainers RoundedBox'>";
    sPage += "<input type='text' class='AJAXPws' id='PWSearch' placeholder='Search' maxlength=15 onKeyUp='AJAXPws()'>";
    sPage += "</div>";

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

    sPage += "<div class='TextboxContainers'>"; // user name
    sPage += "<input type='text' id='Username' class='PasswordTextbox' placeholder='Username On Site' maxlength=25>";
    sPage += "</div><br>";

    sPage += "<div class='TextboxContainers'>"; // site name
    sPage += "<input type='text' id='SiteName' class='PasswordTextbox' placeholder='Website Name' maxlength=30>";
    sPage += "</div><br>";

    sPage += "<div class='TextboxContainers'>"; // password
    sPage += "<input type='text' id='Password' class='PasswordTextbox' placeholder='Password' maxlength=150>";
    sPage += "</div><br>";

    sPage += "<div class='TextboxContainers'>"; // notes
    sPage += "<input type='text' id='Notes' class='PasswordTextbox' placeholder='Notes' maxlength=250>";
    sPage += "</div><br>";

    sPage += "<div class='TextboxContainers ConfirmPassword' onClick='AddPassword()'>"; // confirm
    sPage += "Add!";
    sPage += "</div>";

    sPage += "</div>"; // body

    sPage += "</div>"; // all

    sPage += "<div id='Toast' class='Toast'></div>";

    document.getElementById("Main").innerHTML = sPage;
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
            sPage += "<div class='PWContainersBlue RoundedBox' style='width: 320px;'>";
            sPage += "No passwords currently stored";
            sPage += "</div>";
        }
        else {
            for (let i=0; i<nLength; i++) {
                let sPW = AESDecrypt(decodeURIComponent(objPasswords[i].password), sKey);
                let sSite = AESDecrypt(decodeURIComponent(objPasswords[i].site), sKey);
                let sUsername = AESDecrypt(decodeURIComponent(objPasswords[i].username), sKey);
                let sNotes = AESDecrypt(decodeURIComponent(objPasswords[i].notes), sKey);
                sPage += "<div class='RoundedBox PWContainersBlue' onClick='ShowPW(\"" + sPW + "\", " + objPasswords[i].pwID + ", \"" + sSite + "\" , \"" + sUsername + "\" , \"" + sNotes + "\")'>";
                sPage += sSite;
                sPage += "</div>";
            }
        }
        document.getElementById("ViewPWsBody").innerHTML = sPage;
    }
}

function ShowPW(sPW, nID, sSite, sUsername, sNotes) {
    let sPage = "";
    sPage += "<div class='MainMenuFrame'>";

    sPage += "<div class='MainMenuHeader'>";

    sPage += "<div class='HeaderText RoundedBox'>";
    sPage += "The Password Store";
    sPage += "</div>";

    sPage += "<div class='BackButton RoundedBox' title='Back' onClick='ViewPasswordsFrame()'>&laquo</div>";
    sPage += "</div>"; // header

    sPage += "<div class='MainMenuBody'>";

    sPage += "<div class='PWShowContainer'>Website: <br>";
    sPage += sSite;
    sPage += "</div>";

    sPage += "<div class='PWShowContainer'>Username: <br>";
    sPage += sUsername;
    sPage += "</div>";

    sPage += "<div class='PWShowContainer' style='overflow-x: scroll;'>Password: <br>";
    sPage += sPW;
    sPage += "</div>";

    sPage += "<div class='PWShowContainer' style='overflow-x: scroll;'>More notes: <br>";
    sPage += sNotes;
    sPage += "</div><br>";

    sPage += "<div class='TextboxContainers ConfirmPasswordDelete' onClick='DeletePassword("+nID+")'>";
    sPage += "Delete Password Data";
    sPage += "</div>";

    sPage += "</div>";

    sPage += "</div>";

    sPage += "<div id='Toast' class='Toast'></div>";
    document.getElementById("Main").innerHTML = sPage;
}

function AddPassword() {
    let sSite = document.getElementById("SiteName").value;
    let sPW = document.getElementById("Password").value;
    let sUN = document.getElementById("Username").value;
    let sNotes = document.getElementById("Notes").value;
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
    let eSite = AESEncrypt(sSite, sKey);
    let eUsername = AESEncrypt(sUN, sKey);
    let eNotes = AESEncrypt(sNotes, sKey);

    ePassword = encodeURIComponent(ePassword);
    eSite = encodeURIComponent(eSite);
    eUsername = encodeURIComponent(eUsername);
    eNotes = encodeURIComponent(eNotes);

    let objPasswordData = {};
    objPasswordData.username = getCookie('UN');
    objPasswordData.site = eSite;
    objPasswordData.password = ePassword;
    objPasswordData.siteUsername = eUsername;
    objPasswordData.notes = eNotes;

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

function AJAXPws() {
    let sUsername = getCookie('UN');
    postFileFromServer("Backend/Main.php", "GetAllPasswords=" + encodeURIComponent(sUsername), GetAllCallback);
    function GetAllCallback(data) {
        let objPasswords = JSON.parse(data);
        let nLength = objPasswords.length;
        let sUserPW = getCookie('PW');
        let sKey = HashThis(sUserPW, 3000);
        let sPage = "";
        let sPWToSearchFor = document.getElementById("PWSearch").value;
        for (let i=0; i<nLength; i++) {
            let sPW = AESDecrypt(decodeURIComponent(objPasswords[i].password), sKey);
            let sSite = AESDecrypt(decodeURIComponent(objPasswords[i].site), sKey);
            let sUsername = AESDecrypt(decodeURIComponent(objPasswords[i].username), sKey);
            let sNotes = AESDecrypt(decodeURIComponent(objPasswords[i].notes), sKey);
            if (sPWToSearchFor == sSite.substring(0, sPWToSearchFor.length) || sPWToSearchFor == sPW.substring(0, sPWToSearchFor.length)) { // can search by pw or site
                sPage += "<div class='RoundedBox PWContainersBlue' onClick='ShowPW(\"" + sPW + "\", " + objPasswords[i].pwID + ", \"" + sSite + "\" , \"" + sUsername + "\" , \"" + sNotes + "\")'>";
                sPage += sSite;
                sPage += "</div>";
            }
        }
        if ("" == sPage)
            sPage = "<div class='PWContainersBlue RoundedBox' style='width: 98%; text-align:center;'>No Matches</div>";
        document.getElementById("ViewPWsBody").innerHTML = sPage;
    }
}

function DeletePassword(nID) {
    if (!confirm("Are you sure, this action cannot be undone"))
        return;
    postFileFromServer("Backend/Main.php", "DeletePW=" + encodeURIComponent(nID), DeletePWCallback);
    function DeletePWCallback(data) {
        if (data) {
            ViewPasswordsFrame();
            Toast("Password Data Deleted");
        }
        else
            Toast("Error");
    }
}

function WriteAllDataToFile() { // write everything to a file
    alert("HEEHEEHAWHAW");
}
