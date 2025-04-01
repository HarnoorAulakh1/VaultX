import { app } from "./index.js";
import { ConnectDB } from "./db/db.js";

const port = process.env.PORT || 8000;

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on the PORT ${port}`);
    });
  })
  .catch(() => {
    console.error("Something went wrong while connecting to the server");
  });
