# RecipeLookup Project

## Overview

Please have a look at RecipeLookup_Demo.mp4 file to see how the project works.
I used EDAMAME API for this project. Please create an account and get the API_ID and API_KEY to run this project. You can place them in recipeSearch.py file.
RecipeLookup is a web application that allows users to search for recipes using various filters.
## Features

- Use the search and filters on the right to get a list of recipes.
- Clicking on a recipe redirects you to its respective page for more details.
- The "What can I make?" filter can only be applied to the results that were already retrieved on the page. It suggests recipes based on the ingredients you have.
- Results retrieved with a search are stored in MongoDB to reduce the number of API calls. Repeated searches with the same filters can be quickly retrieved from MongoDB.

## Required Setup

### Python Libraries

To install the necessary Python libraries, run the following commands:

```bash
pip install flask
pip install pymongo
pip install requests
pip install flask_cors
```
##MongoDB

    Install MongoDB. You can use MongoDB Compass for an easier interface.
    Update config.py with your MONGO_URI to connect to the MongoDB server.

##Node.js Libraries

In the project directory, run the following commands to install the required Node.js dependencies:

```bash
npm install
npm install react-dropdown --save
```

## Running the Project

In the project directory, open two terminals:

1. **Terminal 1:**
```bash
npm start
```

2. **Terminal 2:**
```bash
python recipeSearch.py
```

Now you can use the application in your browser.

