/**
 * Created by tdzl2003 on 6/6/16.
 */

var rongSDK = require('rongcloud-sdk');
rongSDK.init('sfci50a7cvtfi', 'tpVzVcI0oT');

export function getRongToken(uid){
  return new Promise((resolve, reject)=>{
    rongSDK.user.getToken(uid, '1','2', function(err, resultText){
      if (err){
        reject(err);
      }
      var result = JSON.parse(resultText);
      if (result.code === 200){
        resolve(result.token);
      } else {
        reject(new Error('Rongcloud return error '+result.code));
      }
    })
  });

}