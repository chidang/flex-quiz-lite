PLUGIN_SLUG="flex-quiz"
PROJECT_PATH=$(pwd)
BUILD_PATH="${PROJECT_PATH}/release"
DEST_PATH="$BUILD_PATH/$PLUGIN_SLUG"

echo "Generating release directory..."
rm -rf "$BUILD_PATH"
mkdir -p "$DEST_PATH"

cd app/backend-ui/
npm install
echo "Running backend Build..."
npm run build
cd ../..

cd app/frontend-ui/
npm install
echo "Running frontend Build..."
npm run build

cd ../..

# cd blocks/
# npm install
# echo "Running Block JS Build..."
# npm run build
# cd ../

echo "Syncing files..."
rsync -rc --exclude-from="$PROJECT_PATH/.distignore" "$PROJECT_PATH/" "$DEST_PATH/" --delete --delete-excluded

# echo "Run lint"
# cd tools
# composer run cbf ../build
# cd ..

echo "Generating zip file..."
cd "$BUILD_PATH" || exit
zip -q -r "${PLUGIN_SLUG}.zip" "$PLUGIN_SLUG/"
rm -rf "$PLUGIN_SLUG"
echo "${PLUGIN_SLUG}.zip file generated!"

echo "Build done!"
