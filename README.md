<!-- @format -->

# TOM API Decision Maker

This is a Next.js web application that allows users to:

1. **Select a model** from the Theory of Constraints (up2tom) API.
2. **Enter input variables** for the selected model.
3. **Submit the input** to the up2tom API to obtain a decision.
4. **View the decision** from the up2tom API.
5. **Store the decision** (model name, input variables, and decision) in a MongoDB database.

**Key Features:**

- Utilizes Next.js, React, Tailwind CSS, MongoDB, and Mongoose.
- Fetches model metadata and queries the up2tom API using Axios.
- Stores user input and decisions in a MongoDB database.
- Includes basic security considerations (e.g., HTTPS).
- **Note:** This README provides a basic setup guide. You may need to adapt it based on your specific environment and requirements.

**Prerequisites:**

- Node.js and npm (or yarn) installed on your system.
- A MongoDB account and connection string.
- A valid API token for the up2tom API.

**Setup:**

## 1. **Clone the repository:**

```bash
git clone <repository_url>
```

## 2. **Navigate to the project directory:**

```bash
cd <folder_name>
```

## 3. **Install dependencies::**

```bash
npm install
```

## 4.Create a .env file at the root of the project and add the following environment variables:

```bash
_MONGODB_URI=<your_mongodb_connection_string>_

_NEXT_PUBLIC_API_TOKEN=<your_up2tom_api_token>_
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
