module.exports = {
  getCharacter() {
    return Promise.resolve({
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive'
    });
  }
};
