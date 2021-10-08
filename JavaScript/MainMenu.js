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

    sPage += "<div class='MenuDivider FirstDivider' onClick='ViewPasswordsFrame()'>"; // view passwords
    sPage += "<br>View Passwords";
    sPage += "</div>";

    sPage += "<div class='MenuDivider SecondDivider' onClick='AddPasswordsFrame()'>"; // add password
    sPage += "<br>Store a Password";
    sPage += "</div>";

    sPage += "<div class='MenuDivider ThirdDivider' onClick='LosePasswordsFrame()'>";  // minus password
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
    sPage += "<div class='MenuHeaderImageContainer bouncy' title='More info on the project' onClick='AboutProjectFrame()'>";
    sPage += "<img src='Images/InfoIcon.png' style='height: 52px; width: 52px;'>";
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

function AboutProjectFrame() {
    let sPage = "";
    sPage += "<div class='AboutFrame RoundedBox'>";
    sPage += "Welcome to Password Store<br><br>";
    sPage += "This site uses AES-256 encryption and SHA3-256 hashing to make sure your passwords kept safe and secure<br><br>";
    sPage += "The best part is that I (the programmer) never get see your password or send it across the internet<br><br>";
    sPage += "But dont trust me trust my code<br><br>";
    sPage += "Password Store is completely open sourced on <a href='https://github.com/jparker2006/PasswordStore'>github</a><br><br>";
    sPage += "If you have any questions you can contact me <a>here</a><br><br>"; // add when contact me is updated
    sPage += "<div class='MenuDivider' onClick='MainMenuFrame()'>"; // view passwords
    sPage += "<br>Back To Menu";
    sPage += "</div>";
    sPage += "</div>";

    document.getElementById("Main").innerHTML = sPage;
}
