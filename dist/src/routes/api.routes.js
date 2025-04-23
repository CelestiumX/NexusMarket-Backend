"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./api/auth.routes");
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
exports.default = router;
//# sourceMappingURL=api.routes.js.map