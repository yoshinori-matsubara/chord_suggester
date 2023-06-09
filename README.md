# Discription

This app suggests chord progressions which are match with the mood you entered.

# Installation

To set up and run ChordCoach locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/yoshinori-matsubara/chord_suggester
```

2. Change to the backend directory:

```
cd chord_suggester/backend
```

3. Install the required dependencies for backend:

```
npm install
```

4. Set up your .env file
   Copy .env.example into .env and add your OpenAI API key and model name
   Your .env file should look like this:

```
OPENAI_API_KEY = your_api_key_here
```

5. Make database

```
npx knex migrate:latest
```

6. Start the development server:

```
npm start
```

7. Change to the frontend directory:

```
cd ../frontend
```

8. Install the required dependencies for frontend:

```
npm install
```

9. Start the react app:

```
npm start
```

# How to use

1. Enter mood of song you want to compose in input box.
2. Click "Suggest" button
3. Suggested chord progressions are listed below
4. If you find a code you like, you can save it by selecting it with the checkbox and pressing the "save" button
5. Saved chord progressions can be viewed in a favorite list by pressing the list button at the bottom right of the screen
6. If you want to delete a saved chord progression, select it with the check box on the favorite list screen and delete it with the "Remove" button.

# DEMO

https://chord-coach.onrender.com/

# Future plan

1. Filtering function for the favorites list
2. Simple performance function by midi when chord progression is clicked

# Release note

2023.6.8: v1.0 released
