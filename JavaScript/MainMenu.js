function MainMenuFrame() {
    let sPage = "";
    sPage += "<div class='MainMenuFrame'>";
    sPage += "<div class='MainMenuHeader'>";

    sPage += "<div class='MainMenuHeaderText RoundedBox' id='MainMenuHeader'>";
    sPage += "The Password Store";
    sPage += "</div>";

    sPage += "<div class='HamburgerMenuContainer RoundedBox' id='MenuIcon' onClick='HamburgerMenu()' title='Menu'>";
    sPage += "<img src='Images/HamburgerMenu64.png' >";
    sPage += "</div>";

    sPage += "</div>"; // MainMenuHeader

    sPage += "<div class='MainMenuBody'>";

    sPage += "<div class='MenuDivider FirstDivider'>"; // view passwords
    sPage += "<br>View Stored Passwords";
    sPage += "</div>";

    sPage += "<div class='MenuDivider SecondDivider'>"; // add password
    sPage += "<br>Store a Password";
    sPage += "</div>";

    sPage += "<div class='MenuDivider ThirdDivider'>";  // minus password
    sPage += "<br>Delete Stored Password";
    sPage += "</div>";

    sPage += "<div class='MenuDivider FourthDivider'>"; // contact me
    sPage += "<br>Contact Me";
    sPage += "</div>";

    sPage += "</div>"; // MainMenuBody

    sPage += "</div>"; // MainMenuFrame

    sPage += "<div id='Toast' class='Toast'></div>";

    document.getElementById("Main").innerHTML = sPage;
}

function HamburgerMenu() {
    let sPage = "";
    sPage += "<div class='MenuHeaderImageContainer bouncy' title='More info on the project'>";
    sPage += "<a href='https://github.com/jparker2006/PasswordStore/blob/master/README.md'>";
    sPage += "<img src='Images/InfoIcon.png' style='height: 52px; width: 52px;'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div class='MenuHeaderImageContainer bouncy' style='animation-delay:0.07s' title='feel free to look at and edit all the code behind this project'>";
    sPage += "<a href='https://github.com/jparker2006/PasswordStore'>";
    sPage += "<img src='Images/GitHub48.png'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div class='MenuHeaderImageContainer bouncy' style='animation-delay:0.14s' title='How it works'>";
    sPage += "<a href='https://www.atpinc.com/blog/what-is-aes-256-encryption'>";
    sPage += "<img src='Images/WindowIcon128.png' style='height: 48px; width: 48px;'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div class='MenuHeaderImageContainer bouncy' style='animation-delay:0.21s' title='Toast!'>";
    sPage += "<a href=\"javascript:ToastIconClick()\">";
    sPage += "<img src='Images/Toast128.png' style='height: 48px; width: 48px;'>";
    sPage += "</a>";
    sPage += "</div>";

    document.getElementById("MainMenuHeader").innerHTML = sPage;
    document.getElementById("MenuIcon").setAttribute("onClick", "javascript: CloseHamburgerMenu();");
}

function CloseHamburgerMenu() {
    document.getElementById("MainMenuHeader").innerHTML = "The Password Store";
    document.getElementById("MenuIcon").setAttribute("onClick", "javascript: HamburgerMenu();");
}

function ToastIconClick() {
    document.getElementById('Toast').innerHTML = "<div class='ToastMsg'>Toast!</div>";
    setTimeout(function(){ document.getElementById('Toast').innerHTML = ''; }, 5000);
}
