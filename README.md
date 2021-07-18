# Halo - A web Game

You can play and Enjoy on your own or play with friends upto 4 players at a time!


## How to Play

- You are commander of the ship, your assistant bot has gone rogue and you need to try and follow the pattern made by the bot to create your highest score and steer the ship!

  ### Single Player Mode

  ![Singleplayer Mode](https://user-images.githubusercontent.com/44167922/125744452-c3d58fca-ad56-4a0c-8a2e-73865dc9a2e8.gif)

- Play with friends, follow your friend's pattern while he tries to remember your pattern! Here's a 1v1 game play, the one who makes the mistake at the end loses!
  ### Multi Player Mode
  ![1v1 Multiplayer](https://user-images.githubusercontent.com/44167922/125744402-3b2d84ce-7eed-4d40-837b-a1759958a3ed.gif)

## How to run on your Local Machine

- Fork and clone this repo:
  ```
  $ git clone https://github.com/swaaz/Halo.git
  ```
- Install dependancies:
  ```
  $ npm install
  ```
- Run backend game-server and leaderboard server:
  ```
  $ cd backend
  $ nodemon index.js
  ```
- Run React Frontend:
  ` npm start `
  This **should** be it to get it working on your local machine.

PS: The leaderboard server uses MongoDB, so the backend server may crash if you dont have MongoDB installed!

## Found a Bug?
Great!! We are too broke to give a Bounty 🙃 Click [here](https://github.com/swaaz/Halo/issues/new/choose) to create an issue and fill the necessary details. 
