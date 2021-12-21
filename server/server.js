const path = require('path');
const express = require('express');

const app = express();
const buildPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 8789;
const expressStaticGzip = require('express-static-gzip');

app.use(
  '/',
  expressStaticGzip(buildPath, {
    enableBrotli: true,
    customCompressions: [
      {
        encodingName: 'deflate',
        fileExtension: 'zz',
      },
    ],
    orderPreference: ['br'],
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}!`);
});
