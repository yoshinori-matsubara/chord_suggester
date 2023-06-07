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
   npm install
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
