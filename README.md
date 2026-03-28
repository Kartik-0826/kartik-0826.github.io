# 🐕 DogOS – Smart Dog Training Lead System

A modern, minimal landing page with an integrated lead capture system that sends customer data directly to Google Sheets using Google Apps Script.

---

## 🚀 Features

* 🎯 Clean, responsive landing page (Dog training niche)
* 💬 WhatsApp floating contact button
* 📋 Popup lead capture form
* ⚡ Real-time data submission to Google Sheets
* 🔗 Google Apps Script backend (no server needed)
* 📱 Mobile-friendly UI

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Google Apps Script
* **Database:** Google Sheets
* **Integration:** Fetch API + FormData

---

## 📂 Project Structure

```
DogOS/
│── index.html
│── css/
│   └── style.css
│── js/
│   └── main.js
```

---

## ⚙️ How It Works

1. User fills out the form on the website
2. JavaScript sends data using `fetch()`
3. Google Apps Script receives the request (`doPost`)
4. Data is appended to Google Sheets
5. Lead is stored instantly

---

## 🔗 Google Sheets Integration

* Data is stored in:

  * Name
  * Phone
  * Issue
  * City
  * Timestamp

* Uses:

```javascript
sheet.appendRow([...]);
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/DogOS.git
```

---

### 2. Setup Google Sheet

* Create a Google Sheet
* Add columns:

  ```
  Name | Phone | Issue | City | Timestamp
  ```

---

### 3. Setup Google Apps Script

* Go to: https://script.google.com
* Create new project
* Add:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp
    .openById("YOUR_SHEET_ID")
    .getSheetByName("Sheet1");

  var data = e.parameter;

  sheet.appendRow([
    data.name,
    data.phone,
    data.issue,
    data.city,
    new Date()
  ]);

  return ContentService.createTextOutput("SUCCESS");
}
```

---

### 4. Deploy Script

* Deploy → Manage deployments
* Type: **Web App**
* Access: **Anyone**
* Copy `/exec` URL

---

### 5. Connect to Frontend

Update in `main.js`:

```javascript
fetch("YOUR_WEB_APP_URL", {
  method: "POST",
  body: formData
});
```

---

## 📸 Preview

> Add screenshots of your website here

---

## 💡 Future Improvements

* WhatsApp auto-message after form submission
* Admin dashboard for lead tracking
* Duplicate lead detection
* Email notifications
* CRM integration

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🙌 Author

Built by 
kartik verma 
utkarsh chaurasia
bishwas kumar 
vikas joshi
---
