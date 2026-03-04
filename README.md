# AI-Powered Gmail Assistant

An AI-powered Chrome Extension integrated with a Spring Boot backend that generates professional email replies and composes emails automatically from subject lines.

---

## 🚀 Features

- Generate AI-powered replies inside Gmail
- Compose full professional emails from subject lines
- Context-aware detection (Reply vs New Compose)
- Real-time DOM injection using MutationObserver
- Spring Boot REST API backend
- Secure AI API integration

---

## 🛠 Tech Stack

Frontend (Chrome Extension):
- JavaScript
- DOM Manipulation
- MutationObserver
- Fetch API

Backend:
- Java
- Spring Boot
- REST API
- OpenAI API Integration

---

## 🧠 How It Works

1. Chrome Extension detects Gmail compose window.
2. Injects custom "AI Reply" button.
3. Detects whether user is replying or composing new email.
4. Sends structured prompt to Spring Boot backend.
5. Backend processes AI request and returns generated email.
6. Extension inserts generated email into compose box.

---

## 📦 Installation

### Backend

1. Clone repository
2. Add your OpenAI API key in:
   `application.properties`
3. Run:  


### Extension

1. Open Chrome
2. Go to `chrome://extensions`
3. Enable Developer Mode
4. Click "Load Unpacked"
5. Select `extension` folder

---

## 📌 Future Improvements

- Tone selection dropdown
- Draft improvement mode
- Save generated templates
- Deployment on cloud

---

## 👨‍💻 Author

Harsh Nimbalkar