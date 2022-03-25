module.exports = function getRequest(resource, getData){
    return fetch(resource).then(response => response.json()).then(response => {
        getData(response);
    })
}
