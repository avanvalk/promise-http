const { parse } = require('url');

module.exports = (req, res) => {
  const url = parse(req.url);
  if(url.pathname === '/tester') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ testing: 123 }));
  }
};
