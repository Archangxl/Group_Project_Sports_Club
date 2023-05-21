const mongoose = require("mongoose");
const databaseName = "Project_Database";
mongoose.connect(`mongodb://localhost/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`${databaseName} is currently in use.`))
.catch((err) => console.log(err));
