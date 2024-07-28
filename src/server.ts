import {app} from "./app";
import { connectDB } from "./db/database";

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
  
export default app;