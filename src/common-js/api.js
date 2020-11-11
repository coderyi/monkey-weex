var stream = weex.requireModule('stream');

var apiURL = {
  baseRequestUrl: 'https://api.github.com'
}

function requestGet(url, callback) {
  requestGetWithBody(url, null, callback);
}

function requestGetWithBody(url, body, callback) {

  stream.fetch({
    method: 'GET',
    url: apiURL.baseRequestUrl + url,
    type: 'json',
    body: body
  }, function(ret) {
    var resultObj = ret;
    if (typeof resultObj == 'string') {
      resultObj = JSON.parse(resultObj);
    }
    var serverResultData = resultObj.data;
    if (typeof serverResultData == 'string') {
      serverResultData = JSON.parse(serverResultData);
    }
    callback(serverResultData);
  }, function(progress) {
  })
}

function requestPost(url, callback) {
  requestPostWithBody(url, null, callback);
}

function requestPostWithBody(url, body, callback) {
  stream.fetch({
    method: 'POST',
    url: apiURL.baseRequestUrl + url,
    type: 'json',
    body: body
  }, function(ret) {
    var resultObj = ret;
    if (typeof resultObj == 'string') {
      resultObj = JSON.parse(resultObj);
    }
    var serverResultData = resultObj.data;
    if (typeof serverResultData == 'string') {
      serverResultData = JSON.parse(serverResultData);
    }
    callback(serverResultData);
  }, function(progress) {
  })
}

function requestUserRank(language, location, page, callback){
  var GET_URL_JSONP;
  if (language === 'All language') {
    GET_URL_JSONP = 'https://api.github.com/search/users?sort=followers&page='+page+'&q=location:'+location;

  } else {
    GET_URL_JSONP = 'https://api.github.com/search/users?sort=followers&page='+page+'&q=language:'+language;
    if (location !== 'World') {
      GET_URL_JSONP = GET_URL_JSONP + '%20location:' + location;
    }
  }
  stream.fetch({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data.items);
  }, function(response) {
    console.log('get in progress:' + response.length);
  });
}

function requestUserDetail(login, callback){
  var GET_URL_JSONP = 'https://api.github.com/users/'+login;

  stream.fetch({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if(!ret.ok){
    }else{
    }

    callback(ret.data);
  },function(response){
  });
}

function requestRepRank(language,page){
  return new Promise((resolve, reject) => {
    var GET_URL_JSONP = 'https://api.github.com/search/repositories?sort=stars&order=desc&page='+page+'&q=language:'+language;

    stream.fetch({
      method: 'GET',
      url: GET_URL_JSONP,
      type: 'json'
    }, function(ret) {
      if (!ret.ok) {
      } else {
      }
      // callback(ret.data.items);
      resolve(ret.data.items);
    }, function(response){
      console.log('get in progress:' + response.length);
    });
  });


}

function requestUserReps(userName, page, callback) {
  var GET_URL_JSONP = 'https://api.github.com/users/' + userName + '/repos?sort=updated&page=' + page;

  stream.fetch({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

function requestUserFollowing(userName, page, callback){
  var GET_URL_JSONP = 'https://api.github.com/users/' + userName + '/following?page=' + page;

  stream.fetch({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

function requestUserFollowers(userName, page, callback) {
  var GET_URL_JSONP = 'https://api.github.com/users/' + userName + '/followers?page=' + page;
  stream.fetch({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

function requestRepoContributors(userName, repositoryName, page, callback) {
  var GET_URL_JSONP = 'https://api.github.com/repos/' + userName + '/' + repositoryName + '/contributors?page=' + page;
  stream.fetch({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

function requestRepoStargazers(userName, repositoryName, page, callback){
  var GET_URL_JSONP = 'https://api.github.com/repos/' + userName + '/' + repositoryName + '/stargazers?page=' + page;
  stream.fetch({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}


function requestRepoForks(userName, repositoryName, page, callback){
  // var GET_URL_JSONP = 'https://api.github.com/repos/' + userName + '/' + repositoryName + '/forks?page=' + page;
  var GET_URL_JSONP = `https://api.github.com/repos/${userName}/${repositoryName}/forks?page=${page}`;
  stream.fetch({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

exports.requestGet = requestGet
exports.requestGetWithBody = requestGetWithBody
exports.requestPost = requestPost
exports.requestPostWithBody = requestPostWithBody
exports.requestUserRank = requestUserRank
exports.requestUserDetail = requestUserDetail
exports.requestRepRank = requestRepRank
exports.requestUserReps = requestUserReps
exports.requestUserFollowing = requestUserFollowing
exports.requestUserFollowers = requestUserFollowers
exports.requestRepoContributors = requestRepoContributors
exports.requestRepoStargazers = requestRepoStargazers
exports.requestRepoForks = requestRepoForks
