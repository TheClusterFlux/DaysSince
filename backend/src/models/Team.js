class Team {
  constructor(data) {
    this.name = data.name;
    this.displayName = data.displayName;
    this.description = data.description || '';
    this.categories = data.categories || ['deployment', 'meeting', 'release'];
    this.createdAt = data.createdAt || new Date().toISOString();
  }
  
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      displayName: this.displayName,
      description: this.description,
      categories: this.categories,
      createdAt: this.createdAt
    };
  }
}

module.exports = Team;
