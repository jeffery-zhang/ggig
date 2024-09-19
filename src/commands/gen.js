import chalk from "chalk";
import fs from "fs";
import { request } from "../utils/request.js";

const action = async ({ template }) => {
  try {
    const path = `/${template}`;
    const exists = fs.existsSync(".gitignore");
    const data = await request(path);
    const result = JSON.parse(data);
    const { name, source } = JSON.parse(result.data);
    if (exists) {
      fs.appendFileSync(
        "./.gitignore",
        `# git ignore template for ${name}\n${source}\n`
      );
    } else {
      fs.writeFileSync(
        "./.gitignore",
        `# git ignore template for ${name}\n${source}\n`
      );
    }
    console.log(
      chalk.bgGreen(`git ignore file template for ${name} has been created!`)
    );
  } catch (err) {
    console.error(chalk.bgRed("Access Token is empty~ "), err);
    process.exit(1);
  }
};

export default {
  command: "gen",
  description: "Create .gitignore template",
  action,
  options: [
    [
      "-t --template <template>",
      "Choose a template to write a .gitignore file",
      "Node",
    ],
  ],
};
