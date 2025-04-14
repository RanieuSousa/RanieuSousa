const fs = require("fs");
const axios = require("axios");

const USERNAME = "ranieusousa";
const REPO_COUNT = 10; // ou quantos quiser

async function updateReadme() {
  const res = await axios.get(`https://api.github.com/users/${USERNAME}/repos?per_page=${REPO_COUNT}&sort=updated`);
  const repos = res.data;

  const list = repos
    .filter(repo => !repo.fork)
    .map(repo => `- 🔗 [${repo.name}](${repo.html_url})`)
    .join("\n");

  const readmePath = "README.md";
  let readme = fs.readFileSync(readmePath, "utf-8");

  const regex = /<!--START_SECTION:repos-->[\s\S]*<!--END_SECTION:repos-->/;
  const replacement = `<!--START_SECTION:repos-->\n${list}\n<!--END_SECTION:repos-->`;

  readme = readme.replace(regex, replacement);

  fs.writeFileSync(readmePath, readme);
}

updateReadme();
