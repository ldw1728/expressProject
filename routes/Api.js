


module.exports = function(app, Data){

    // create
    app.post('/api/data', function(req, res){
        var data = new Data();
        data.name = req.body.name;
        data.isdata = req.body.isdata;

        data.save(function(err){
            if(err){ 
                logger.error(err);
                res.json({result:0});
                return;
            }

            res.json({result:1});
        });

    });

    //read
    app.get('/api/data', function(req, res, next){
        res.end();
    });
}



