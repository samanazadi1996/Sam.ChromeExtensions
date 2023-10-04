var addConnectionsSrc = `var buttons = document.getElementsByTagName("path");
for (let index = 0; index < buttons.length; index++) {
  const element = buttons[index];
  if (
    element.attributes["d"].value ==
    "M9 4a3 3 0 11-3-3 3 3 0 013 3zM6.75 8h-1.5A2.25 2.25 0 003 10.25V15h6v-4.75A2.25 2.25 0 006.75 8zM13 8V6h-1v2h-2v1h2v2h1V9h2V8z"
  ) {
    element.parentNode.parentNode.parentNode.click();
  }
}
`;
var inviteConnectionsSrc = `
 Array.from(document.querySelectorAll('span')).find(el => el.innerText === 'Invite connections').parentNode.click()
 function AddToPage() {
    var array = document.getElementsByClassName(
        "invitee-picker-connections-result-item__checkbox"
    );
    for (let index = 0; index < array.length; index++) {
        array[index].parentNode.click();
    }
}
  
var i = 1;
function myLoop() {
    setTimeout(function () {
        var temp = document.getElementById("invitee-picker-results-container");
        if (temp) {
            temp.scrollTop = temp.scrollHeight
            i++;
        }
        if (i < 20) {
            myLoop();
        }
        else {
            AddToPage()
        }
    }, 1000);
}
myLoop();

 `
var likeAllSrc=`
var buttons = document.querySelectorAll('use[href="#thumbs-up-outline-medium"]');
for (let index = 0; index < buttons.length; index++) {
  const element = buttons[index];
element.parentElement.parentElement.parentElement.parentElement.click()}
`

document.addEventListener("DOMContentLoaded", function () {
    var addConnectionsButton = document.getElementById("addConnectionsButton");
    var inviteConnectionsButton = document.getElementById("InviteConnectionsButton");
    var likeAllButton = document.getElementById("LikeAll");

    chrome.tabs.executeScript(null, {
        code: `Array.from(document.querySelectorAll('span')).find(el => el.innerText === 'Invite connections')`

    }, response => {

        if (response[0])
            inviteConnectionsButton.style.display = ""
    });

    addConnectionsButton.addEventListener("click", function () {
        chrome.tabs.executeScript(null, {
            code: addConnectionsSrc

        }, response => {
            const pageData = response[0];

            if (!pageData) {
                console.log("Could not get data from page.");
                return;
            }
        });
    });

    inviteConnectionsButton.addEventListener("click", function () {
        chrome.tabs.executeScript(null, {
            code: inviteConnectionsSrc

        }, response => {
            const pageData = response[0];

            if (!pageData) {
                console.log("Could not get data from page.");
                return;
            }
        });
    });
    likeAllButton.addEventListener("click", function () {
        chrome.tabs.executeScript(null, {
            code: likeAllSrc

        }, response => {
            const pageData = response[0];

            if (!pageData) {
                console.log("Could not get data from page.");
                return;
            }
        });
    });

});
