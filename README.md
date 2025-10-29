[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/_KG6YNPd)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20232148)


# PROJECT VISION
FOR music listeners
WHO want a way to keep track of and review songs theyve listened
The JukeBoxd is a webapp
THAT allows users to save and reviews for songs they listen to
UNLIKE Stats.FM, which only shows your listening history
OUR PRODUCT allows you to view listening history, and write your personal reviews for songs

JukeBoxd by:

Nakib Abedin, Tedd Lee, Muslim Hussaini, Ishmam Khan, Sudiptto Biswas


# HOW TO INSTALL:

- Clone the repository gh clone ...
- Make sure you have npm install/node js
- Run npm install i
- To run application: npm run dev
- Enjoy!

# Software Architecture of Project

## Initial Architectural Decisions

## **Nonfunctional Product Characteristics**
- **Scalability:** Supports multiple concurrent users submitting and viewing reviews without performance degradation.  
- **Security:** Implements secure authentication and data protection, typically would use Spotify OAuth, but for this class, can build out Oauth using Flask Login & JWTs (JSON WEB TOKENS)
- **Usability:** Clean, intuitive UI using **React + TypeScript** for accessibility and responsiveness.  
- **Performance:** Fast page loads and efficient API communication for smooth interactions.  
- **Maintainability:** Modular, layered architecture ensuring readability and easy updates.  

## **Software Compatibility**
- **Frontend:** Fully compatible with major browsers (Chrome, Firefox, Safari, Edge) and is responsive.
- **Backend:** Lightweight **Node.js** or **Python** backend, utilizing microservices, most likely a standard Flask library
- **API Integration:** Using **Spotify API**, however, can start with pre-loaded data or an open music data API

## **Number of Users**
- **Initial Scale:** Small, with scalability for a few hundred users.  

## **Product Lifetime**

- **Duration:** Should be standing, the general structure of this app is a CRUD app, and unless API's get affected, it should last without major bugs.  
- **Future Expansion:** Easily adaptable to add playlists, recommendations, by getting more data.

## **Software Reuse**
- **UI Components:** Reusable **React** components (e.g., song cards, review forms, user profiles), can utilize React libraries such as FluentUI

---
# **Layered Architectural Model**

## **User Interface**
- Web Browser  
- Mobile Web View (Responsive React App)

## **User Interaction Management**
- User Authentication (Login / Signup / Logout)  
- Profile Management  
- Review Submission Forms  
- Song Search and Selection Interface  
- Rating and Comment System (Review System)

## **Application Services**
- Reviewing Protocol (Create, Read, Update, Delete)  
- Song Metadata Access -> Spotify Web API (ideal), Last.FM, Deezer's API (IE, music API we can get access to, as some, like Spotify, require auth + limited usage) 
- Like / Favorite System  
- Current Songs & Recent Reviews Feed  

## **Integration Services**
- Spotify API Integration (for track data, cover art, artist info) or Itunes FM 
- Cloud Storage for User Avatars and Review Media 
- External Analytics, like usage tracking, etc, for telemetry

## **Shared Infrastructure Services**
- Authentication and Authorization Services  
- Application and Media Storage  
- Database Management (User, Review, Song tables)  
- API Routing and Load Balancing  

---

<img width="680" height="741" alt="image" src="https://github.com/user-attachments/assets/cdac80e3-4e80-4c65-8bea-929b0089d65d" />

---

## **Implementation**

### **Frameworks** 
- Frontend: React + TypeScript -> Component based, re-usable UI. TypeScript is used because strong typing reduces runtime errors and is more suitable for long-term projects. Can use libraries such as FluentUI (component library), which is responsive in nature & tested by Microsoft, so they have good accessibility ratings. (The more accessible an application is, the more users can be on it)
- Backend: Flask (Python) -> Lightweight, can integrate RESTful APIs and JWT-based authentication. Also supports libraries, such as Flask Mail (or can use the newer Python SMTP), and the immense Python ecosystem. Prototypes are typically built using Python backends due to the speed of development. Can integrate the flask-caching library to cache song metadata.  
---
### **Database** 
- Database: PostgreSQL -> Ideal for structured data (Users, Songs, Reviews, Ratings). Great scaling as a database for starting. Supports indexing and foreign keys for quick lookups. Note that because of the massive amount of songs, only songs that have been REVIEWED will be populated in the database. There are hundreds of millions of songs, but not all of them are going to have reviews. Also project starting will not have access to billions of songs due to API & budget restrictions. Can also wrap an ORM (Object-Relational Mapper) around PostgreSQL. This makes writing the code easier, thus easier to maintain, and development speed goes up.
---
### **Cloud** 
- Cloud: AWS (Amazon Web Services) -> can get student credit on AWS. AWS will be used in the deployment part and can support multiple layers of our system architecture. Can use AWS EC2 to host Flask backend API, because of its easy integration and scalable infrastructure. Can use AWS RDS (Relational Database Service) to host a PostgreSQL database.
---
### **Development Tools**
- GitHub -> Store repo & GitHub actions for CI/CD
- Package & Dependency Management -> NPM for Frontend, pip + requirements.txt for Flask
- Testing -> PyTest (Unit & integration testing)
- API Testing -> Postman or Thunder Client
---
### **Reasonings**
- Due to the limited time frame of the project, we went with technologies we are familiar with, BUT we will learn from each other. This summer, Ishmam & Muslim have both interned at Amazon, so they have extensive experience using AWS. Sudiptto interned at Microsoft and knows Azure; however, more of the team knows about AWS. Sudiptto does have experience in React & immense experience in Python backend. We all have experience in developing with Flask + React environment.
