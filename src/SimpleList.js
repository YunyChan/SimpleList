/**
 * Created by yunying on 2016/7/8.
 */
(function(oWin, oDoc){
    // Helper
    var Helper = {
        listenEvent: fListenEvent
    };

    function fListenEvent(oDom, sEventName, fCallback, bUseCapture){
        if(oWin.attachEvent){
            oDom.attachEvent('on' + sEventName, function(){
                var oEvent = oWin.event;
                fCallback && fCallback(oEvent);
            });
        }else{
            oDom.addEventListener(sEventName, fCallback, !!bUseCapture);
        }
    }


    var SimpleList = fConstructor;
    // 静态变量
    SimpleList.prototype.isBoundScroll = false;
    // 静态方法
    SimpleList.prototype.init = fInit;
    SimpleList.prototype.initEvents = fInitEvents;
    SimpleList.prototype.render = fRender;
    SimpleList.prototype.renderList = fRenderList;
    SimpleList.prototype.createItems = fCreateItems;
    SimpleList.prototype.update = fUpdate;
    SimpleList.prototype.renderLoading = fRenderLoading;

    SimpleList.prototype.onScroll = fOnScroll;

    function fConstructor(oConf){
        this.config =  oConf = oConf || {};
        this.target = oConf.target;
        this.isEndless = !!oConf.isEndless;
        this.item = oConf.item || '';
        this.onReachBottom = oConf.onReachBottom || null;
        this.isShowLoading = !!oConf.isShowLoading;
        this.loadingTemplate = oConf.loading || '';

        this.init();
        return this;
    }

    function fInit(){
        this.render();
        this.initEvents();
    }

    function fInitEvents() {
        var that = this;
        if(this.isEndless && !this.isBoundScroll){
            SimpleList.prototype.isBoundScroll = true;
            Helper.listenEvent(oWin, 'scroll', function (oEvent) {
                that.onScroll(oEvent);
            });
        }
    }

    function fRender() {
        this.renderList();
        this.renderLoading();
    }

    function fRenderList() {
        this.wrap = oDoc.createElement('ul');
        this.update(this.config.data);
        this.target.appendChild(this.wrap);
    }

    function fCreateItems(aData) {
        var sItemsHTML = '';
        for(var cnt = 0, length = aData.length; cnt < length; cnt++){
            var oData = aData[cnt];
            sItemsHTML += '<li>' + this.item(cnt, oData) + '</li>';
        }
        return sItemsHTML;
    }
    
    function fUpdate(aData) {
        var sBaseHtml = this.isEndless ? this.wrap.innerHTML : '';
        this.wrap.innerHTML = sBaseHtml + this.createItems(aData);
    }

    function fRenderLoading() {
        if(this.isEndless && this.isShowLoading){
            this.loading = oDoc.createElement('div');
            this.loading.className = 'simple-list-loading';
            if(this.loadingTemplate){
                this.loading.innerHTML = this.loadingTemplate;
            }else{
                this.loading.innerHTML = '<p>正在加载中，请稍后</p>';
            }
            this.target.appendChild(this.loading);
        }
    }

    function fOnScroll(oEvent) {
        var oHtml = document.documentElement;
        if(this.target) {
            var oTargetRect = this.target.getBoundingClientRect();

            var nTargetBottom = Math.floor(oTargetRect.bottom);
            // console.log('List bottom: ' + nTargetBottom + ' | Document height: ' + oHtml.clientHeight);
            var isReachBottom = nTargetBottom <= oHtml.clientHeight;

            if (isReachBottom && oTargetRect.height) {
                this.onReachBottom && this.onReachBottom();
            }
        }
    }

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return SimpleList;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = function(oConf){
            return new SimpleList(oConf);
        };
        module.exports.SimpleList = SimpleList;
    } else {
        if(!oWin.SimpleList){
            oWin.SimpleList = SimpleList;
        }else{
            throw new Error("It's duplicate to defined 'SimpleList', please check the scripts which you has been imported!");
        }
    }

})(window, document);