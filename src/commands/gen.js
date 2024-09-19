import chalk from "chalk";
import fs from "fs";
import { request } from "../utils/request.js";

const action = async ({ template }) => {
  try {
    const path = `/${template}`;
    const exists = fs.existsSync(".gitignore");
    const source = await request(path);
    if (exists) {
      fs.appendFileSync(
        "./.gitignore",
        `# git ignore template for ${template}\n${source}\n`
      );
    } else {
      fs.writeFileSync(
        "./.gitignore",
        `# git ignore template for ${template}\n${source}\n`
      );
    }
    console.log(
      chalk.bgGreen(
        `git ignore file template for ${template} has been created!`
      )
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
