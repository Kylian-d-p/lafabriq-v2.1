"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.nameToDisplayName = exports.displayNameToName = void 0;
function displayNameToName(displayName) {
    const name = displayName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return name.toLowerCase();
}
exports.displayNameToName = displayNameToName;
function nameToDisplayName(name) {
    const displayName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '');
    return displayName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
exports.nameToDisplayName = nameToDisplayName;
function log(text, important) {
    console.log(text);
}
exports.log = log;
