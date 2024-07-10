(function(){
    var contentScriptStore = {
        loadContentScript: false,
        loadInject : false,
        init: function(){
            if(!this.loadContentScript){
                this.addListener();
                this.loadContentScript = true;
                let div = document.createElement('div');
                div.setAttribute('id', 'pupu-visual-buried-point-extension-installed-div');
                document.getElementsByTagName('body')[0].appendChild(div);
            }
        },
        addListener:function(){
            var that = this;
            if(window.addEventListener){
                window.addEventListener('message',function(e){
                    if(!e||!e.data){
                        return;
                    }
                    if(e.data.source === 'sa-fe' && e.data.type === 'v-define-ready'){
                        if(!that.loadInject){
                            that.loadScript('./js/inject.js');
                        }
                        that.loadInject = true;
                    }else if(e.data.source == 'sa-cut-inject'){
                        e.data.source = 'sa-cut-callGround';
                        that.postToGround(e.data);
                    }
                },false);
            }
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
                if(request.source == 'sa-cut-ground'){
                    that.postMessageToSA({
                        source:'sa-web-plugin',
                        type: 'v-define-screenshot',
                        data:{
                            screenshot: request.dataUrl,
                            element_selector: request.element_selector
                        }
                    });
                }
                sendResponse('get message：' +JSON.stringify(request));
            });
             
        },
        loadScript: function(file){
            var script = document.createElement('script');
            script.src = chrome.runtime.getURL(file);
            script.charset = "UTF-8";
            document.body.appendChild(script);
        },
        postToGround: function(data){
            if(typeof chrome.app.isInstalled !== 'undefined'){
                chrome.runtime.sendMessage(data, function(response) {
                    if (typeof console === 'object' && typeof console.log === 'function') {
                        console.log(response);
                    } 
                });
             }
        },
        postMessageToSA: function(message){
            if(window.postMessage){
                window.postMessage(message, '*');
            }
        }
         
    };
     
      
    contentScriptStore.init();
 
      
 
})();