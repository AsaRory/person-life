(function(){
    var injectStore = {
        init: function(){
            var that = this;
            window.sensorsdataScreenCut = function(element_selector){
                that.postToContentScript({
                    element_selector: element_selector
                });
            };
          
        },
        postToContentScript : function(data){
            data.source = 'sa-cut-inject';
            if(window.postMessage){
                window.postMessage(data, '*');
            }

        }
        
    };
    injectStore.init();
    
})();