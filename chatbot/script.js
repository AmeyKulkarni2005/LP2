const botdata = {
    "hello": "Hi there! How can I help you with PICT admissions or courses?",
    "courses": "We offer B.E. in Computer Engineering, IT, and Electronics, plus ME and PhD.",
    "fees": "The fees are approximately ₹1.1L to ₹1.4L per year depending on category.",
    "admission": "Admissions are based on MHT-CET and JEE Main scores via CAP rounds.",
    "placement": "Our average package is 7-10 LPA, with the highest reaching 40+ LPA.",
    "contact": "You can email us at info@pict.edu or call +91-20-24371101.",
    "bye": "Goodbye! Have a great day!"
};

const chatwindow = document.getElementById("chat-window");
const chatmessages = document.getElementById('chat-messages');
const chatinput = document.getElementById('user-input');

function togglechat() {
    chatwindow.classList.toggle('hidden');
}

function handleSend() {
    const userinput = chatinput.value.trim().toLowerCase();
    if (!userinput) return;

    appendmessage(userinput, 'user');
    chatinput.value = "";

    setTimeout(() => {
        let response = "I am not sure about that, try asking something else...";

        for (let kw in botdata) {
            if (userinput.includes(kw)) {
                response = botdata[kw];
            }
        }
        appendmessage(response, 'bot');
    }, 500);
}

function appendmessage(text, user) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${user}`;
    msgDiv.innerText = text;
    chatmessages.appendChild(msgDiv);

    chatmessages.scrollTop = chatmessages.scrollHeight;
}