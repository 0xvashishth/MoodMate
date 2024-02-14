class User {
  constructor(name, userIs, userWant, socketId, isAvailable = true) {
    this.name = name;
    this.userIs = userIs;
    this.userWant = userWant;
    this.socketId = socketId;
    this.room =
      Math.random().toString(36).slice(2, 7) +
      Math.random().toString(36).slice(2, 7) +
      Math.random().toString(36).slice(2, 7) +
      Math.random().toString(36).slice(2, 7);
    this.isAvailable = isAvailable;
  }
}

module.exports = User;
