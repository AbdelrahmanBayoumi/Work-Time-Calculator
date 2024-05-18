# Work Time Calculator

A simple web application to calculate work end time based on start time and duration. This app allows you to input your start time, choose between an 8-hour or 8.5-hour workday, and then calculates and displays your end time.

## Features

- Time picker to select start time
- Radio buttons to choose between 8-hour and 8.5-hour workday
- Displays calculated end time
- Progressive Web App (PWA) for offline usage

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AbdelrahmanBayoumi/Work-Time-Calculator.git
   cd work-time-calculator
   ```

2. Ensure all necessary files are in the root directory:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `manifest.json`
   - `sw.js`
   - Icon files (e.g., `android-icon-36x36.png`, etc.)

## Usage

1. Open `index.html` in your web browser.

2. Select your start time using the time picker.

3. Choose the work duration using the radio buttons.

4. Click the "Calculate End Time" button to see the result.

## PWA Features

- The app can be installed on your device.
- Works offline with the cached files.

## Service Worker

A basic service worker (`sw.js`) is included to cache the necessary files and ensure offline functionality.
