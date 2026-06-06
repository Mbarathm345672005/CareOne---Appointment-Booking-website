# Care One - Clinical Excellence in Skin & Hair Care

Care One is a modern, full-stack medical and aesthetic booking application designed for dermatological clinics. It features patient booking systems, an administrative dashboard to manage appointments and content, and a fully offline-compatible local architecture.

---

## 🚀 Key Features

* **Patient & Admin Authentication**: State-management via React context and secure session JWT authentication.
* **Interactive Booking System**: Patients can easily book sessions for Skin Rejuvenation, Hair Restoration, Laser Therapy, etc.
* **Administrative Panel**: Manage patient appointments, update medical service content, and view clinic statistics.
* **Offline Mock MongoDB (Local Zero-Config Mode)**: Automatically persistence-maps database calls to a local JSON file (`db.json`) allowing developers to run the application instantly without installing MongoDB.
* **Beautiful Styling**: Sleek UI themed with Material Design guidelines, smooth animations, and clean layouts.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Tailwind CSS, Vite
* **Backend**: Node.js, Express.js
* **Database / ODM**: Mongoose (supports offline JSON database or MongoDB Atlas)

---

## 💻 Local Quick Start

Follow these steps to get the application running locally on your computer:

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd careone_new
```

### Step 2: Install Dependencies
Install dependencies at the root directory, backend directory, and frontend directory:
```bash
# Install root package (for running both servers concurrently)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Go back to the root directory
cd ..
```

### Step 3: Configure Environment Variables
Create a `.env` file in the `backend/` directory (you can copy the provided `backend/.env` file if it exists, or create one).
Example **`backend/.env`** contents:
```env
# MongoDB Connection (Falls back to local offline db.json automatically if using our mock configuration)
MONGODB_URI=mongodb+srv://s9arr0w:w7KIAkuxSQnmc4dZ@cluster0.7jhobvx.mongodb.net/careone?appName=Cluster0

# JWT Secret for Token Generation
JWT_SECRET=careone_jwt_secret_change_this_in_production_2026

# Server Port
PORT=5000

# Client URL (For Frontend CORS Permissions)
CLIENT_URL=http://localhost:3000
```

### Step 4: Seed the Database
Initialize your local database with default Admin and Patient accounts. In the `backend` folder, run:
```bash
cd backend
node seed.js
cd ..
```
This will print out the generated test credentials:
* **Admin Login**:
  * **Email**: `admin@careone.com`
  * **Password**: `adminpassword123`
* **Patient Login**:
  * **Email**: `patient@careone.com`
  * **Password**: `patientpassword123`

### Step 5: Start the Development Servers
From the **root directory** (`careone_new`), run the following command to spin up the React app and Express server concurrently:
```bash
npm run dev
```

* **Frontend Dashboard**: Open [http://localhost:3000](http://localhost:3000) in your browser.
* **Backend Server**: Running at [http://localhost:5000](http://localhost:5000).
* **API Health Check**: Access [http://localhost:5000/api/health](http://localhost:5000/api/health) to inspect service health.

---

## 🌐 Production Deployment

Refer to the custom [Deployment Guide](C:/Users/ELCOT/.gemini/antigravity-ide/brain/1b6c4b43-7dfc-4c27-a57e-80013c0ffbd1/deployment_guide.md) created for this workspace to learn how to deploy the application on **Netlify** (Frontend) and **Render** (Backend) using Git or local builds without CORS issues!
