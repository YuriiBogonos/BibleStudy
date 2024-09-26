// scripts/createGoogleServiceFiles.js

const fs = require("fs");
const path = require("path");

// Check that necessary environment variables are defined
if (!process.env.GOOGLE_SERVICES_IOS || !process.env.GOOGLE_SERVICES_ANDROID) {
  throw new Error(
    "GOOGLE_SERVICES_IOS and GOOGLE_SERVICES_ANDROID must be set",
  );
}

// Define file paths
const iosFilePath = path.join(__dirname, "../ios/GoogleService-Info.plist");
const androidFilePath = path.join(
  __dirname,
  "../android/app/google-services.json",
);

// Write iOS Google services file
fs.writeFileSync(iosFilePath, process.env.GOOGLE_SERVICES_IOS);
console.log(`iOS GoogleService-Info.plist has been written to ${iosFilePath}`);

// Write Android Google services file
fs.writeFileSync(androidFilePath, process.env.GOOGLE_SERVICES_ANDROID);
console.log(
  `Android google-services.json has been written to ${androidFilePath}`,
);
