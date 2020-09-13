const sqlite3=require('sqlite3').verbose();
const dbPath = './model/PizzaDatabase.db';

const db = new sqlite3.Database(dbPath, err=> {
    if (err) {
        return console.error(err.message);
    }
    });

    /*const sql = `SELECT ID id,
                 "Crust SizeName" crusts,
                 "pizza saucesauce Name" sauce,
                 "crust flavourflavour name" crustf,
                 "pizza price" price,
                 "extra cheese" extra
                 FROM Pizza`;


    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render("pizzas", { model: rows });
    });


let sql = `SELECT ID id,
 "Crust SizeName" crusts,
 "pizza saucesauce Name" sauce,
 "crust flavourflavour name" crustf,
 "pizza price" price,
 "extra cheese" extra
 FROM Pizza`;

let sql1 = `SELECT ID id,
           "pizza price" price
           FROM Pizza
           WHERE price  = ?`;

function Pizza(){
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.id, row.crusts, row.sauce, row.crustf, row.price, row.extra);
        });
    });
}

class Pizza2 {
    static all(cb) {
        db.all('SELECT * FROM Pizza', cb);
    }
}


    function Price(){
        let price = 12;
        db.get(sql1, [price], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row
                ? console.log("\n",row.id, row.price)
                : console.log(`Not found with id ${price}`);
        }); }*/

module.exports=db;


