const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token: 'test123',
    });
});

app.use('/orbat', (req, res) => {
    res.send({
        'Headquarters': [
             {
                name: 'John Doe',
                rank: 'Sergeant',
                role: 'Rifleman',
                status: 'Active',
            },
            {
                name: 'Jane Doe',
                rank: 'Sergeant',
                role: 'Rifleman',
                status: 'Active',
            }
            ],
        '1st Infantry Division': [
            {
                name: 'John Doe',
                rank: 'Sergeant',
                role: 'Rifleman',
                status: 'Active',
            },
            {
                name: 'Jane Doe',
                rank: 'Sergeant',
                role: 'Rifleman',
                status: 'Active',
            }
        ]
    })
})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));