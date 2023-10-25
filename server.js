const express = require('express');

let app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res, next) => {
    res.send("Hello word")
})

app.get("/api/v1/test/:myparams", (req, res, next) => {
    let n = +req.params.myparams;
    if (1 <= n && n <= 100 && Number.isInteger(n)) {
        let fn = [];
        let i = 1;
        let n1 = 1;
        let n2 = 1;
        for (let j = 0; j < n; j++) {
            if (j < 2) {
                fn.push(j);
            } else {
                fn.push(i);
                i = n1 + n2;
                n1 = n2;
                n2 = i;
            }
        }
        res.json({
            "member-count": req.params.myparams,
            "sequence": [fn],
            "total": fn.reduce((a, b) => a + b, 0)
        })
    } else {
        res.status(413).send({ error: 'Parameter is not Valid Number!' });
    }
})

app.listen(3000, () => {
    console.log('this server port 3000')
})