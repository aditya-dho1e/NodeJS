const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json')

const app = express();

app.use(express.urlencoded({ extended: false }));

app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id===id);
    return res.json(user);
}).patch((req,res)=>{
    const id = Number(req.params.id);
    const body = req.body;

    console.log(body);

    const user = users.find((u)=>u.id===id);

    updated_user = {...user, ...body};
    
    updated_users = users.map((u)=>u.id===id ? updated_user : u);

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(updated_users), ()=>{
        return res.json({status:'success', user:[updated_user]});
    })
})

app.get('/users', (req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

app.post('/', (req,res)=>{
    const body = req.body;
    console.log(body);
    users.push({...body, id: users.length + 1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(user), (err, data)=>{
        return res.json({status:'success', id: users.length});
    })
})

app.listen(8000, ()=>console.log('server started at 8000.'))