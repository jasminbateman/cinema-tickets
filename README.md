# Cinema Ticket app

## Introduction

This is a basic application that allows a user to purchase cinema tickets, and make seat reservations via an API.

The ticket booking rules are as follows:

- There are 3 types of tickets i.e. Infant, Child, and Adult.
- The ticket prices are based on the type of ticket (see table below).
- The ticket purchaser declares how many and what type of tickets they want to buy.
- Multiple tickets can be purchased at any given time.
- Only a maximum of 20 tickets that can be purchased at a time.
- Infants do not pay for a ticket and are not allocated a seat. They will be sitting on an Adult's lap.
- Child and Infant tickets cannot be purchased without purchasing an Adult ticket.

|   Ticket Type    |     Price   |
| ---------------- | ----------- |
|    INFANT        |    £0       |
|    CHILD         |    £10      |
|    ADULT         |    £20      |

## Setup Instructions

1. Clone the repo
   ```sh
   git clone https://github.com/jasminbateman/cinema-tickets
   ```
2. Install the npm packages
   ```sh
   npm install
   ```
3. Create the .env file <br />
<br />
In the root directory, create a file called .env and copy and paste the contents of the .env.sample file into it. 

## Usage

1. In the terminal, start the app using the command:
   ```sh
   npm start
   ```
2. Open Postman
3. Send a POST request to the http://localhost:3009/purchase endpoint, with a json body in this format:

```sh
{
    "accountId": [insert number here],
    "noOfAdults": [insert number here],
    "noOfChildren": [insert number here],
    "noOfInfants": [insert number here]
}
```

EXAMPLE:

```sh
{
    "accountId": 12,
    "noOfAdults": 3,
    "noOfChildren": 1,
    "noOfInfants": 1
}
```

- Account ID must be an number of 1 or above.
