"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const PORT = 8080;
const server = (0, server_1.setupServer)();
server.listen(PORT, () => {
    console.log('server is running');
});
