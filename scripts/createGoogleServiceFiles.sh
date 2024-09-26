#!/bin/bash

echo "Creating GoogleService-Info.plist for iOS..."
echo "$GOOGLE_SERVICES_IOS" > ./ios/GoogleService-Info.plist

echo "Creating google-services.json for Android..."
echo "$GOOGLE_SERVICES_ANDROID" > ./android/app/google-services.json

echo "Google service files created successfully!"
