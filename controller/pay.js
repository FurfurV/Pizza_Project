const ejs=require('ejs');

exports.payment = function (req, res) {

    ejs.renderFile('./views/pages/pay.ejs', (err, data) => {
        if (err) {
            console.log(err);
        }
        res.end(data);
    });
}