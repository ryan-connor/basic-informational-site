let fs= require("fs");
let url= require("url");
let http=require("http");

//create the server and listen to port 8080
http.createServer(  (req, res)=> {

//parse the url
let q= url.parse(req.url, true);

//set custom 404 error page
let errorPage= fs.readFileSync("./404.html", (err, data) => {
    return data;
});

//if no url query then display index.html
if(q.pathname === "/") {
    fs.readFile("./index.html", (err, data)=> {
        if (err) {
           res.writeHead( 404, {"Content-Type": "text/html"});
           return res.end("404 error, not found");
        }
        res.writeHead( 200, {"Content-Type": "text/html"});
        res.write(data);
        return res.end();
    });
}
//read page based on url
else {
    fs.readFile(`.${q.pathname}`, (err, data)=> {
        if (err) {
            res.writeHead( 404, {"Content-Type": "text/html"});
            res.write(errorPage);
            return res.end();
        }
        res.writeHead( 200, {"Content-Type": "text/html"});
        res.write(data);
        return res.end();
    });
}
}).listen(8080);

