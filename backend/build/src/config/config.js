"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = {
    app: process.env.APP || 'dev',
    port: process.env.PORT || '4000',
    jwt_encryption: process.env.JWT_ENCRYPTION || 'something_very_secret',
    jwt_expiration: process.env.JWT_EXPIRATION || '10000'
};
//# sourceMappingURL=config.js.map