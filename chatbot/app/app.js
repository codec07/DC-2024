import { GoogleGenerativeAI } from "@google/generative-ai";

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

async function searchGemini() {
    const API_KEY = "AIzaSyB6G4swKaeHoQ5NZQZbVd0k8xecM6OZP6Q";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = document.getElementById("inpBox").value + " give me an answer without any special characters";
    const result = await model.generateContent(prompt);

    document.getElementById("outputBox").innerHTML = result.response.text();

    loadScript('/pocketbase.umd.js.map');
    loadScript('/pocketbase.umd.js', function () {
        const pb = new PocketBase("http://127.0.0.1:8090");

        // SignIn function
        async function createNewChat() {
            // Authenticate with PocketBase as an admin
            const authData = await pb.admins.authWithPassword(
                "aarush07codec@gmail.com",
                "AdminAuthPassDB"
            );

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const uname = urlParams.get('uname');


            const data = {
                username: uname,
                userChat: prompt,
                botResponse: result.response.text(),
            };

            const record = await pb.collection("chatbot").create(data);

            const chatDiv = document.createElement('div');
            chatDiv.classList.add('prevChats');

            const chatQues = document.createElement('h1');
            chatQues.textContent = prompt;

            const chatAns = document.createElement('p');
            chatAns.textContent = result.response.text();

            // Appending
            chatDiv.appendChild(chatQues);
            chatDiv.appendChild(chatAns);

            const mainDiv = document.getElementById('previousChats');
            mainDiv.appendChild(chatDiv);
        }

        createNewChat()
    });

}

// Expose the searchGemini function to the global scope
window.searchGemini = searchGemini;

async function loadChats() {
    loadScript('/pocketbase.umd.js.map');
    loadScript('/pocketbase.umd.js', function () {
        const pb = new PocketBase("http://127.0.0.1:8090");

        // SignIn function
        async function loadChats() {
            // Authenticate with PocketBase as an admin
            const authData = await pb.admins.authWithPassword(
                "aarush07codec@gmail.com",
                "AdminAuthPassDB"
            );

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const uname = urlParams.get('uname');

            const records = await pb.collection("chatbot").getFullList({
                sort: "-username",
            });

            records.forEach((element) => {
                if (element.username == uname) {
                    const chatDiv = document.createElement('div');
                    chatDiv.classList.add('prevChats');

                    const chatQues = document.createElement('h1');
                    chatQues.textContent = element.userChat;

                    const chatAns = document.createElement('p');
                    chatAns.textContent = element.botResponse;

                    // Appending
                    chatDiv.appendChild(chatQues);
                    chatDiv.appendChild(chatAns);

                    const mainDiv = document.getElementById('previousChats');
                    mainDiv.appendChild(chatDiv);
                }
            });
        }

        loadChats()
    });
}

window.loadChats = loadChats;