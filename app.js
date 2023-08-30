const express = require('express');
const app = express ();
app.use(express.json());
const fs = require('fs');

const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');

app.get('/api/numbers/:id', (req, res) => {

    let numbers = readFileLines('numbers.txt');

    for (let i = 0; i < numbers.length - 1; i ++)
    {
        let numberAttributes = numbers[i].split(' ');
        let currId = numberAttributes[0];
        let strCurrId = ':' + currId;
        if (strCurrId == req.params.id)
        {
            const number = {
                id : parseInt(numberAttributes[0]),
                value : parseInt(numberAttributes[1])
            };

            res.send(number);
            break;
        }
        else if (i == numbers.length - 2){
        res.status(404).send('Such number does not exist!');
        }
    }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

app.post('/api/numbers', (req, res)=> {
    let numbers = readFileLines('numbers.txt');
    if (numbers[0] !== '')
    {
        
        let lastId = parseInt(numbers[numbers.length - 2].split(' ')[0]);
        let currValue = getRandomInt(1, 1000);
        let currId = lastId + 1;
        const number = {
        id : currId,
        value : currValue
        };
        
        fs.appendFileSync('numbers.txt', currId.toString() + ' ' + currValue.toString() + '\n');
        res.send(number);
    }
    else{
        let currValue = getRandomInt(1, 1000);
        const number = {
            id : 1,
            value : currValue
        };

        fs.appendFileSync('numbers.txt', '1 ' + currValue.toString() + '\n');
        res.send(number);
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));