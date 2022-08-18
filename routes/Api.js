


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
    app.get('/api/data', function(req, res){
            Data.find(function(err, datas){
                if(err){
                    logger.error(err);
                    res.status(500).send({error:'database failure'});
                    return;
                }

                res.json(datas);
            })
    });
}



