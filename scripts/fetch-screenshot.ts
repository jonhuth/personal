#!/usr/bin/env node

// Simple script to fetch a screenshot of a website and save it to the public directory
const https = require("https");
const fs = require("fs");
const path = require("path");

// The URL to take a screenshot of
const url = "https://menumixer.io";
const domain = url.replace(/^https?:\/\//, "").replace(/^www\./, "");

// Path to save the screenshot
const outputDir = path.join(__dirname, "..", "public", "images", "previews");
const outputFile = path.join(outputDir, `${domain}.jpg`);

// Ensure the directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// We'll use ScreenshotOne free public API for this example
// Note: In a production environment, you should use your own API key
const apiUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(
  url
)}&image_quality=80&device_scale_factor=1&format=jpg&block_ads=true&block_cookie_banners=true&viewport_width=1280&viewport_height=800`;

console.log(`Fetching screenshot for ${url}...`);

https
  .get(apiUrl, (response: any) => {
    if (response.statusCode !== 200) {
      console.error(
        `Failed to get screenshot. Status code: ${response.statusCode}`
      );
      response.resume(); // Consume response data to free up memory
      return;
    }

    // Check if we're getting an image or an error message
    const contentType = response.headers["content-type"];
    if (!contentType.startsWith("image/")) {
      console.error("Received non-image response:", contentType);
      let data = "";
      response.on("data", (chunk: any) => {
        data += chunk;
      });
      response.on("end", () => {
        console.error("Error response:", data);
      });
      return;
    }

    // Stream the response to the file
    const file = fs.createWriteStream(outputFile);
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log(`Screenshot saved to ${outputFile}`);
    });
  })
  .on("error", (err: Error) => {
    console.error("Error getting screenshot:", err.message);
  });
