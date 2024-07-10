
(function(){
    var backgroundStore = {
        init:function(){
            this.contentListener();
        },
        contentListener: function(){
            var that = this;
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
            {   
                debugger
                console.log("🚀 ~ file: background.js:10 ~ request:", request)
                if(request.source == 'sa-cut-callGround'){
                    chrome.tabs.captureVisibleTab(null,{},function(dataUrl){
                        var data = {
                            element_selector : request.element_selector,
                            dataUrl : dataUrl,
                            source : 'sa-cut-ground'
                        };
                        that.postToContent(data);
                    });
                }
                sendResponse('plugin background 截图完毕');
                
            });
        },
        postToContent: function(message){
            this.getCurrentTabId(function(tabId){
                chrome.tabs.sendMessage(tabId, message, function(response)
                {
                    if (typeof console === 'object' && typeof console.log === 'function') {
                        console.log(response);
                    }
                });
            });
        },
        getCurrentTabId: function(callback){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                if(callback) callback(tabs.length ? tabs[0].id: null);
            });
        }
    };
    backgroundStore.init();
})();
