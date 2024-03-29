const CLIENT_ID = process.env.VIMEO_CLIENT_ID;
const CLIENT_SECRET = process.env.VIMEO_CLIENT_SECRET;
const ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;
const PROJECT_ID = process.env.VIMEO_PROJECT_ID;
const OUTPUT_DIR = process.env.PPT2VIDEO_OUTPUT_DIR

const path = require('path');
var fs = require('fs');
var dir = require('node-dir');
var Vimeo = require('vimeo').Vimeo;

var outputList = dir.files(path.resolve(OUTPUT_DIR), {sync:true});
var jsonFile = outputList.find(val => val.match(/.json$/g));
var mp4Files = outputList.filter(val => val.match(/.mp4$/g));

var client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

function jsonReplace (jsonFile,vimeolist){
  fs.readFile(jsonFile, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    for (const key in vimeolist) {
        data = data.replace('"file": "'+key+'"','"url": "'+vimeolist[key]+'"');
    }
    fs.writeFile(jsonFile, data, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
}

const vimeolist = {};
function uploadVimeo(client,jsonFile,mp4Files) {
  let cnt = mp4Files.length;
  mp4Files.forEach(val => {
    let fileName = path.basename(val);
    client.upload(
      val,
      {
        'name': fileName
      },
      function (uri) {
        console.log('countdown:', cnt,' File upload:',fileName,' completed. Your Vimeo URI is:', uri)
        vimeolist[fileName] = uri.replace('/videos/','https://vimeo.com/')
        if(cnt == 1){
          console.log('vimeolist:', vimeolist)
          jsonReplace(jsonFile,vimeolist)
        }
        cnt--;
        client.request({path: '/me/projects/' + PROJECT_ID + uri, method: 'PUT'}, function (error, body, status_code, headers) {console.log('video to a folder',body);})
        fs.unlink(val, (err) => { if (err) throw err; console.log('deleted',val)})
      },
      function (bytesUploaded, bytesTotal) {
        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
        console.log(bytesUploaded, bytesTotal, percentage + '%')
      },
      function (error) {
        console.log('Failed because: ' + error)
      }
    )
  });
}

module.exports = {
    settings:[client,jsonFile,mp4Files],
    uploadVimeo
};
