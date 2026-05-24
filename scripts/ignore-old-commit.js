const { execSync } = require("node:child_process");

const currentSha = process.env.VERCEL_GIT_COMMIT_SHA;
const repoUrl = "https://github.com/whywbhydyq/amazon-flat-file-diagnoser.git";

if (!currentSha) {
  console.log("VERCEL_GIT_COMMIT_SHA is unavailable; continue build.");
  process.exit(1);
}

try {
  const output = execSync(`git ls-remote ${repoUrl} refs/heads/main`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 10000
  }).trim();

  const latestMainSha = output.split(/\s+/)[0];

  if (!latestMainSha) {
    console.log("Could not read latest main SHA; continue build.");
    process.exit(1);
  }

  if (latestMainSha === currentSha) {
    console.log(`Current commit ${currentSha} is latest main; continue build.`);
    process.exit(1);
  }

  console.log(`Current commit ${currentSha} is not latest main ${latestMainSha}; skip stale build.`);
  process.exit(0);
} catch (error) {
  console.log(`Ignore command check failed: ${error.message}; continue build.`);
  process.exit(1);
}
