const argv = require('minimist')(process.argv.slice(2))
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const log = require('./logger')
const static = require('./static')
const port = argv.p || 80

log.printLog('info','Starting server ...')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.enable('trust proxy')

app.use((req,res,next)=>{
	log.listenResEnd(req,res)
	next()
},static(argv._[0]||'./'))

app.listen(port, ()=>{
	log.printLog('info','Listening on port ' + (port+'').cyan)
})