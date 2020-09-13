const ejs = require('ejs');
var db=require('C:/Users/vcsek/Desktop/new_pizza_project/model/pizzadb');

exports.getPage = function (req, res) {
    ejs.renderFile('./views/pages/custom.ejs', (err, data) => {
        if (err) {
            console.log(err);
        }
        res.end(data);
    });
    res.statusCode = 200;
};

exports.showSelection = function (req, res) {

    const sql2='SELECT price p, Name n FROM "Meat topping"';
    const sql3='SELECT Price vegPrice, Name vegName FROM "Vegetarian topping"';
    const sql4='SELECT price p, Name n FROM "Crust Size"';
    const sql5='SELECT "flavour name" n FROM "crust flavour";';
    const sql6='SELECT "sauce Name"n FROM "pizza sauce";';

db.all(sql2, [], (err, meats) => {
    if (err) {
        return console.error(err.message);
    }

    db.all(sql3, [], (err, vegetarian) => {
        if (err) {
            return console.error(err.message);
        }

        db.all(sql4, [], (err, crust) => {
            if (err) {
                return console.error(err.message);
            }

            db.all(sql5, [], (err, flavour) => {
                if (err) {
                    return console.error(err.message);
                }

                db.all(sql6, [], (err, sauce) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    ejs.renderFile('./views/pages/custom.ejs', {
                        veg: vegetarian,
                        meat: meats,
                        c: crust,
                        f: flavour,
                        s: sauce,
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
    });
});
res.statusCode = 200;
//res.setHeader('Content-Type', 'application/json');
//res.end(JSON.stringify(response));

}