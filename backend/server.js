const express = require('express');
const app = express();
const cadastros = [];

app.use(require("cors")());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json(cadastro);
})

app.post('/cadastro', (req, res, next) => {
    console.log("Cadastro recebido");
    cadastros.push({
        name: req.body.txtNome,
        idade: parseInt(req.body.txtIdade),
        uf: req.body.cmbUF
    });
    console.log(cadastros);
    res.json({ message: "Tudo ok por aqui !", dados: cadastros });
})

app.listen(3001, () => console.log('Server started on port 3001'));