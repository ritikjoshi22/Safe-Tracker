const { randomUUID } = require('crypto');
const { WebSocket } = require('ws');

export class User {
  constructor(socket, userJwtClaims) {
    this.socket = socket;
    this.userId = userJwtClaims.userId;
    this.id = randomUUID();
    this.name = userJwtClaims.name;
  }
}