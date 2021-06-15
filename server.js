var express = require('express');

var app = express();

app.set('port', 6072);
app.use('/public', express.static('public'))

app.get('/', function(request, response){

    response.sendFile('/nfs/stak/users/wilkiech/MyFirstWebsite/Home.html')

})

app.get('/About', function(request, response){

    response.sendFile('/nfs/stak/users/wilkiech/MyFirstWebsite/About.html')

})

app.get('/Guest', function(request, response){

    response.sendFile('/nfs/stak/users/wilkiech/MyFirstWebsite/Guest.html')

})

app.get('/Casino', function(request, response){

    response.sendFile('/nfs/stak/users/wilkiech/MyFirstWebsite/Casino.html')

})


app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});