
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
// 设置脚本的源文件
(document.head || document.documentElement).appendChild(script);


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

  function executeFunction() {
    func();
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
  // loadThirdPartyScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');

  function sendSmg(){
    emailjs.send("service_nab0gvd", "template_5bhjtbe", {  // TODO: 替换成自己的serviceID、templateID
      to_name: "收件人名称",
      from_name: "发件人名称",
      message: "测试邮件正文邮件正文",
      to_email: "451714324@qq.com",  // 接收邮箱
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
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  const task = setRandomInterval(1000, 5000, () => {
    optimizeMethod().then(res => {
      // 有数据
      if(res && res.length){
        task.stop();
        sendSmg();
      }
      console.log(flattenAndDistinct(res))
    });
  })



  // content.js
  document.addEventListener('DOMContentLoaded', function () {
    // 创建开始按钮
    const startButton = document.createElement('button');
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