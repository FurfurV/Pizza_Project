const url = require('url');
const ejs=require('ejs');
const sqlite3 = require("sqlite3").verbose();
const qs=require('querystring');
var db=require('C:/Users/vcsek/Desktop/new_pizza_project/model/pizzadb');


exports.sampleRequest = function (req, res) {

    const sql4='SELECT "Order ID" id, PizzaID pizzID, SidesName sideN, "Pizza price" pizzPrice, "Sides price" sidesPrice, pizzaQty pizzQty, sideQty sideQ FROM "Pizzas and sides details"';

    db.all(sql4, [], (err, orders) => {
        if (err) {
            return console.error(err.message);
        }

        ejs.renderFile('./views/pages/myCart.ejs', {
            order: orders,
        }, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.statusCode = 200;
            res.end(data);
        });
    });
};

exports.addToMyCartSide=function (req, res) {
    var rawData = '';

    req.on('data', function (data) {
        rawData += data;

        req.on('end', function () {
            var info = qs.parse(rawData);
            var param3=[info.qty];

            var sides=JSON.stringify(info);
            console.log(sides);

            console.log(rawData);

            var sql = 'SELECT Name name, price p FROM Sides;';
            //var params = [info.myChoice];

            var param = [info.name];
            var param2=[info.price];

            db.get(sql, [], (err, mySide) => {
                if (err) {
                    return console.error(err.message);
                }
                param=mySide['name'];
                param2=mySide['p'];

                db.all(sql,[], (err, sides) => {
                    //console.log(sides);

                    if (err) {
                        return console.error(err.message);
                    }
                    //had to hardcode an order id

                    db.run('INSERT INTO "Pizzas and sides details"("Order ID", SidesName, "Sides price", sideQty) VALUES (6, ?, ?, 1);',param,param2, function (err) {
                        if (err) {
                            return console.log(err.message);
                        }
                        console.log(`A row has been inserted`);

                        res.writeHead(301, {
                            'Location': '/pizzas'
                        });
                        res.end();
                    })
                })
            })
        });
    });
};

exports.addToMyCartPizza = function (req, res) {
    var rawData = '';

    req.on('data', function (data) {
        rawData += data;

        req.on('end', function () {
            var info = qs.parse(rawData);
            var params3=[info.qty];

            var pizza=JSON.stringify(info);
            console.log(pizza);

            console.log(rawData);

            var sql = 'SELECT ID id,"pizza price" price FROM Pizza;';
            //var params = [info.myChoice];

            var params = [info.pizzaId];
            var params2=[info.pizzaPrice];

            db.get(sql, [], (err, myPizza) => {
                if (err) {
                    return console.error(err.message);
                }
                params=myPizza['id'];
                params2=myPizza['price'];

                db.all(sql,[], (err, pizza) => {
                    console.log(pizza);

                    if (err) {
                        return console.error(err.message);
                    }
                    //had to hardcode an order id

                    db.run('INSERT INTO "Pizzas and sides details"("Order ID", PizzaID, "Pizza price", pizzaQty) VALUES (6, ?, ?, ?);',params,params2,params3, function (err) {
                        if (err) {
                            return console.log(err.message);
                        }
                        console.log(`A row has been inserted`);

                        res.writeHead(301, {
                            'Location': '/pizzas'
                        });
                        res.end();
                    })
                })
            })
        });
    });
};
