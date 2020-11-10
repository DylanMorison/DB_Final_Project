const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./routes/authRoutes")(app);
require("./routes/postRoutes")(app);

app.listen(5000, () => {
	console.log("server started on port 5000");
});
