function MainMenuFrame() {
    let sPage = "";
    sPage += "<div class='MainMenuFrame'>";
    sPage += "<div class='MainMenuHeader'>";

    sPage += "<div class='MainMenuHeaderText' id='MainMenuHeader'>";
    sPage += "The Password Store";
    sPage += "</div>";

    sPage += "<div class='HamburgerMenuContainer' onClick='HamburgerMenu()' title='Menu'>";
    sPage += "<img src='Images/HamburgerMenu64.png' >";
    sPage += "</div>";

    sPage += "</div>"; // MainMenuHeader
    sPage += "</div>"; // MainMenuFrame

    sPage += "<div id='Toast' class='Toast'></div>";

    document.getElementById("Main").innerHTML = sPage;
}

function HamburgerMenu() {
    let sPage = "";
    sPage += "<div class='MenuHeaderImageContainer' title='More info on the project'>";
    sPage += "<a href='https://github.com/jparker2006/PasswordStore/blob/master/README.md'>";
    sPage += "<img src='Images/InfoIcon.png' style='height: 52px; width: 52px;'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div class='MenuHeaderImageContainer' title='feel free to look at and edit all the code behind this project'>";
    sPage += "<a href='https://github.com/jparker2006/PasswordStore'>";
    sPage += "<img src='Images/GitHub48.png'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div class='MenuHeaderImageContainer' title='How it works'>";
    sPage += "<a href='https://www.atpinc.com/blog/what-is-aes-256-encryption'>";
    sPage += "<img src='Images/WindowIcon128.png' style='height: 48px; width: 48px;'>";
    sPage += "</a>";
    sPage += "</div>";

    sPage += "<div class='MenuHeaderImageContainer' title='Close Menu' onClick='CloseHamburgerMenu()'>";
    sPage += "<img src='Images/Close64.png' style='height: 48px; width: 48px;'>";
    sPage += "</div>";
    document.getElementById("MainMenuHeader").innerHTML = sPage;
}

function CloseHamburgerMenu() {
    document.getElementById("MainMenuHeader").innerHTML = "The Password Store";
}
