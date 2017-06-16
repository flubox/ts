var restify = require('restify');
var fs = require('fs');
var a = 'http://localhost:8080/fakeimg/';
var imgList = fs.readdirSync(__dirname + '/../demo/')
.filter(f => f.match(/\.png$/))
.map(f => ({
    filename: `../demo/${f}`,
    radix: f.match(/^(.+)_[\d]+/)[1],
    resolution: parseInt(f.match(/([\d]+)px.png$/)[1], 10)
}))
.sort((a, b) => a.radix < b.radix ? -1 : 1)
.reduce((accumulator, current, index, all) => {
    if (index % 2 === 0) {
        return accumulator.concat([{id: index / 2, url: [current.filename, all[index + 1].filename]}]);
    }
    return accumulator;
}, [])
;
fs.writeFileSync(__dirname + '/demo.json', JSON.stringify(imgList));