# Generative Art

This is a generative art piece that changes depending how many near-earth asteroids are currently being tracked by Nasa and depending on their estimated diameters. 

## Installation

There is no installation required. You can simply clone or download the project and open the index.html file in your browser.


## Usage

When you run the application, you will see a button named "reorbit asteroids". Clicking the button will retrieve asteroid data from NASA's NeoWs API for the current asteroids being tracked. The application will then generate a moving art-piece, where the number and size of the individual art elements is determined by the received asteroid data. The API calls will be re-triggered every hour and/or on every refresh of the page. Clicking the button again will regenerate randomized movements and arrangements of the already present asteroid data, without updating again with a new API call.

![asteroids](https://user-images.githubusercontent.com/41804800/235857305-12023756-f962-4180-a02a-d413568bd7a9.png)
