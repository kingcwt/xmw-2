!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var a,r=n(1),o=n(2);function s(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}a=function(){function e(t){var n,a,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var o=t.container;a=void 0===o?"":o;var s=t.textCopywriter;r=void 0===s?{}:s;var i=t.btnText;n=void 0===i?"":i,this.container=a,this.textCopywriter=r,this.btnText=n,this.state={phone:"",smsTicketId:""}}var t,n,a;return t=e,(n=[{key:"init",value:function(){var e;e=this,this.container?(0,o.getSendSmsInfo)((function(t){var n,a,r;r=t.toPhone,a=t.smsTicketId,n=r,e.state.smsTicketId=a,e.state.phone=n,e.initWechatWorkUI(e.btnText,"&darr;发短信联系教育顾问&darr;")})):console.error("请传入包裹节点")}},{key:"initWechatWorkUI",value:function(e,t){var n,a,r,o,s=this.state;r=s.phone,o=s.smsTicketId,a=this.genSendSmsLink(r,o),n=this.createSendSmsBtn(e,a,t),this.appendSmsBtn(n),this.bindOnClickJumpSendSms()}},{key:"bindOnClickJumpSendSms",value:function(e){var t,n,a;t=this,n=null,a=function(){document.hasFocus()?t.getWechatAddStatus():setTimeout(a,800)},$("#xy_wechatwork_btn").on("click",(function(){n||(window.ga&&window.ga("send","event",window.Pid,"sms_submit",1),n=!0,setTimeout(a,1300))}))}},{key:"appendSmsBtn",value:function(e){$("#".concat(this.container)).html(e)}},{key:"createSendSmsBtn",value:function(e,t,n){return'<p id="xy_wechatwork_info">'.concat(n,'</p>\n<a id="xy_wechatwork_btn" class="xy_wechatwork_btn xy_wechatwork_btn_primary" href="').concat(t,'" title="').concat(e,'">').concat(e,"</a>")}},{key:"getWechatAddStatus",value:function(){var e,t,n,a;e=this,n=this.state.smsTicketId,a=0,t=function(){if(++a>=r.PENDING_TIME_COUNT)return clearInterval(e.timer),e.initWechatWorkUI(e.btnText,"&darr;发短信联系教育顾问&darr;"),!1;(0,o.getStatus)(n,(function(t){var n,o=t.ticket_status;n=void 0===o?"":o;var s=t.status;n||void 0!==s&&s?(clearInterval(e.timer),e.sendSuccess()):e.changeRenderStatusUI("正在等待接收您的短信(".concat(r.PENDING_TIME_COUNT-a,")"),!0)}))},this.timer=setInterval(t,1e3),t()}},{key:"sendSuccess",value:function(){var e,t,n;n=this.state.smsTicketId,e=this,(t=function(){(0,o.getStatus)(n,(function(n){var a,o,s=n.ticket_status;o=void 0===s?"":s;var i=n.status;a=void 0===i?"":i,e.rendeWechatAddStatusUi(o,a),o!==r.COMPLETE&&o!==r.ABANDON&&setTimeout(t,1e3)}))})()}},{key:"changeRenderStatusUI",value:function(e,t,n,a){$("#xy_wechatwork_info").text(e),t?$("#xy_wechatwork_btn").removeClass("xy_wechatwork_btn_primary").addClass("xy_wechatwork_btn_disabled").removeAttr("href"):$("#xy_wechatwork_btn").removeClass("xy_wechatwork_btn_disabled").addClass("xy_wechatwork_btn_primary"),null!=n&&$("#xy_wechatwork_btn").attr("href",n),null!=a&&$("#xy_wechatwork_btn").text(a)}},{key:"renderUI",value:function(e){switch(e){case r.PENDING:this.changeRenderStatusUI("已接收到您的短信，正在等待添加...",!0);break;case r.PROCESSING:this.changeRenderStatusUI("正在添加您的微信，请稍等...",!0);break;case r.COMPLETE:this.changeRenderStatusUI("已成功添加您的微信，请点击打开微信同意",!1,"weixin://","打开微信");break;case r.ABANDON:this.initWechatWorkUI(this.btnText,"添加失败，请点击按钮重试")}}},{key:"rendeWechatAddStatusUi",value:function(e,t){switch(t){case r.TO_PHONE_FORMAT_ERROR:case r.FORM_PHONE_FORMAT_ERROR:this.initWechatWorkUI(this.btnText,"手机号格式错误，请点击重试");break;case r.TICKET_ID_ERROR:this.changeRenderStatusUI("参数错误，请刷新网页后重试",!0);break;case r.REQUESTED_PENDING:e?this.renderUI(e):this.changeRenderStatusUI("已接收到您的短信，正在等待添加...",!0);break;case r.REQUESTED_PROCESSING:e?this.renderUI(e):this.changeRenderStatusUI("正在添加您的微信，请稍等...",!0);break;case r.REQUESTED_COMPLETE:e?this.renderUI(e):this.changeRenderStatusUI("已成功添加您的微信，请点击打开微信同意",!1,"weixin://","打开微信");break;case r.REQUESTED_ABANDO:e?this.renderUI(e):this.changeRenderStatusUI("添加失败，请于下周重试",!0);break;default:this.renderUI(e)}}},{key:"genSendSmsLink",value:function(e,t){var n,a;return a=this.detectionPlatform()===r.platfo.an?"?":"&",n=this.genSmsContent(t),"sms:".concat(e).concat(a,"body=").concat(encodeURIComponent(n))}},{key:"genSmsContent",value:function(e){return"".concat(e)}},{key:"detectionPlatform",value:function(){var e;return e=r.platfo.an,/(iPhone|iPad|iPod|iOS|Mac)/i.test(navigator.userAgent)&&(e=r.platfo.ios),/(Android|Linux)/i.test(navigator.userAgent)&&(e=r.platfo.an),e}}])&&s(t.prototype,n),a&&s(t,a),e}(),window.xyWechatWorkAdd=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.REQUESTED_ABANDO=t.REQUESTED_COMPLETE=t.REQUESTED_PROCESSING=t.REQUESTED_PENDING=t.TICKET_ID_ERROR=t.FORM_PHONE_FORMAT_ERROR=t.TO_PHONE_FORMAT_ERROR=t.ABANDON=t.COMPLETE=t.PROCESSING=t.PENDING=t.PENDING_TIME_COUNT=t.platfo=t.sty=void 0;t.sty={cu:"custom",no:"normal"};t.platfo={ios:"ios",an:"Android"};t.PENDING_TIME_COUNT=30;t.PENDING="pending";t.PROCESSING="processing";t.COMPLETE="completed";t.ABANDON="abandoned";t.TO_PHONE_FORMAT_ERROR="601";t.FORM_PHONE_FORMAT_ERROR="602";t.TICKET_ID_ERROR="603";t.REQUESTED_PENDING="604";t.REQUESTED_PROCESSING="605";t.REQUESTED_COMPLETE="606";t.REQUESTED_ABANDO="607"},function(e,t,n){"use strict";var a,r;Object.defineProperty(t,"__esModule",{value:!0}),t.getStatus=t.getSendSmsInfo=void 0,r=function(e){var t,n;for(n in t=[],e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.push(("v="+Math.random()).replace(".","")),t.join("&")},a=function(e){var t,n;(e=e||{}).type=(e.type||"GET").toUpperCase(),e.dataType=e.dataType||"json",t=r(e.data),n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),"GET"===e.type?(n.open("GET",e.url+"?"+t,!0),n.send(null)):"POST"===e.type&&(n.open("POST",e.url,!0),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send(t)),n.onreadystatechange=function(){var t;4===n.readyState&&((t=n.status)>=200&&t<300?e.success&&e.success(n.responseText):e.fail&&e.fail(t))}};t.getSendSmsInfo=function(e,t){a({url:"//landingpage.xiaoyun.com/landings/ticket/landpage/1958",type:"POST",data:{},dataType:"json",success:function(t){var n;(n=JSON.parse(t))&&n.success&&n.result?e(n.result):console.error((n||{}).msg||"请检查网络")},fail:function(e){console.error(e)}})};t.getStatus=function(e,t){a({url:"//landingpage.xiaoyun.com/landings/ticket/status/".concat(e),dataType:"json",success:function(e){var n;(n=JSON.parse(e))&&n.success&&n.result?t(n.result):console.error((n||{}).msg||"请检查网络")},fail:function(e){console.error((e||{}).responseText||"请检查网络")}})}}]);