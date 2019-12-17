import {sty, platfo ,  PENDING_TIME_COUNT, PENDING, PROCESSING, COMPLETE, ABANDON, TO_PHONE_FORMAT_ERROR, FORM_PHONE_FORMAT_ERROR, TICKET_ID_ERROR, REQUESTED_PENDING, REQUESTED_PROCESSING, REQUESTED_COMPLETE, REQUESTED_ABANDO} from "./enums"
import {getSendSmsInfo, getStatus} from "./ajax"

class xyWechatWorkAdd
  constructor: (params) ->
   { container="", textCopywriter={}, btnText='' } = params
   @container = container
   @textCopywriter = textCopywriter
   @btnText = btnText
   @state={
     phone: '',
     smsTicketId: ''
   }
   return

  init: () ->
    _this = @
    unless @container
      console.error "请传入包裹节点"
      return
    getSendSmsInfo((result)->
      {toPhone,smsTicketId} = result
      phone = toPhone
      _this.state.smsTicketId = smsTicketId
      _this.state.phone = phone
      _this.initWechatWorkUI(_this.btnText, '&darr;发短信联系教育顾问&darr;')
      return
      )
    
    return
  initWechatWorkUI: (btnText, label) ->
    {phone, smsTicketId} = @state
    link = @genSendSmsLink( phone, smsTicketId)
    btn = @createSendSmsBtn(btnText, link, label)
    @appendSmsBtn(btn)
    @bindOnClickJumpSendSms()
    return
  bindOnClickJumpSendSms:(smsTicketId) ->
    _this = @
    pendingTimer = null
    proc = ->
      if document.hasFocus()
        _this.getWechatAddStatus()
        return
      setTimeout(proc, 800)
      return
    $("#xy_wechatwork_btn").on("click", ()->
      unless pendingTimer
        window.ga&&window.ga('send','event', window.Pid ,'sms_submit',1)
        pendingTimer = true
        setTimeout(proc, 1300)
      return
    )
    
    return
  appendSmsBtn: (node) ->
    $("##{@container}").html(node)
    return
  createSendSmsBtn: (txt, link, infoText) ->
    return """
          <p id="xy_wechatwork_info">#{infoText}</p>
          <a id="xy_wechatwork_btn" class="xy_wechatwork_btn xy_wechatwork_btn_primary" href="#{link}" title="#{txt}">#{txt}</a>
      """
  getWechatAddStatus: () ->
    _this = @
    {smsTicketId} = @state
    timerCount = 0
    proc= () ->
      timerCount++
      if timerCount >= PENDING_TIME_COUNT
        clearInterval(_this.timer)
        _this.initWechatWorkUI(_this.btnText, '&darr;发短信联系教育顾问&darr;')
        return false
      getStatus(smsTicketId, (result)->
          {ticket_status="", status=""} = result
          if !ticket_status and !status
            _this.changeRenderStatusUI("正在等待接收您的短信(#{PENDING_TIME_COUNT - timerCount})", true)
            return
          clearInterval(_this.timer)
          
          _this.sendSuccess()
          return
        )
      return
    @timer = setInterval(proc, 1000)
    proc()
    return
  sendSuccess: () ->
    {smsTicketId} = @state
    _this = @
    proc = () ->
      getStatus(smsTicketId, (result)->
            {ticket_status="", status=""} = result
            _this.rendeWechatAddStatusUi(ticket_status, status)
            unless (ticket_status is COMPLETE) or (ticket_status is ABANDON)
              setTimeout(proc, 1000)
            return
          )
      return
    proc()
    return
  changeRenderStatusUI: (labelText, disabledStatus, actionHref, btnText) ->
    $("#xy_wechatwork_info").text(labelText)
    unless disabledStatus
      $("#xy_wechatwork_btn").removeClass('xy_wechatwork_btn_disabled').addClass('xy_wechatwork_btn_primary')
    else
      $("#xy_wechatwork_btn").removeClass('xy_wechatwork_btn_primary').addClass('xy_wechatwork_btn_disabled').removeAttr('href')
    if actionHref?
      $("#xy_wechatwork_btn").attr("href", actionHref)
    if btnText?
      $("#xy_wechatwork_btn").text(btnText)
    return
  renderUI:(ticket_status) ->
    switch ticket_status
      when PENDING
        @changeRenderStatusUI("已接收到您的短信，正在等待添加...", true)
        # $("#xy_wechatwork_info").text("已接收到您的短信，正在等待添加...")
      when PROCESSING 
        @changeRenderStatusUI("正在添加您的微信，请稍等...", true)
        # $("#xy_wechatwork_info").text("正在添加您的微信，请稍等...")
      when COMPLETE
        @changeRenderStatusUI("已成功添加您的微信，请点击打开微信同意", false, "weixin://", "打开微信")
      when ABANDON 
        @initWechatWorkUI(@btnText,"添加失败，请点击按钮重试")
    return
  rendeWechatAddStatusUi: (ticket_status,status) ->
    switch status
      when TO_PHONE_FORMAT_ERROR
        @initWechatWorkUI(@btnText,"手机号格式错误，请点击重试")
      when FORM_PHONE_FORMAT_ERROR 
        @initWechatWorkUI(@btnText,"手机号格式错误，请点击重试")
      when TICKET_ID_ERROR
        @changeRenderStatusUI("参数错误，请刷新网页后重试", true)
      when REQUESTED_PENDING
        if ticket_status
          @renderUI(ticket_status)
        else
          @changeRenderStatusUI("已接收到您的短信，正在等待添加...", true)
          
      when REQUESTED_PROCESSING
        if ticket_status
          @renderUI(ticket_status)
        else
          @changeRenderStatusUI("正在添加您的微信，请稍等...", true)
        
      when REQUESTED_COMPLETE
        if ticket_status
          @renderUI(ticket_status)
        else
          @changeRenderStatusUI("已成功添加您的微信，请点击打开微信同意", false, "weixin://","打开微信")
      
      when REQUESTED_ABANDO
        if ticket_status
          @renderUI(ticket_status)
        else
          @changeRenderStatusUI("添加失败，请于下周重试", true)
      else
        @renderUI(ticket_status)
        
    return
  
  genSendSmsLink: (mob, body) ->
    splicingOperator = if @detectionPlatform() is platfo.an then "?" else "&"
    content = @genSmsContent(body)
    return "sms:#{mob}#{splicingOperator}body=#{encodeURIComponent(content)}"
  genSmsContent:(body) ->
    # {left="",right=""} = @textCopywriter
    return "#{body}"
  detectionPlatform: ->
    platfor = platfo.an
    if /(iPhone|iPad|iPod|iOS|Mac)/i.test(navigator.userAgent)
      platfor = platfo.ios

    if /(Android|Linux)/i.test(navigator.userAgent)
      platfor = platfo.an
    return platfor
  

window.xyWechatWorkAdd = xyWechatWorkAdd
