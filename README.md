# Number Classification API

This project is a simple API that classifies numbers based on various mathematical properties and provides fun facts about them. It is built using Node.js and Express.

## Features

- Classifies numbers as prime, perfect, or Armstrong.
- Returns interesting mathematical properties.
- Fetches fun facts from the Numbers API.
- Handles CORS for cross-origin requests.

## Technology Stack

- Node.js
- Express
- CORS
- Numbers API

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ezeah/number-classification-api.git
   ```
2. Navigate to the project directory:
   ```
   cd number-classification-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and set the following environment variables:
   ```
   PORT=3000
   NUMBERS_API_URL=http://numbersapi.com/
   ```

## Usage

To start the server, run:
```
npm start
```

The API will be available at `https://number-classification-api-v0n3.onrender.com/api/classify-number/?number=<your-number>`.

or
```
http://localhost:3000/api/classify-number?number=<your-number>
```

## API Endpoint

### GET /api/classify-number?number=<number>

#### Query Parameters

- `number`: An integer to classify.

#### Response Format (200 OK)

```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### Response Format (400 Bad Request)

```json
{
    "number": "alphabet",
    "error": true
}
```

## Code Structure

- `src/index.js`: Entry point of the application.
- `src/controllers/numberController.js`: Contains the logic for classifying numbers.
- `src/routes/numberRoutes.js`: Defines the API routes.
- `src/utils/numberUtils.js`: Utility functions for mathematical calculations.

## License

This project is licensed under the MIT License.
