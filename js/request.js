//const url= "http://localhost:5000/api/"

const url= "https://backen-productos-ryyr.onrender.com/api/"

function sendRequest(endPoint, metod, data){
    let request = new XMLHttpRequest();
    request.open(metod, url+endPoint);
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data ? JSON.stringify(data): data);
    return request
}