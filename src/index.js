/*Importa pacote express */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

/*Utiliza a funcao*/
const app = express();

/*Pega os valores do formulário*/
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
})

/*End-point*/
app.post('/imc', (req, res) => {
    const peso = req.body.peso;
    const altura = req.body.altura;
    var classifcacao = '';
    var imc = peso/(altura*altura);
    console.log(imc);

    if (imc < 18.5) 
    {
        classifcacao = "Abaixo do peso";
    }
    else if(imc > 18.5 && imc <= 24.9)
    {
        classifcacao = "Peso normal";
    }
    else if(imc >= 25 && imc <= 29.9)
    {
        classifcacao = "Acima do peso (sobrepeso)";
    }
    else if(imc >= 30 && imc <= 34.9)
    {
        classifcacao = "Obesidade 1";
    }
    else if(imc >= 35 && imc <= 39.9)
    {
        classifcacao = "Obesidade 2";
    }
    else if(imc > 40)
    {
        classifcacao = "Obesidade 3";
    }
    res.send(`Seu IMC é de ${imc.toFixed(2)} você está no estado de "${classifcacao}". `);
});

/*Define a porta que o servidor vai ouvir*/
app.listen(3000);