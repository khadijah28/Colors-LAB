const urlBase = 'http://COP4331-5.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

// eslint-disable-next-line no-unused-vars
function doLogin() {
	userId = 0;
	firstName = "";
	lastName = "";

	const login = document.getElementById("login-name").value;
	const password = document.getElementById("login-password").value;
	// const hash = md5( password );

	document.getElementById("login-result").innerHTML = "";

	const tmp = { login: login, password: password };
	// const tmp = {login:login,password:hash};
	const jsonPayload = JSON.stringify(tmp);

	const url = urlBase + '/Login.' + extension;

	const xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				const jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;

				if (userId < 1) {
					document.getElementById("login-result").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("login-result").innerHTML = err.message;
	}
}

function saveCookie() {
	const minutes = 20;
	const date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

// eslint-disable-next-line no-unused-vars
function readCookie() {
	userId = -1;
	const data = document.cookie;
	const splits = data.split(",");
	for (let i = 0; i < splits.length; i++) {
		const thisOne = splits[i].trim();
		const tokens = thisOne.split("=");
		if (tokens[0] === "firstName") {
			firstName = tokens[1];
		} else if (tokens[0] === "lastName") {
			lastName = tokens[1];
		} else if (tokens[0] === "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}

	if (userId < 0) {
		window.location.href = "index.html";
	} else {
		// document.getElementById("user-name").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

// eslint-disable-next-line no-unused-vars
function doLogout() {
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

// eslint-disable-next-line no-unused-vars
function addColor() {
	const newColor = document.getElementById("color-text").value;
	document.getElementById("color-add-result").innerHTML = "";

	const tmp = { color: newColor, userId: userId };
	const jsonPayload = JSON.stringify(tmp);

	const url = urlBase + '/AddColor.' + extension;

	const xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				document.getElementById("color-add-result").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("color-add-result").innerHTML = err.message;
	}
}

// eslint-disable-next-line no-unused-vars
function searchColor() {
	const srch = document.getElementById("search-text").value;
	document.getElementById("color-search-result").innerHTML = "";

	let colorList = "";

	const tmp = { search: srch, userId: userId };
	const jsonPayload = JSON.stringify(tmp);

	const url = urlBase + '/SearchColors.' + extension;

	const xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				document.getElementById("color-search-result").innerHTML = "Color(s) has been retrieved";
				const jsonObject = JSON.parse(xhr.responseText);

				for (let i = 0; i < jsonObject.results.length; i++) {
					colorList += jsonObject.results[i];
					if (i < jsonObject.results.length - 1) {
						colorList += "<br />\r\n";
					}
				}

				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("color-search-result").innerHTML = err.message;
	}
}
