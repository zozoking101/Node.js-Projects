const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify'); // ^ wants all, ~ needs the least updated, npm outdated

const replaceTemplate = require('./modules/replaceTemplate');


////////////////////////////////////////////////////////////////
// FILES
// ES6 Javascript notation
// const hello = 'Hello world!';
// console.log(hello)

// Blocking synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is was the input: ${textIn}. \n Created on ${Date.now()}.`;
// console.log(textOut);

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR! ');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log('File written! 😃');
//             })
//         });
//     });
// });
// console.log('Reading File...');

/////////////////////////////////////////////////////////////////
// SERVER
const PORT = 8000;
const IP = '127.0.0.1';

// const replaceTemplate

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8', );
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8', );
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8', );

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', );
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true}))
console.log(slugs)
// console.log(slugify('Fresh Avocados', { lower: true}))

const server = http.createServer((req, res) => {
    
    const { query, pathname } = url.parse(req.url, true)
    // const pathname = req.url;

    // console.log(req.url);
    console.log(url.parse(req.url, true));
    
    // console.log(req)
    // console.log(pathname)
    // res.writeHead(200);
    // res.end('Hello from the server!');


    // Overview page
    if(pathname === '/' || pathname === '/overview') { 
        res.writeHead(200, {'Content-type': 'text/html'});
        
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        // console.log(cardsHtml);

        res.end(output);

    // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const product = dataObj[query.id]
        console.log(dataObj[query.id])
        // console.log(query);

        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    
    // Card page
    } else if(pathname === '/card') { 
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(tempCard);
    
    // API
    } else if (pathname === '/api') {
            
        res.writeHead(200, {'Content-type': 'application/json'});
        // const productData = JSON.parse(data);
        // console.log(productData);
        res.end(data);

    // Not found page
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>404<br>Page not found!</h1>');
    }
});

server.listen(PORT, IP, () => {
    console.log(`Listening to requests on http://localhost:${PORT}\n${IP}:${PORT}`);
});
