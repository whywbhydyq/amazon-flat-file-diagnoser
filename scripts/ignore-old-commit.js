const { execSync } = require("node:child_process");

const currentSha = process.env.VERCEL_GIT_COMMIT_SHA;
const currentRef = process.env.VERCEL_GIT_COMMIT_REF;
const targetRef = "main";
const repoUrl = "https://github.com/whywbhydyq/amazon-flat-file-diagnoser.git";

function continueBuild(message) {
  console.log(`${message}; continue build.`);
  process.exit(1);
}

function skipBuild(message) {
  console.log(`${message}; skip stale build.`);
  process.exit(0);
}

if (!currentSha) {
  continueBuild("VERCEL_GIT_COMMIT_SHA is unavailable");
}

if (currentRef && currentRef !== targetRef) {
  continueBuild(`Commit ref is ${currentRef}, not ${targetRef}`);
}

try {
  const output = execSync(`git ls-remote ${repoUrl} refs/heads/${targetRef}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 10000
  }).trim();

  const latestMainSha = output.split(/\s+/)[0];

  if (!latestMainSha) {
    continueBuild(`Could not read latest ${targetRef} SHA`);
  }

  if (latestMainSha === currentSha) {
    continueBuild(`Current commit ${currentSha} is latest ${targetRef}`);
  }

  skipBuild(`Current commit ${currentSha} is not latest ${targetRef} ${latestMainSha}`);
} catch (error) {
  continueBuild(`Ignore command check failed: ${error.message}`);
}
