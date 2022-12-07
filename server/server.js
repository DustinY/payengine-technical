const express = require('express');
const app = express();
const path = require('path');
const crypto = require("crypto");
const knexConfig = require('./knexfile');
const axios = require('axios');
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const getMerchantId = async () => {
    privateToken = process.env.PRIVATE_KEY //TODO: Create the PRIVATE_TOKEN varriable
    const user = await knex('users').first('user_id', 'name', 'email', 'merchant_id')
        // .then((users => {
        // }))
    console.log(user)
    if (!user.merchant_id) {
        console.log('CREATE/RETRIEVE MERCHANT ID')
        config = {
            method: 'post',
            url: 'https://console.payengine.dev/api/merchant',
            headers: {
                'accept': 'application/json',
                'Authorization': `Basic ${privateToken}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                'external_id': user.user_id,
                'email': user.email,
                'name': user.name
            })
        }
        axios(config)
        .then((res) => {
            const merchantId = res.data.data.id
            console.log(merchantId)
            knex('users')
                .update({ merchant_id: merchantId })
                .where({ user_id: user.user_id })
                .then((rows => {
                    console.log(rows)
                }))
                
        })
        .catch((err) => {
            console.log(err)
        });
    }
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('In root request')
    res.redirect('/index.html')
})

app.get('/index.html', (req, res) => {
    getMerchantId().then(() => {
        res.sendFile('/app/server/public/index.html')
    })
})

app.get('/merchant-id', async (req, res) => {
    const user = await knex('users').first('user_id', 'name', 'email', 'merchant_id')
    console.log(`Loading merchant ${user.merchant_id}`)
    res.json({'merchant_id': user.merchant_id})
})

app.get('/merchants/:merchantId/hash', (req, res) => {
    console.log('Getting merchants hash')
    knex('users').select('name').then((users => {
        console.log(users)
    }))
    const merchantId = req.params.merchantId
    const merchantIdHash = crypto.createHmac("sha256", process.env.PRIAVE_KEY).update(merchantId).digest("hex")
    res.json({ "merchantIdHash": merchantIdHash })
})

app.use(express.static('./public'))

app.listen(3000)