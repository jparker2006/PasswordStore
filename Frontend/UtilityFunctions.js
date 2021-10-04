// encryption functions

var HashThis = (sText, nRounds) => { // sha3_256 function
    for (let x = 0; x < nRounds; x++) {
        sText = sha3_256(sText);
    }
    return sText;
}

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function AESEncrypt(sEncrypt, sPassphrase) {
    return CryptoJS.AES.encrypt(sEncrypt, sPassphrase);
}

function AESDecrypt(sEncrypt, sPassphrase) {
    return hex2a(CryptoJS.AES.decrypt(AESEncrypt(sEncrypt, sPassphrase), sPassphrase).toString());
}

function OnChangePlainText() {
    var sMessage = document.getElementById('PlainTextForAES').value;
    var sPassphrase = document.getElementById('AESPassphrase').value;
    var encrypted = CryptoJS.AES.encrypt(sMessage, sPassphrase);
    document.getElementById('CipherText').value = encrypted;
    var decrypted = CryptoJS.AES.decrypt(encrypted, sPassphrase);
    var sDecrypted = hex2a(decrypted.toString());
    document.getElementById('DecryptedText').value = sDecrypted;
    document.getElementById('Feedback').innerHTML = 'Length: ' + sDecrypted.length;
}

function OnChangeCryptoText() {
    var sPassphrase = document.getElementById('AESPassphrase').value;
    var encrypted = document.getElementById('CipherText').value;
    var decrypted = CryptoJS.AES.decrypt(encrypted, sPassphrase);
    var sDecrypted = hex2a(decrypted.toString());
    document.getElementById('DecryptedText').value = sDecrypted;
    document.getElementById('PlainTextForAES').value = sDecrypted;
    document.getElementById('Feedback').innerHTML = 'Length: ' + sDecrypted.length;
}
// end of encryption functions

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

