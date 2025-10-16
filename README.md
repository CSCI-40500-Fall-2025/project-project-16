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
- Make sure you have npm install / node js
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
- **Duration:** Should be standing, the general structure of this app is a CRUD app, and unless API's get affected should last without major bugs.  
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
- Song Metadata Access (via preloaded data (Ie, through CSV for MVP sake) or Spotify API or external music API)
- Like / Favorite System  
- Current Songs & Recent Reviews Feed  

## **Integration Services**
- Spotify API Integration (for track data, cover art, artist info)  
- Cloud Storage for User Avatars and Review Media 
- External Analytics, like usage tracking, etc, for telemetry

## **Shared Infrastructure Services**
- Authentication and Authorization Services  
- Logging and Monitoring  
- Application and Media Storage  
- Database Management (User, Review, Song tables)  
- API Routing and Load Balancing  

---



