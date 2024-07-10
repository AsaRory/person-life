function getDoctorDate() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://www.yihu.com/DoctorArrange/doGetListByPage', true);

    xhr.setRequestHeader('accept', '*/*');
    xhr.setRequestHeader('accept-language', 'zh-CN,zh;q=0.9');
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader('pragma', 'no-cache');
    xhr.setRequestHeader('sec-ch-ua', '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"');
    xhr.setRequestHeader('sec-ch-ua-mobile', '?0');
    xhr.setRequestHeader('sec-ch-ua-platform', '"macOS"');
    xhr.setRequestHeader('sec-fetch-dest', 'empty');
    xhr.setRequestHeader('sec-fetch-mode', 'cors');
    xhr.setRequestHeader('sec-fetch-site','same-origin');
    xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');

    xhr.withCredentials = true;

    xhr.send('page=3&doctor_sn=711263101&hospital_id=32');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Request failed with status: ${xhr.status}`));
        }
      }
    };
  });
}
console.log('加载插件=');

setTimeout(() => {
  getDoctorDate();
}, 5000)