module.exports = () => {
  return {
    output: {
      globals: {
        axios: 'axios',
        qs: 'qs',
      },
      exports: 'named',
    },
    external: ['axios', 'qs'],
  };
};
