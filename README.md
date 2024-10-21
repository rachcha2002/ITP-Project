# Automotive Center Management System

This system is Automotive Center Mangement System that customized for Neo Tech Motors and Services. This is web based application based on MERN technology. The a[pplication is based on to ease the operations in a n automotive service center and give better efficiency in management processes.
This web consist of major two frontends one for Neo Tech Customerrs and one for Neo Tech Staff customer we app can be accessed by customers and staff we app can be acces by the staff to do their work inside the organization.Also this system majorly focused on eight functions.

## Key Features which are eight functions and contributors(OctagonIT Team)*


- **Employee Management(HR)** - [Team Leader-Rachcith Tharana (rachcha2002)](https://github.com/rachcha2002)
- **Finance Management** - [Kavinda Dimuth](https://github.com/kavinda0126)
- **Inventory Management** - [Tharindu Eranga (ThariiEranga)](https://github.com/ThariiEranga)
- **Services Management** - Udara
- **Customer Affair Management** - Githadi Sandaruvi
- **Appointments Management** - [Nihinsa Dilmani (NihinsaHV)](https://github.com/NihinsaHV).
- **Mobile Services Management** - Isisri
- **Vehicle Management** - Vinuri

## Technology Stack

The NeoTech system leverages a modern tech stack to ensure optimal performance and scalability:

### Frontend
- **React** for building an interactive and responsive user interface.
- **React Bootstrap** for UI styling and component layout.
- **Axios** for seamless API integration.
- **ReactCharts/Echarts** for graphical implentations

### Backend
- **Node.js** and **Express.js** for handling server-side logic and APIs.
- **MongoDB** for database management, ensuring secure storage of customer, vehicle, and inventory data.
- **Mongoose** for database modeling and interaction.

### Additional Technologies
- **JWT (JSON Web Tokens)** for secure user authentication and authorization.
- **Firebase** for managing and storing mages and PDF records.
- **Nodemailer** for email services.

## Installation & Setup

To run this project locally, follow the steps below:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rachcha2002/neotech-automotive-center.git
   cd neotech-automotive-center
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following environment variables for backend:
     ```bash
     # Server Port
      PORT=5000
      
      # MongoDB
      MONGO_URL='your_mongodb_url_here'
      
      # PayHere
      MERCHANT_ID='your_merchant_id_here'
      MS='your_merchant_secret_here'
      RETURN_URL='http://localhost:3000/customer/payments/onlinepayment/verify/'
      CANCEL_URL='http://localhost:3000/customer/payments/onlinepayment/fail/'
      NOTIFY_URL='your_notify_url_here'
      
      # Firebase
      API_KEY='your_firebase_api_key_here'
      AUTH_DOMAIN='your_auth_domain_here'
      PROJECT_ID='your_project_id_here'
      STORAGE_BUCKET='your_storage_bucket_here'
      MESSAGING_SENDER_ID='your_messaging_sender_id_here'
      APP_ID='your_app_id_here'
      
      # Gmail (for sending emails)
      EMAIL='your_email_here'
      PASSWORD='your_email_password_here'
      
      # HR Gmail (for HR-related emails)
      HRMAIL='your_hr_email_here'
      HRPWD='your_hr_email_password_here'

     ```

4. **Start the Application**
   ```bash
   npm install (both backend and frontend)
   npm start
   ```
   The application will run locally on `http://localhost:3000`.

## My Contribution

I have contributed to the development of the HR Management of NeoTech Automotive Center Management System with the following responsibilities:

- **Employee Registration**: Implemented employee registration, profile management, and authentication and authorization.
- **Employee Salary Mangement**: Developed the slary mangement feture for salary makings with intergratedof relavant work performance.
- **Leave Mangement Syatem**: Implement leave management system for employees andtrack the employee leaves.
- **Attendance Management**: Designed and built the attendance management system to keep track of attendance of employees.
- **HR configurations**: Integrated the HR role systems to divide permisions and nopay log system.

## Live Demo

Try out the live demo of the **NeoTech Automotive Center Management System** using the link below:

🔗 [Hosted Demo Link](https://neotechmotors.live/) 

### Demo Credentials

- **General Manager Login**
  - **Email**: saliya.neosl@gmail.com
  - **Password**: Neo@1234
- **HR Login**
  - **Email**: varuni.neo@gmail.com
  - **Password**: Varuni@1234



## Contact

For more information or any questions, feel free to contact me at [your-rachiththarana.com].

---

Feel free to customize this README to fit the details of your project! Let me know if you need further modifications.
