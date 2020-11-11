
var navigator = weex.requireModule('navigator');
var modal = weex.requireModule('modal');

var data = {
  baseurl: 'http://localhost:12580/',
  baseImageUrl: 'http://github.com',
  baseh5url: 'http://localhost:12580/index.html?page=./examples/build/',
  debug: true
}

function isIosPlatform() {
  const env = weex.config.env || WXEnvironment

  var platform = env.platform
  return platform === "iOS"
}

function getDeviceInfo() {
  const env = weex.config.env || WXEnvironment
  var deviceWidth = env.deviceWidth
  var deviceHeight = env.deviceHeight
  var deviceInfo = {
    deviceWidth: deviceWidth,
    deviceHeight: deviceHeight
  }
  return deviceInfo
}

function toast(content) {
  modal.toast({message: content, 'duration': 2.0})
}

function getBaseImageUrl() {
  return data.baseImageUrl
}

function weexLog(log) {
  console.log(log)
  // nativeLog(log)
}

//get url's parameter by name ,better getUrlParam
function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

function getEntryUrl (name) {
  if (weex.config.env.platform === 'Web') {
    return './' + name + '.html'
  } else {
    let arr = weex.config.bundleUrl.split('/')
    arr.pop()
    arr.push(name + '.js')
    return arr.join('/')
  }
}

/**
 * 是否为空字符串
 */
export function isEmptyString(value) {
  if (!value || value === undefined || value.length === 0) {
    return true;
  }
  return false;
}

exports.isIosPlatform = isIosPlatform
exports.getDeviceInfo = getDeviceInfo
exports.toast = toast
exports.getBaseImageUrl = getBaseImageUrl
exports.weexLog = weexLog
exports.getParameterByName = getParameterByName
exports.getEntryUrl = getEntryUrl
