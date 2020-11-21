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
require("./routes/followRoutes")(app);
require("./routes/updateRoutes")(app);



var port = 5000;

app.listen(port, () => {
	console.log('server started on port 5000');
});
