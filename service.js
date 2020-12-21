const {google} = require('googleapis');
const keys = require('./keys.json');
const EventEmitter = require('events')

const Submit = require('./js/form.js')
const submit = new Submit();

const emitter = new EventEmitter();

//Register a listener

emitter.on('submitClicked',function(e){
  console.log('Listener called', e)
});

const newData = submit.values;

// console.log(newData);

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){
  if(err){
    console.log(err);
    return;
  }else{
    console.log('Connected!');
    gsrun(client);
  }

});

async function gsrun(cl){
  const gsapi = google.sheets({version:'v4', auth: cl})

  // const opt = {
  //   spreadsheetId: '107kB65oywODwIBG0lVm72hdIKk61bsVF_tBqp3f5eOY',
  //   range: 'Sheet1'
  // };

  // let data = await gsapi.spreadsheets.values.get(opt);
  // // console.log(data.data.values);

  // let dataArray = data.data.values;

  // console.log(dataArray);
  // newData = [['6','INNINN','adwa','adwa']]

  const updateOpt = {
    spreadsheetId: '107kB65oywODwIBG0lVm72hdIKk61bsVF_tBqp3f5eOY',
    range: 'Sheet1',
    valueInputOption: 'RAW',
    resource: { values: newData }
  };

  let res = await gsapi.spreadsheets.values.append(updateOpt); 

  console.log(res)
};