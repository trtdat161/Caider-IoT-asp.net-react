# Caider — IoT Robot Control & Management (Admin Only)

**Overview:**
Caider is a web application designed to control and manage the Caider robot hardware, including microcontrollers, expansion boards, servos, and motors. It enables sending real-time commands via MQTT and provides a secure admin-only interface for robot management.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** ASP.NET Core Web API (Minimal API) + EF Core
- **Database:** SQL Server
- **IoT Communication:** MQTT (`broker.hivemq.com:1883`)

## Key Features

- **Real-time Robot Control:** Send commands and receive status updates via MQTT.
- **Admin-only Access:** Registration and login restricted to a single admin account.
- **JWT Authentication:** Secure token-based authentication for API requests.
- **Database Mapping:** EF Core handles mapping between database tables and application models.
- **Persistent MQTT Service:** Dedicated service for reliable publish/subscribe communication with IoT hardware.

## My Contributions

- Developed frontend dashboard and real-time control interface using React.
- Implemented backend APIs and database models in ASP.NET Core with EF Core.
- Integrated MQTT communication for live robot control.
- Designed authentication system with JWT for secure admin access.

## Demo Video

Watch the full project demo:
[YouTube Demo](https://www.youtube.com/watch?v=Fhyi5ZbmBuc)
