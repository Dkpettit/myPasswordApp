// const { bulkcreate } = require("../../../../../Users/ll68534/Downloads/filename.json");

import accountdb, { bulkcreate, getData, createEle } from "./module.js";

let db = accountdb("Accountdb", {
  accounts: "++id, name, loginid, password",
});

//input tags
const accountId = document.getElementById("accountId");
const accountName = document.getElementById("accountName");
const loginId = document.getElementById("loginId");
const loginIdSm = document.getElementById("loginId-sm");
const password = document.getElementById("password");
const passwordSm = document.getElementById("password-sm");
const password2 = document.getElementById("password-sm");

//buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");
const btnsave = document.getElementById("btn-save");

//nav links
const createLink = document.getElementById("createLink");
const readLink = document.getElementById("readLink");
const updateLink = document.getElementById("updateLink");
const deleteLink = document.getElementById("deleteLink");
const saveLink = document.getElementById("saveLink");

//modal elements
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const btngenerate = document.getElementById("generate");

let pswdObj = [];
let loadedData;

//nav
const navToggle = document.querySelector(".nav-toggle");

const navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

//generate a password
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

btngenerate.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  let passwordString = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
  password.value = passwordString;
  password2.value = passwordString;
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // Doesn't have a selected type
  if (typesCount === 0) {
    return "";
  }

  // create a loop
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

//randomizers
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//notfound
const notfound = document.getElementById("notfound");

//insert value using create button
btncreate.onclick = (event) => {
  let flag = bulkcreate(db.accounts, {
    name: accountName.value,
    loginId: loginId.value,
    password: password.value,
  });

  accountName.value = loginId.value = password.value = "";

  getData(db.accounts, (data) => {
    accountId.value = data.id + 1 || 1;
  });

  table();

  let insertmsg = document.querySelector(".insertmsg");

  getMsg(flag, insertmsg);
};

//insert value using create Link from nav
createLink.addEventListener("click", () => {
  let flag = bulkcreate(db.accounts, {
    name: accountName.value,
    loginId: loginIdSm.value,
    password: passwordSm.value,
  });

  accountName.value = loginIdSm.value = passwordSm.value = "";

  getData(db.accounts, (data) => {
    accountId.value = data.id + 1 || 1;
  });

  table();
  smalltable();

  let insertmsg = document.querySelector(".insertmsg");

  getMsg(flag, insertmsg);
});

//Read All button event
btnread.onclick = () => {
  table();
  smalltable();
};
//readLink event
readLink.onclick = () => {
  table();
  smalltable();
};

//Save Button
btnsave.onclick = () => {
  console.log(pswdObj);
  saveText(JSON.stringify(pswdObj));
};

//saveLink event
saveLink.onclick = () => {
  saveText(JSON.stringify(pswdObj));
};

// Update button event;
btnupdate.onclick = () => {
  const id = parseInt(accountId.value || 0);
  if (id) {
    db.accounts
      .update(id, {
        name: accountName.value,
        loginId: loginId.value,
        password: password.value,
      })
      .then((updated) => {
        let get = updated ? true : false;
        let updatemsg = document.querySelector(".updatemsg");
        getMsg(get, updatemsg);

        accountName.value = loginId.value = password.value = "";
      });
    table();
    smalltable();
  }
};

//updateLink event
updateLink.onclick = () => {
  const id = parseInt(accountId.value || 0);
  if (id) {
    db.accounts
      .update(id, {
        name: accountName.value,
        loginId: loginIdSm.value,
        password: passwordSm.value,
      })
      .then((updated) => {
        let get = updated ? true : false;
        let updatemsg = document.querySelector(".updatemsg");
        getMsg(get, updatemsg);

        accountName.value = loginIdSm.value = passwordSm.value = "";
      });
    table();
    smalltable();
  }
};

//delete records
btndelete.onclick = () => {
  db.delete();
  db = accountdb("Accountdb", {
    accounts: "++id, name, loginid, password",
  });
  db.open();
  table();
  smalltable();
  textID(accountId);

  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
};

//deleteLink event
deleteLink.onclick = () => {
  db.delete();
  db = accountdb("Accountdb", {
    accounts: "++id, name, loginid, password",
  });
  db.open();
  table();
  smalltable();
  textID(accountId);

  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
};

var text = new Object();
//TODO: create an upload button, link and event using below *********************************
// for (var item in data) {
//   console.log(data[item].name);
//   let flag = bulkcreate(db.accounts, {
//     name: accountName.value,
//     loginId: loginId.value,
//     password: password.value,
//   });

//   accountName.value = loginId.value = password.value = "";

//   getData(db.accounts, (data) => {
//     accountId.value = data.id + 1 || 1;
//   });

//   table();

//   let insertmsg = document.querySelector(".insertmsg");

//   getMsg(flag, insertmsg);
// }

//window onload event
window.onload = () => {
  textID(accountId);

  var myInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  };

  let myRequest = new Request("./js/koala.json", myInit);

  fetch(myRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      loadedData = data;
    });
};

function saveText(text) {
  var a = document.createElement("a");
  console.log(loadedData);
  a.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  a.setAttribute("download", "koala.json");
  a.click();
}

function textID(textboxId) {
  getData(db.accounts, (data) => {
    textboxId.value = data.id + 1 || 1;
  });
}

function table() {
  const tbody = document.getElementById("tbody");

  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  pswdObj = []; //clear the array of objects so accounts don't duplicate...when saving to file

  getData(db.accounts, (data) => {
    if (data) {
      pswdObj.push(data);

      notfound.textContent = "";
      createEle("tr", tbody, (tr) => {
        for (const value in data) {
          createEle("td", tr, (td) => {
            td.textContent = data[value];
          });
        }
        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-edit btnedit";
            i.setAttribute("data-id", data.id);
            i.onclick = editbtn;
          });
        });

        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute("data-id", data.id);
            i.onclick = deletebtn;
          });
        });

        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-clipboard btncopy";
            i.setAttribute("data-id", data.id);
            i.onclick = copybtn;
          });
        });
      });
    } else {
      notfound.textContent = "No records found in the database.";
    }
  });
}

function smalltable() {
  const tbody = document.getElementById("tbodySm");

  while (tbodySm.hasChildNodes()) {
    tbodySm.removeChild(tbody.firstChild);
  }
  pswdObj = []; //clear the array of objects so accounts don't duplicate...when saving to file

  getData(db.accounts, (data) => {
    if (data) {
      pswdObj.push(data);
      notfound.textContent = "";
      createEle("tr", tbodySm, (tr) => {
        for (const value in data) {
          createEle("td", tr, (td) => {
            td.textContent = data[value];
          });
        }
        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-edit btnedit";
            i.setAttribute("data-id", data.id);
            i.onclick = editbtn;
          });
        });

        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute("data-id", data.id);
            i.onclick = deletebtn;
          });
        });

        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-clipboard btncopy";
            i.setAttribute("data-id", data.id);
            i.onclick = copybtn;
          });
        });
      });
    } else {
      notfound.textContent = "No records found in the database.";
    }
  });
}

function editbtn(event) {
  let id = parseInt(event.target.dataset.id);

  db.accounts.get(id, (data) => {
    accountId.value = data.id || 0;
    accountName.value = data.name || "";
    loginId.value = data.loginId || "";
    loginIdSm.value = data.loginId || "";
    passwordSm.value = data.password || "";
    password.value = data.password || "";
  });
}

function deletebtn(event) {
  let id = parseInt(event.target.dataset.id);

  db.accounts.delete(id);
  table();
}

function copybtn(event) {
  let id = parseInt(event.target.dataset.id);
  const textarea = document.createElement("textarea");

  db.accounts.get(id, (data) => {
    textarea.value = data.password || "";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    let copymsg = document.querySelector(".copymsg");
    getMsg(true, copymsg);
  });
}

function getMsg(flag, element) {
  if (flag) {
    element.className += " movedown";

    setTimeout(() => {
      element.classList.forEach((classname) => {
        classname === "movedown"
          ? undefined
          : element.classList.remove("movedown");
      });
    }, 4000);
  }
}
