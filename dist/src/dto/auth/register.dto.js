"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterDto {
    username;
    email;
    password;
    walletAddress;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de usuario es requerido' }),
    (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser una cadena de texto' }),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es requerido' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email válido' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es requerida' }),
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.MinLength)(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La dirección de wallet debe ser una cadena de texto' }),
    (0, class_validator_1.Matches)(/^G[A-Z0-9]{55}$/, {
        message: 'La dirección de wallet de Stellar debe ser válida (comienza con G y tiene 56 caracteres)'
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "walletAddress", void 0);
//# sourceMappingURL=register.dto.js.map