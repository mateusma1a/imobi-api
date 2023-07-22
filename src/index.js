const app = require('./server');

// Get the environment variables
const envpath =
  process.env.NODE_ENV === undefined
    ? ".env.development"
    : `.env.${process.env.NODE_ENV}`;

require("dotenv").config({
  path: envpath,
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express started at http://localhost:${port}`);
});