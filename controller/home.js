const ejs=require('ejs');

exports.sampleRequest = function (req, res) {
        ejs.renderFile('./views/pages/home.ejs', (err, data) => {
            if(err){
                console.log(err);
            }
            res.end(data);
        });
    res.statusCode = 200;
};