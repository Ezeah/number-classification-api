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
   ```sh
   git clone https://github.com/ezeah/number-classification-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd number-classification-api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and set the following environment variables:
   ```sh
   PORT=3000
   NUMBERS_API_URL=http://numbersapi.com/
   ```

## Usage

To start the server, run:
```sh
npm start
```

The API will be available at:

```sh
https://number-classification-api-v0n3.onrender.com/api/classify-number/?number=<number>
```

## API Endpoint

### GET /api/classify-number

#### Query Parameters

- `number`(required): The number to classify.

### Response Format

The response will be a JSON object with the following properties:

- `number` (number): The input number.
- `is_prime` (boolean): Whether the number is prime.
- `is_perfect` (boolean): Whether the number is perfect.
- `properties` (array): An array of properties that the number - - satisfies (e.g., "even", "odd", "armstrong").
- `digit_sum` (number): The sum of the digits of the number.
- `fun_fact` (string): A fun fact about the number.

### Example Request
```sh
GET /api/classify-number?number=371
```

#### Example Response (200 OK)

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

#### Example Response (400 Bad Request)

```json
{
    "number": "alphabet",
    "error": true
}
```

## Code Structure

- `src/index.mjs`: Entry point of the application.
- `src/controllers/numberController.mjs`: Contains the logic for classifying numbers.
- `src/routes/numberRoutes.mjs`: Defines the API routes.
- `src/utils/numberUtils.mjs`: Utility functions for mathematical calculations.
- `test/utils/numberRoutes.test.mjs`: Test the API routes.

## Running Tests

To run the tests, use the following command:

```sh
npm test
```

## License

This project is licensed under the MIT License.
