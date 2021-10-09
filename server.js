const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {'id': 1, 'image': 'https://placeimg.com/64/64/1', 'name': '홍길동', 'birthday': '961222', 'gender': '남자', 'job': '대학생'},
        {'id': 2, 'image': 'https://placeimg.com/64/64/2', 'name': '나예뻐', 'birthday': '700823', 'gender': '여자', 'job': '청소부'},
        {'id': 3, 'image': 'https://placeimg.com/64/64/3', 'name': '고영석', 'birthday': '020117', 'gender': '남자', 'job': 'PD'}
      ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));