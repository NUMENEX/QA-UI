# NUMENEX QA UI

Welcome to the **NUMENEX SUBNET QA** application! This project is designed to provide functionality for two distinct user roles: **Miner** and **Validator**. Below are instructions on how to set up, use, and understand the features available for each role.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Miner Usage](#miner-usage)
- [Validator Usage](#validator-usage)
- [Handling Errors](#handling-errors)
- [Contributing](#contributing)

## Installation

Before getting started, ensure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NUMENEX/QA-UI.git
   cd QA-UI
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Start the development server:**

   ```bash
   yarn dev
   ```

   This will start the development server and open the application in your default web browser.

## Getting Started

Once the application is running, you will be presented with the home page where you can select your role.

- **Miner**: Click the "Miner" button to proceed to the Miner page.
- **Validator**: Click the "Validator" button to proceed to the Validator page.

## Miner Usage

The Miner role allows users to submit answers to questions.

1. **Navigating to the Miner Page:**
   - From the home page, click the "Miner" button.
   
2. **Answering Questions:**
   - On the Miner page, you will see a list of questions. Select an answer for each question from the provided options.
   - You can also add supporting resources by providing key-value pairs. If the value is a link, it will be clickable.

3. **Submitting Answers:**
   - Ensure that all questions have an answer selected.
   - Click the "Submit Answers" button. A loading indicator will appear while your answers are being submitted.
   - Upon successful submission, you will see a success notification.

4. **Error Handling:**
   - If any question is left unanswered, or if an error occurs during submission, you will be notified with an error message.

## Validator Usage

The Validator role allows users to review and score answers submitted by Miners.

1. **Navigating to the Validator Page:**
   - From the home page, click the "Validator" button.

2. **Reviewing Answers:**
   - On the Validator page, you will see a list of questions along with the submitted answers and supporting resources.
   - If a supporting resource is a link, you can click it to open the resource in a new tab.

3. **Scoring Answers:**
   - Provide a score between 0 and 1 for each answer.
   - Ensure that all answers have been scored before submitting.

4. **Validating Scores:**
   - Click the "Validate" button to submit your scores. A loading indicator will appear while your scores are being submitted.
   - Upon successful validation, you will see a success notification.

5. **Error Handling:**
   - If any answer is left unscored or if a score is outside the valid range, you will be notified with an error message.

## Handling Errors

The application provides clear error messages for issues that may arise during usage, including:

- **Network Errors**: Issues related to network connectivity will show an appropriate error message.
- **Validation Errors**: Any validation issues, such as unscored answers or invalid scores, will trigger an error notification.


## Contributing

We welcome contributions to improve the project. Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

Please make sure to update tests as appropriate.
