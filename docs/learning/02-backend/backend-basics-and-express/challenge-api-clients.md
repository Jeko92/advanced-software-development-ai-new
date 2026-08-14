# Backend Basics and Express - Challenge: API Clients

## Exploring an API with an API Client of your choice

In this challenge you will set up an API client of your choice, start a local API server, and send requests against it. By the end, you should be able to build any type of `HTTP` request in your API client and read what comes back.

### Setup

Choose an API client and install it:

- **Postman**: [download](https://www.postman.com/downloads/)
- **Bruno**: [download](https://www.usebruno.com/downloads)

Depending on your choice, you may need to follow additional setup steps. Please refer to the documentation for your chosen client.

Start the BookMonkey API. This is a pre-built practice API distributed as an `npm package`. You do not need to install it permanently. Run it directly with:

```bash
npx bookmonkey-api
```

The server starts at `http://localhost:4730`. Open that URL in your browser to see the API documentation. It lists the available endpoints and describes what data they expect.

> **_✎ Note:_** Keep the terminal window open while you work. Closing it stops the API server. If you need your terminal back, open a second tab or window.

### Part 1: Your first GET request

Open your API client and create a new collection called "BookMonkey."

Create your first request inside the collection:

- Set the method to **GET**
- Enter the URL `http://localhost:4730/books`
- Click **Send**

The response panel should show a JSON array of books. Check the status code in the upper right of the response section. It should read `200 OK`.

Save this request in your collection as "Get all books."

### Part 2: Fetch a single book

Look at the response from Part 1. Each book has an `isbn` field. Pick one ISBN and create a new GET request that fetches only that specific book.

> **_✎ Note:_** Check the API documentation at `http://localhost:4730` to find the correct endpoint for retrieving a single book.

Save this request as "Get book by ISBN."

### Part 3: Create a new book

Create a request that adds a new book to the collection:

- Set the method to **POST**
- Set the URL to the books endpoint
- Open the **Body** tab, select **raw**, and choose **JSON** from the format dropdown
- Write a JSON object with the fields the API expects (check the documentation for the required structure)

If your request succeeds, the status code should be `201 Created`. Send your "Get all books" request again to confirm the new book appears in the list.

Save this request as "Create a book."

### Part 4: Update and delete

Using the API documentation as your reference, add two more requests to your collection:

- A request that **updates** an existing book (decide whether PUT or PATCH is appropriate based on what you learned about HTTP methods)
- A request that **deletes** a book

After deleting, send a GET request to verify the book is gone.

### Result

Your finished collection should contain at least five saved requests covering all CRUD operations.
