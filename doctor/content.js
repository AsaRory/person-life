
var emailjs;
function loadThirdPartyScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
}

function initEmailjs(){
emailjs =function(e){"use strict";class t{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Network Error";this.status=e,this.text=t}}const i={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},r=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},o=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"https://api.emailjs.com";if(!e)return;const o=r(e);i.publicKey=o.publicKey,i.blockHeadless=o.blockHeadless,i.storageProvider=o.storageProvider,i.blockList=o.blockList,i.limitRate=o.limitRate,i.origin=o.origin||t},a=async function(e,r){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const a=await fetch(i.origin+e,{method:"POST",headers:o,body:r}),s=await a.text(),n=new t(a.status,s);if(a.ok)return n;throw n},s=(e,t,i)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!i||"string"!=typeof i)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},n=e=>e.webdriver||!e.languages||0===e.languages.length,l=()=>new t(451,"Unavailable For Headless Browser"),c=(e,t)=>{if((e=>{var t;return!(null!==(t=e.list)&&void 0!==t&&t.length&&e.watchVariable)})(e))return!1;((e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"})(e.list,e.watchVariable);const i=(r=t,o=e.watchVariable,r instanceof FormData?r.get(o):r[o]);var r,o;return"string"==typeof i&&e.list.includes(i)},d=()=>new t(403,"Forbidden"),m=async(e,t,i)=>{if(!t.throttle||!i)return!1;((e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a string"})(t.throttle,t.id);const r=t.id||e,o=await(async(e,t,i)=>{const r=Number(await i.get(e)||0);return t-Date.now()+r})(r,t.throttle,i);return o>0||(await i.set(r,Date.now().toString()),!1)},h=()=>new t(429,"Too Many Requests"),p=async(e,t,o,p)=>{const u=r(p),b=u.publicKey||i.publicKey,g=u.blockHeadless||i.blockHeadless,f=i.storageProvider||u.storageProvider,v={...i.blockList,...u.blockList},w={...i.limitRate,...u.limitRate};if(g&&n(navigator))return Promise.reject(l());if(s(b,e,t),(e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"})(o),o&&c(v,o))return Promise.reject(d());if(await m(location.pathname,w,f))return Promise.reject(h());const y={lib_version:"4.3.3",user_id:b,service_id:e,template_id:t,template_params:o};return a("/api/v1.0/email/send",JSON.stringify(y),{"Content-type":"application/json"})},u=async(e,t,o,p)=>{const u=r(p),b=u.publicKey||i.publicKey,g=u.blockHeadless||i.blockHeadless,f=i.storageProvider||u.storageProvider,v={...i.blockList,...u.blockList},w={...i.limitRate,...u.limitRate};if(g&&n(navigator))return Promise.reject(l());const y=(e=>"string"==typeof e?document.querySelector(e):e)(o);s(b,e,t),(e=>{if(!e||"FORM"!==e.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"})(y);const j=new FormData(y);return c(v,j)?Promise.reject(d()):await m(location.pathname,w,f)?Promise.reject(h()):(j.append("lib_version","4.3.3"),j.append("service_id",e),j.append("template_id",t),j.append("user_id",b),a("/api/v1.0/email/send-form",j))};var b={init:o,send:p,sendForm:u,EmailJSResponseStatus:t};return e.EmailJSResponseStatus=t,e.default=b,e.init=o,e.send=p,e.sendForm=u,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
  return emailjs;
}


function loadScript(scriptCode) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  script.textContent = scriptCode;
  (document.head || document.documentElement).appendChild(script);

  script.onload = function () {
    console.log('加载插件=');
    script.remove();
  };
}

const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
script.src = `
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
          reject(new Error(\`Request failed with status: \${xhr.status}\`));
        }
      }
    };
  });
}
console.log('加载插件=');

setTimeout(() => {
  getDoctorDate();
}, 5000)
`;


script.onload = function () {
  console.log('加载插件=',);
  script.remove();
};

function getDoctorDate(page, doctor_sn, hospital_id) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://www.yihu.com/DoctorArrange/doGetListByPage', true);

    xhr.setRequestHeader('accept', '*/*');
    xhr.setRequestHeader('accept-language', 'zh-CN,zh;q=0.9');
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader('pragma', 'no-cache');
    xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');

    xhr.withCredentials = true;

    xhr.send(`page=${page}&doctor_sn=${doctor_sn}&hospital_id=${hospital_id}`);

    xhr.onreadystatechange = function () {
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

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setRandomInterval(minInterval, maxInterval, func) {
  var intervalId = null; // 用于存储 interval 的 ID

  async function executeFunction() {
    await Promise.resolve(func());
    var interval = getRandomInterval(minInterval, maxInterval);
    intervalId = setTimeout(executeFunction, interval);
}

  // 启动定时器
  function start() {
    if (!intervalId) {
      executeFunction();
    }
  }

  // 停止定时器
  function stop() {
    clearTimeout(intervalId);
    intervalId = null;
  }

  // 重新启动定时器
  function restart() {
    stop();
    start();
  }

  // 返回公共方法
  return {
    start: start,
    stop: stop,
    restart: restart
  };
}



function flattenAndDistinct(arr) {
  function sortDates(arr) {
    const sortedArray = arr.sort((a, b) => new Date(a) - new Date(b));
    return sortedArray;
  }
  // 扁平化数组
  const flattenedArray = arr.flat(Infinity);

  // 去重
  const distinctArray = [...new Set(flattenedArray)];
  return sortDates(distinctArray);
}

function init() {
  var startButton;
  initEmailjs();
  emailjs.init({
    publicKey: "J0uDGZeOnOp1nOvob",
  });
  // loadThirdPartyScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
  console.log('emailjs=', emailjs)
  function sendSmg(message){
    emailjs.send("service_nab0gvd", "template_5bhjtbe", {  // TODO: 替换成自己的serviceID、templateID
      to_name: "收件人名称",
      from_name: "发件人名称",
      message,
      to_email: "61921683@qq.com",  // 接收邮箱
      })
      .then(function(response) {
      console.log("邮件发送成功！", response.status, response.text);
      }, function(error) {
      console.log("邮件发送失败...", error);
      });
  }
  function optimizeMethod() {
    return new Promise((resolve, reject) => {
      const elements = document.querySelectorAll('[data-doctorsn]');
      const promises = [];

      elements.forEach((element) => {
        const targetElement = element.querySelector('.c-position-a.myschedule-none');
        if (targetElement && window.getComputedStyle(targetElement).display !== 'none') {
          return;
        }
        const hospitalId = element.getAttribute('data-hospitalid');
        const doctorsn = element.getAttribute('data-doctorsn');

        const promise1 = getDoctorDate(1, doctorsn, hospitalId).then((data) => {
          return getInfo(data)
        });
        const promise2 = getDoctorDate(2, doctorsn, hospitalId).then((data) => {
          return getInfo(data)
        });
        const promise3 = getDoctorDate(3, doctorsn, hospitalId).then((data) => {
          return getInfo(data)
        });
        promises.push(promise1, promise2, promise3);
      });

      return Promise.all(promises).then((res) => {
        resolve(flattenAndDistinct(res));
      }).catch(error => {
        reject(error);
      });
    });
  }

  const task = setRandomInterval(1000, 5000, () => {
    return optimizeMethod().then(res => {
      // 有数据
      if(res && res.length){
        console.log('res=',res);
        startButton.textContent = '开始';
        alert(`${res.join(';')}--这些日期可预约,快去预约挂号吧`);
        task.stop();
        sendSmg(`${res.join(';')}--这些日期可预约,快去预约挂号吧`);
      }
      console.log(flattenAndDistinct(res))
    });
  })



  // content.js
  document.addEventListener('DOMContentLoaded', function () {
    // 创建开始按钮
    startButton = document.createElement('button');
    startButton.textContent = '开始';
    startButton.style.width = '100px';
    startButton.style.height = '50px';
    startButton.style.borderRadius = '25px';
    startButton.style.backgroundColor = '#007BFF'; // 蓝色
    startButton.style.position = 'fixed';
    startButton.style.bottom = '0';
    startButton.style.right = '170px';
    startButton.style.color = 'white';
    startButton.style.border = '2px solid white';
    startButton.style.display = 'inline-block';

    startButton.addEventListener('click', function () {
      if (startButton.textContent === '开始') {
        startButton.textContent = '结束';
        task.start();
      } else {
        startButton.textContent = '开始';
        task.stop();
      }
    });


    // 创建查看日志按钮
    const logButton = document.createElement('button');
    logButton.textContent = '查看日志';
    logButton.style.width = '100px';
    logButton.style.height = '50px';
    logButton.style.borderRadius = '25px';
    logButton.style.backgroundColor = '#28A745'; // 绿色
    logButton.style.position = 'fixed';
    logButton.style.bottom = '0';
    logButton.style.right = '50px';
    logButton.style.color = 'white';
    logButton.style.border = '2px solid white';
    logButton.style.display = 'inline-block';

    document.body.appendChild(startButton);
    document.body.appendChild(logButton);
  });
}
init();



function getInfo(htmlString) {
  function extractDate(dateStr) {
    const regex = /\d{4}-(?:\d{1,2})-(?:\d{1,2})/;
    const match = dateStr.match(regex);
    if (match) {
      return match[0];
    }
    return null;
  }
  // 创建一个临时的 DOM 元素来解析 HTML 字符串
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // 获取所有包含可预约信息的 <td> 元素
  const availableDateCells = tempDiv.querySelectorAll('.myschedule-stat');

  // 存储可预约日期
  const availableDates = [];

  // 遍历可预约的 <td> 元素
  availableDateCells.forEach((cell) => {
    // 获取对应的日期元素
    const dateElement = cell.parentNode.parentNode.querySelector('.pop-myschedule-info');
    if (dateElement) {
      availableDates.push(extractDate(dateElement.textContent));
    }
  });
  return availableDates
}

// setTimeout(() => {
//   console.log(1);
//   // getDoctorDate();
// }, 100)

// 在页面加载完成后注入 JavaScript
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status === 'complete') {
//     chrome.tabs.executeScript(tabId, {
//       code: `
//       function getDoctorDate() {
//   return new Promise((resolve, reject) => {
//     var xhr = new XMLHttpRequest();

//     xhr.open('POST', 'https://www.yihu.com/DoctorArrange/doGetListByPage', true);

//     xhr.setRequestHeader('accept', '*/*');
//     xhr.setRequestHeader('accept-language', 'zh-CN,zh;q=0.9');
//     xhr.setRequestHeader('cache-control', 'no-cache');
//     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
//     xhr.setRequestHeader('pragma', 'no-cache');
//     xhr.setRequestHeader('sec-ch-ua', '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"');
//     xhr.setRequestHeader('sec-ch-ua-mobile', '?0');
//     xhr.setRequestHeader('sec-ch-ua-platform', '"macOS"');
//     xhr.setRequestHeader('sec-fetch-dest', 'empty');
//     xhr.setRequestHeader('sec-fetch-mode', 'cors');
//     xhr.setRequestHeader('sec-fetch-site','same-origin');
//     xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');

//     xhr.withCredentials = true;

//     xhr.send('page=3&doctor_sn=711263101&hospital_id=32');

//     xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           resolve(xhr.responseText);
//         } else {
//           reject(new Error(\`Request failed with status: ${xhr.status}\`));
//         }
//       }
//     };
//   });
// }
// console.log('加载插件=');

// setTimeout(() => {
//   getDoctorDate();
// }, 5000)

//       `
//     });
//   }
// });