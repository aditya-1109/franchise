"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const models_1 = __importDefault(require("./models"));
const PORT = process.env.PORT || 5000;
models_1.default.sequelize.sync().then(() => {
    console.log('Database synced');
    app_1.default.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
