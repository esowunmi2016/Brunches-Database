var http = require('http');

http.createServer(function(req, res){
    res.write('Holla mami you dey look good if you want to ride i go like to sample you')
    res.end()
}).listen(process.env.PORT || 8080);