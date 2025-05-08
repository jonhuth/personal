#!/usr/bin/env node

// A simple script to capture screenshots for project URLs
// Designed to work in both local and production environments

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import { getProjectUrls } from "../src/app/data/projects";

// Get URLs from centralized project data
const PROJECT_URLS = getProjectUrls();

// Output directory for the screenshots
const OUTPUT_DIR = path.resolve(process.cwd(), "public/images/previews");

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(
  `Found ${PROJECT_URLS.length} project URLs to capture: ${PROJECT_URLS.join(
    ", "
  )}`
);

// Determine if Puppeteer is available
let usePuppeteer = true;
try {
  // This will throw if puppeteer is not available
  require.resolve("puppeteer");
  console.log("Using Puppeteer for screenshots");
} catch (e) {
  usePuppeteer = false;
  console.log("Puppeteer not available, falling back to ScreenshotOne API");
}

// Capture screenshots for each URL
async function captureScreenshots() {
  for (const url of PROJECT_URLS) {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      const outputPath = path.join(OUTPUT_DIR, `${domain}.jpg`);

      console.log(`Capturing screenshot for ${url}...`);

      if (usePuppeteer) {
        // Import puppeteer only if available
        const puppeteer = await import("puppeteer");
        await capturePuppeteerScreenshot(puppeteer.default, url, outputPath);
      } else {
        // Fallback to ScreenshotOne API
        await captureScreenshotOneScreenshot(url, outputPath);
      }

      console.log(`Screenshot saved to ${outputPath}`);
    } catch (error) {
      console.error(
        `Error capturing screenshot for ${url}:`,
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  console.log("Screenshot capture completed!");
}

// Capture screenshot using Puppeteer
async function capturePuppeteerScreenshot(
  puppeteer: any,
  url: string,
  outputPath: string
): Promise<void> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 1200,
      height: 630,
    },
  });

  try {
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.screenshot({
      path: outputPath,
      type: "jpeg",
      quality: 90,
    });
  } finally {
    await browser.close();
  }
}

// Capture screenshot using ScreenshotOne API
function captureScreenshotOneScreenshot(
  url: string,
  outputPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(
      url
    )}&image_quality=80&device_scale_factor=1&format=jpg&block_ads=true&block_cookie_banners=true&viewport_width=1280&viewport_height=800`;

    https
      .get(apiUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to get screenshot. Status code: ${response.statusCode}`
            )
          );
          response.resume();
          return;
        }

        const contentType = response.headers["content-type"];
        if (!contentType || !contentType?.startsWith("image/")) {
          reject(new Error("Received non-image response"));
          let data = "";
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            console.error("Error response:", data);
          });
          return;
        }

        const file = fs.createWriteStream(outputPath);
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });

        file.on("error", (err) => {
          fs.unlink(outputPath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      })
      .on("error", reject);
  });
}

// Run the script
captureScreenshots().catch(console.error);
