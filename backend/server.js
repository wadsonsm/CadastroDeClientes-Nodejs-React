const express = require('express');
const app = express();
const cadastros = [];

app.use(require("cors")());
app.use(express.json());

app.get('/relatorio', async (req, res, next) => {
    try {
        const cadastro = await res.send(cadastros);
        res.send((cadastro));
    } catch (error) {
        console.log(error);
    }
})

app.post('/cadastro', (req, res, next) => {
    console.log("Cadastro recebido");
    cadastros.push({
        name: req.body.name,
        idade: parseInt(req.body.txtIdade),
        uf: req.body.cmbUF
    });
    console.log(cadastros);
    res.json({ message: "Tudo ok por aqui !", dados: cadastros });
})

app.listen(3001, () => console.log('Server started on port 3001'));