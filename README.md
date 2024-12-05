Fire Truck Control System
=========================

A web-based control system for fire trucks built with Angular, providing real-time monitoring and control capabilities through WebSocket communication with an ESP32 device.

Features
--------

### 🚒 Real-time Control

- Live monitoring of truck status
- Remote control of truck components
- Real-time WebSocket connection status indicator

### 🎮 Control Panel

- Interactive dashboard for truck monitoring
- Real-time data visualization
- Multiple alert sound options (3 different alert sounds)
- WiFi reset functionality with confirmation
- Fire detection analytics (daily, weekly, monthly)

### 🌓 User Experience

- Dark/Light theme support
- Responsive design for mobile and desktop
- Secure authentication system with persistent login
- Interactive sidebar navigation

### 🔧 Technical Features

- WebSocket communication with ESP32
- Real-time data updates
- Secure user authentication
- Responsive layout for all devices
- Audio feedback system

Prerequisites
-------------

- Node.js (v14 or higher)
- Angular CLI
- ESP32 device with appropriate firmware
- Modern web browser

Installation
------------

1. Clone the repository:

`git clone https://github.com/spacecodee/ESP32FireTruckWebIoT.git`

2. Install dependencies:

`npm install`

3. Start the development server:

`ng serve`

4. Access the application at `http://localhost:4200`

Network Configuration
---------------------

To access the application from other devices in your local network:

`ng serve --host 0.0.0.0`

Then access using: `http://YOUR_LOCAL_IP:4200`

Project Structure
-----------------

src/

├── app/

│ ├── core/ # Core services and guards

│ ├── features/ # Feature modules

│ ├── shared/ # Shared components

│ └── view/ # Layout components

├── assets/

│ └── audio/ # Alert sound files

Contributing
------------

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

License
-------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

Acknowledgements
----------------

-   Angular team for the fantastic framework
-   TailwindCSS for the styling utilities
-   ESP32 community for the hardware support
