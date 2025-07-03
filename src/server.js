const { AppClass } = require("./app");

const App = new AppClass().server;

App.listen(80, () => console.log("Server started on port 80."));
