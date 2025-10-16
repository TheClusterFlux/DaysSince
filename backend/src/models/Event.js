class Event {
  constructor(data) {
    this.team = data.team;
    this.name = data.name;
    this.category = data.category;
    this.timestamps = data.timestamps || [];
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }
  
  addTimestamp() {
    const now = new Date().toISOString();
    this.timestamps.push(now);
    this.updatedAt = now;
    return this;
  }
  
  toJSON() {
    return {
      _id: this._id,
      team: this.team,
      name: this.name,
      category: this.category,
      timestamps: this.timestamps,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Event;
