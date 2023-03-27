import { MysqlError } from "mysql";

function displayNameToName(displayName: string) {
    const name = displayName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return name.toLowerCase();
}

function nameToDisplayName(name: string) {
    const displayName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '');
    return displayName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function log(text: string | MysqlError | Error, important: boolean) {
    console.log(text)
}

export { displayNameToName, nameToDisplayName, log }