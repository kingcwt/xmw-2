#格式化参数

formatParams = (data) ->
  arr = []
  for name of data
    arr.push encodeURIComponent(name) + '=' + encodeURIComponent(data[name])
  arr.push ('v=' + Math.random()).replace('.', '')
  arr.join '&'
ajax = (options) ->
  options = options or {}
  options.type = (options.type or 'GET').toUpperCase()
  options.dataType = options.dataType or 'json'
  params = formatParams(options.data)
  #创建xhr对象 - 非IE6
  if window.XMLHttpRequest
    xhr = new XMLHttpRequest
  else
    #IE6及其以下版本浏览器
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  #GET POST 两种请求方式
  if options.type == 'GET'
    xhr.open 'GET', options.url + '?' + params, true
    xhr.send null
  else if options.type == 'POST'
    xhr.open 'POST', options.url, true
    #设置表单提交时的内容类型
    xhr.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded'
    xhr.send params
  #接收

  xhr.onreadystatechange = ->
    if xhr.readyState == 4
      status = xhr.status
      if status >= 200 and status < 300
        options.success and options.success(xhr.responseText)
      else
        options.fail and options.fail(status)
    return

  return


export getSendSmsInfo = (success,error) ->
    ajax({
      url: "//landingpage.xiaoyun.com/landings/ticket/landpage/1958",
      type: "POST",
      data: {},
      dataType: "json",
      success:  (response) ->
        data = JSON.parse(response)
        if data and data.success and data.result
          success(data.result)
          return
        console.error (data||{}).msg||'请检查网络'
        return
      fail: (err) ->
        console.error err
        return
    })
    return

export getStatus = (id,success) ->
    ajax({
      url: "//landingpage.xiaoyun.com/landings/ticket/status/#{id}"
      dataType: "json",
      success:  (response) ->
        data = JSON.parse(response)
        if data and data.success and data.result
          success(data.result)
          return
        console.error (data||{}).msg||'请检查网络'
        return
      fail: (err) ->
        console.error (err||{}).responseText||'请检查网络'
        return
    })
    return