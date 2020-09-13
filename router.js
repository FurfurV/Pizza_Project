const http = require('http');
const url = require('url');

const static = require( 'node-static' );

var fileServer = new (static.Server)();

http.createServer((req, res) =>
{
    fileServer.serve(req, res);
}).listen(8000);
// serve

module.exports = http.createServer((req, res) => {
    //file.serve(req, res);
    var pizza = require('./controller/pizza.js');
    var home = require('./controller/home.js');
    var cart = require('./controller/cart.js');
    var register = require('./controller/register.js');
    var custom=require('./controller/custom.js');
    var pay=require('./controller/pay.js');
    const reqUrl = url.parse(req.url, true);

// GET Endpoints
    if (reqUrl.pathname == '/pizzas' && req.method === 'GET') {
        pizza.showSelection(req, res);

    } else if (reqUrl.pathname == '/home' && req.method === 'GET') {
        home.sampleRequest(req, res);

    } else if (reqUrl.pathname == '/cart' && req.method === 'GET') {
        cart.sampleRequest(req, res);

    } else if (reqUrl.pathname == '/' && req.method === 'GET') {
        register.getLogin(req, res);

    }else if (reqUrl.pathname == '/custom' && req.method === 'GET') {
        custom.showSelection(req, res);
    }else if (reqUrl.pathname == '/pay' && req.method === 'GET') {
        pay.payment(req, res);
    }

// POST Endpoint
    else if (reqUrl.pathname == '/' && req.method === 'POST') {
        register.showRegister(req, res);

    } else if (reqUrl.pathname == '/login' && req.method === 'POST') {
        register.useLoginButton(req, res);

    }else if (reqUrl.pathname == '/toCartP' && req.method === 'POST') {

        cart.addToMyCartPizza(req, res);
    }else if (reqUrl.pathname == '/toCartSide' && req.method === 'POST') {

        cart.addToMyCartSide(req, res);
    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);
        register.invalidRequest(req, res);

    }
})
