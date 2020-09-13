const HOSTNAME = 'localhost';
const PORT = 3000;



const server = require('./router.js');
/*
var server=http.createServer(function (req, res) {
    //require('./router').get(req,res);//test

});*/

server.listen(PORT, HOSTNAME, function() {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

module.exports=server;