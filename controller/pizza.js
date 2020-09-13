const url = require('url');
const ejs=require('ejs');
//const sqlite3 = require("sqlite3").verbose();
var db=require('C:/Users/vcsek/Desktop/new_pizza_project/model/pizzadb');

exports.showSelection = function (req, res) {
    /*const reqUrl = url.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name
    }*/
    const sql = `SELECT ID id,
                     "Crust Size" crusts,
                     "pizza sauce" sauce,
                     "crust flavour" crustf,
                     "pizza price" price,
                     "extra cheese" extra,
                     "picture" picture
                     FROM Pizza;`;

    const sql1 = 'SELECT PizzaID pizzId,"Vegetarian toppingName" vegetarian,"Meat toppingName" meat FROM "topping items" ;';

    const sql7 = 'SELECT Name n, price p, picture pic FROM Sides;';

    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        db.all(sql7, [], (err, sides) => {
            if (err) {
                return console.error(err.message);
            }
            let pizzId = rows.id;
            db.all(sql1, [pizzId], (err, topps) => {
                if (err) {
                    return console.error(err.message);
                }

                ejs.renderFile('./views/pages/pizzas.ejs', {
                    model: rows,
                    top: topps,
                    side: sides,
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    res.statusCode = 200;
                    res.end(data);
                });
            });
        });
    });
    res.statusCode = 200;
};

exports.testRequest = function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var response = {
            "text": "Post Request Value is  " + postBody.value
        };

        res.statusCode = 200;
        //res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};