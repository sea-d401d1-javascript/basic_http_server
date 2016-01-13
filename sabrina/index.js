const httpServer = require(__dirname + '/lib/http-server.js');

httpServer.server.listen(3000, () => console.log('Server started!'));
