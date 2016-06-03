/**
 * Created by tdzl2003 on 4/3/16.
 */

export default function checkUpdates(names, pairs) {
  const ret = {};
  names.forEach(key=>{
    if (pairs[key]) {
      ret[key] = pairs[key];
    }
  });
  return ret;
}