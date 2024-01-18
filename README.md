## Purpose of the app:
This app is specifically designed to cater to the needs of electric car owners. Its primary purpose is to help users easily find charging stations for their electric vehicles. 
The app simplifies the process of locating nearby charging points, managing favorite locations

## Project Description:
The application serves as a convenient tool for electric car owners, offering a user-friendly interface to locate and manage charging stations. 
By integrating technologies such as Expo Go, Clerk for authentication, and Firebase for data management, the app ensures a seamless experience for its users.

## Functionalities:
Locate Charging Stations: Find nearby charging stations for electric cars.
Manage Favorite Locations: Users can add or remove their favorite charging locations.
Secure Authentication: Log in and authenticate securely using Clerk.

## Setup instruction for EV Charger station app
### Prerequisities
- Node.js
- install Expo Go ( npx create-expo-app --template)
- Install Clerk  ( npm install @clerk/clerk-expo ) - follow the docummentaion of Clerk configure user authentication in your app
- Install firebase ( npm install --save firebase )
- Need to enable google maps api in Google Console - make sure to include the neccesary api keys for your app 

## Cloning the repository
git clone https://github.com/chris1234345/ev-charger-station.git
cd ev-charger

## Configure Firebase
To use Firebase functionalities ( ex: storing favorite location):
1. Create a Firebase Project via the Firebase Console
2. Obtain your Firebase configuration keys and include them in your project. Usually, you'll set these up in an environment file or directly in your app's configuration file

## Start the application
cd /ev-charger/
npm start
