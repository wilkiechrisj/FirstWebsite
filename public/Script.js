function bindBin(){

    document.getElementById('httpBin').addEventListener('click', function(event){

    var req = new XMLHttpRequest()
    var userName = document.getElementById('userName').value
    var userContact = document.getElementById('userContact').value
    var userContent = document.getElementById('userContent').value
    var data = userName + " " + userContact + " " + userContent

    req.open('POST', 'http://httpbin.org/post', true)
    req.setRequestHeader('Content-Type', 'application/json')

    req.addEventListener('load', function(){
        if(req.status >=200 && req.status <400){
            var returnJson = JSON.parse(req.responseText)
            document.getElementById('returnData').textContent = returnJson.data
        }
    })

    req.send(data)
    event.preventDefault()

    })
}

document.addEventListener('DOMContentLoaded', bindBin)