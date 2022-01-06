import express from "express";
import router from "./router";
const app = express();
const port = 3000;

app.use(express.json());

//express body parser
app.use(express.urlencoded({ extended: true }));

//router
app.use(router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
