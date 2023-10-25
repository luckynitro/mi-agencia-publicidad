// app.js
const express = require('express');
const axios = require('axios');
const Web3 = require('web3');
const contratoAbi = require('./contrato_abi.json');

const app = express();
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/abd0b48d19164fd792ad4fb7f1172733'));

const contratoAddress = 'DIRECCION_DEL_CONTRATO'; // Reemplaza con la dirección de tu contrato
const contrato = new web3.eth.Contract(contratoAbi, contratoAddress);

const FACEBOOK_ACCESS_TOKEN = 'TU_TOKEN_DE_ACCESO_DE_FACEBOOK';

app.get('/obtener-historia', async (req, res) => {
    try {
        const historia = await contrato.methods.getHistoria().call();
        res.send(`Historia: ${historia}`);
    } catch (error) {
        res.status(500).send('Error al obtener la historia.');
    }
});

app.get('/obtener-informacion-facebook', async (req, res) => {
    try {
        const respuesta = await axios.get('https://graph.facebook.com/me', { params: { access_token: FACEBOOK_ACCESS_TOKEN } });
        res.json(respuesta.data);
    } catch (error) {
        res.status(500).send('Error al obtener la información de Facebook.');
    }
});

app.listen(3000, () => {
    console.log('Servidor en funcionamiento en el puerto 3000.');
});







