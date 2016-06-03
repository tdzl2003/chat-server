/**
 * Created by tdzl2003 on 3/9/16.
 */

const env = process.env.NODE_ENV || 'development';
const qiniu = require("qiniu");
const config = require('../../config/filestore.json')[env];

qiniu.conf.ACCESS_KEY = config.accessKey;
qiniu.conf.SECRET_KEY = config.secretKey;

import filesizeParser from 'filesize-parser';
import crypto from 'crypto';

const MAX_SIZE = filesizeParser(config.maxSize || '20m');

const putPolicy = new qiniu.rs.PutPolicy2({
  scope: config.bucket,
  fsizeLimit: MAX_SIZE,
  returnBody: `{"key": $(etag)}`,
})

export function createUploadToken(){
  const token = putPolicy.token();
  return {
    url: 'http://upload.qiniu.com/',
    fieldName: 'file',
    formData: {
      token,
      accept: 'application/json',
    },
    responseType: 'json',
  };
}

export async function upload(ctx) {
  ctx.body = createUploadToken();
}

const getPolicy = new qiniu.rs.GetPolicy();

export function getDownloadUrl(key, process) {
  if (!key) {
    return null;
  }
  const url = `http://${config.domain}/${key}`;
  //return getPolicy.makeRequest(url);
  if (process){
    return `${url}?${process}`;
  }
  return url;
}

export function imageView2(mode, options) {
  const op = Object.keys(options).map(k=>`/${k}/${options[k]}`).join('');
  return `imageView2/${mode}${op}`;
}

var client = new qiniu.rs.Client();

export function stat(key) {
  return new Promise((resolve, reject)=>{
    client.stat(config.bucket, key,
      (err, ret)=>err?reject(Object.assign(new Error(err.error), {code:err.code})):resolve(ret));
  });
}

export function exists(key) {
  return new Promise((resolve, reject)=>{
    client.stat(config.bucket, key,
      (err, ret)=>{
        if (err) {
          if (err.code === 612) {
            resolve(false);
          } else {
            reject(Object.assign(new Error(err.error), {code:error.code}));
          }
        } else {
          resolve(true);
        }
      });
  });

}