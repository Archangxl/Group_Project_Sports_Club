const UserInfoController = require("../controllers/userInfo.controllers");

module.exports = (app) => {
    app.post("/api/user/info", UserInfoController.createUserInfo);
    app.get("/api/user/info", UserInfoController.getAllUserInfo);
    app.get("/api/user/info/:id", UserInfoController.getOneUserInfo);
    app.put("/api/user/info/:id", UserInfoController.updateUserInfo);
}