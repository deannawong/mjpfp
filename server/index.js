const { app } = require("./app");
const chalk = require("chalk");
const PORT = 3000;

app.listen(PORT, () => {
  console.log(chalk.cyan(`~~Party on port ${PORT}~~`));
});
