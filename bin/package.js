#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PACKAGE_DIR = path.resolve(__dirname, "..", "package");

(async () => {
  try {
    if (fs.existsSync(PACKAGE_DIR)) {
      fs.rmdirSync(PACKAGE_DIR, { recursive: true });
    }
    fs.mkdirSync(PACKAGE_DIR);

    execSync(`cp -r ${BUILD_DIR}/* ${PACKAGE_DIR}`, { stdio: "inherit" });

    const types = ["leaderboard", "mpu", "double-mpu", "mobile"];
    for (const type of types) {
      const otherTypes = types.filter((item) => item !== type);
      for (const otherType of otherTypes) {
        fs.rmSync(path.join(PACKAGE_DIR, type, `${otherType}-background.jpg`));
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
