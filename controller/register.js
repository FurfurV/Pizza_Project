const url = require('url');
const ejs=require('ejs');
const qs=require('querystring');
var db=require('C:/Users/vcsek/Desktop/new_pizza_project/model/pizzadb');

exports.getLogin = function (req, res) {
    //var name = 'World';
    // if (reqUrl.query.name) {
    //     name = reqUrl.query.name
    // }
        //res.end('./views/pages/pizzas.ejs', {model: rows});

        ejs.renderFile('./views/pages/register.ejs', (err, data) => {
            if(err){
                console.log(err);
            }
            res.end(data);
        });
    //res.setHeader('Content-Type', 'application/json');
    //res.end(JSON.stringify(response));
};

exports.showRegister = function (req, res) {
    var rawData='';

    req.on('data', function(data) {
            rawData += data;
            // body += chunk;
            //console.log('name'+query.name);
        });

    req.on('end', function () {
        var info=qs.parse(rawData);

        // var user_name = info.username;
        // var password=info.password;

        //res.writeHead(200,{'Content-Type': 'text/plain'});
        var sql='INSERT INTO customer(Username, Password, email, name, "phone number", address) VALUES (?, ?, ?, ?, ?, ?);';
        var params =[info.username, info.password, info.email, info.name, info.phone, info.address];

        db.run(sql, params, function (err) {
            if (err){
                return console.log(err.message);
            }
            console.log(`A row has been inserted`);
            res.writeHead(301, {
                'Location': '/'
            });
            res.end();
            // res.json({
            //     "message": "success",
            //     "data": data,
            //     "id" : this.lastID
            });
        //res.end("submitted");
    });
};

exports.useLoginButton = function (req, res) {
    var rawData = '';

    req.on('data', function (data) {
        rawData += data;
        console.log(data);

        req.on('end', function () {
            var info = qs.parse(rawData);
            console.log(rawData);

            var sql = 'SELECT Username u, Password p FROM customer;';
            var params = [info.loginUsername, info.loginpass];

            db.get(sql, [], (err, check) => {

                if (err) {
                    return console.error(err.message);
                }
                //let username = check.u;
                //let password = check.p;
                /*console.log(username);
                console.log(password);*/

                db.all(sql, [params], (err, user) => {
                    //res.writeHead(200, {'Content-Type': 'text/plain'});
                    // console.log(info.loginUsername);
                    // console.log(info.loginpass);
                    console.log(user.u);
                    console.log(user.p);

                    if (err) {
                        return console.error(err.message);
                    }

                    if (info.loginUsername === check.u && info.loginpass === check.p) {
                        //req.session.put('key', check.u);

                        res.writeHead(301, {
                            'Location': '/home'
                        });
                        res.end();
                    } else {
                        res.writeHead(301, {
                            'Location': '/'
                        });
                        res.end('User not found');
                    }
                });
            });
        });
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};