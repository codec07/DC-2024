require('dotenv').config();

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    script.onload = function () {
        console.log(`${src} has been loaded.`);
        if (callback) callback();  // Call the callback once the script is loaded
    };

    script.onerror = function () {
        console.error(`Error loading ${src}`);
    };

    document.head.appendChild(script);
}

// Load PocketBase scripts and then initialize PocketBase
loadScript('/pocketbase.umd.js', function () {
    const pb = new PocketBase("http://127.0.0.1:8090");

    // SignIn function
    async function signIn(event) {
        event.preventDefault();

        // Authenticate with PocketBase as an admin
        const authData = await pb.admins.authWithPassword(
            process.env.DB_MAIL,
            process.env.DB_PASS
        );

        const data = {
            username: document.getElementById("signin-username").value,
            password: document.getElementById("signin-pass").value,
        };

        const records = await pb.collection("userdata").getFullList({
            sort: "-username",
        });

        let doesExist = false;

        records.forEach((element) => {
            if (element.username == data.username) {
                doesExist = true;
            }
        });

        if (doesExist) {
            alert("It seems there is an account with this username! Try to Login");
        } else {
            const record = await pb.collection("userdata").create(data);
            alert("Account for " + data.username + " created!");
            window.open(`/chatbot/app/app.html?uname=${data.username}`);
        }
    }

    // LogIn function
    async function logIn(event) {
        event.preventDefault();

        // Authenticate with PocketBase as an admin
        const authData = await pb.admins.authWithPassword(
            "aarush07codec@gmail.com",
            "AdminAuthPassDB"
        );

        const data = {
            username: document.getElementById("login-username").value,
            password: document.getElementById("login-pass").value,
        };

        const records = await pb.collection("userdata").getFullList({
            sort: "-username",
        });

        records.forEach((element) => {
            if (element.username == data.username && element.password == data.password) {
                alert(`Welcome ${data.username}`);
                window.open(`/chatbot/app/app.html?uname=${data.username}`);
            }
        });
    }

    // Attach the functions to the respective form submit events
    document.getElementById('signin-form').onsubmit = signIn;
    document.getElementById('login-form').onsubmit = logIn;
});

// Also load the .map file if necessary
loadScript('/pocketbase.umd.js.map');
