import * as fs from "fs";
import * as path from "path";
import puppeteer from "puppeteer";
import { getProjectUrls } from "../src/app/data/projects";

// Get URLs from centralized project data
const PROJECT_URLS = getProjectUrls();

// Output directory for the screenshots
const OUTPUT_DIR = path.resolve(process.cwd(), "public/images/previews");

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureScreenshot(url: string): Promise<void> {
  const browser = await puppeteer.launch({
    headless: true, // Use boolean instead of "new" string
    defaultViewport: {
      width: 1200,
      height: 630,
    },
  });

  try {
    console.log(`Capturing screenshot of ${url}...`);
    const page = await browser.newPage();

    // Set a user agent to avoid bot detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
    );

    // Navigate to the URL with a timeout
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait a bit for any lazy-loaded content
    // Use setTimeout instead of waitForTimeout
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Extract the domain for the filename
    const domain = new URL(url).hostname.replace("www.", "");
    const outputPath = path.join(OUTPUT_DIR, `${domain}.jpg`);

    // Take the screenshot
    await page.screenshot({
      path: outputPath,
      type: "jpeg",
      quality: 90,
    });

    console.log(`Screenshot saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error capturing screenshot for ${url}:`, error);
  } finally {
    await browser.close();
  }
}

async function main() {
  if (PROJECT_URLS.length === 0) {
    console.log(
      "No project URLs found. Please add projects with links to your projects data."
    );
    return;
  }

  console.log(
    `Found ${PROJECT_URLS.length} project URLs to capture: ${PROJECT_URLS.join(
      ", "
    )}`
  );

  // Process URLs sequentially to avoid memory issues
  for (const url of PROJECT_URLS) {
    await captureScreenshot(url);
  }

  console.log("Screenshot capture completed!");
}

main().catch(console.error);
