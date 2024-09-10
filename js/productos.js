function mostrarDatos() {
    let request = sendRequest('productos', 'GET', '');
    let table = document.getElementById('prod-table').getElementsByTagName('tbody')[0];
    table.innerHTML = ""; 
    request.onload = function() {
        if (request.status === 200) {
            let data = request.response;
            data.forEach(element => {
                table.innerHTML += `
                <tr>
                    <td>${element._id}</td>
                    <td>${element.Nombre}</td>
                    <td>${element.Precio}</td>
                    <td>${element.Categoria}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="window.location='/form_prod.html?id=${element._id}'">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="eliminarProductos('${element._id}')">Eliminar</button>
                    </td>
                </tr>
                `;
            });
        } else {
            table.innerHTML = `
            <tr>
                <td colspan="5">Error al traer los datos</td>
            </tr>`;
        }
    };
    request.onerror = function() {
        table.innerHTML = `
        <tr>
            <td colspan="5">Error al traer los datos</td>
        </tr>`;
    };
}


function eliminarProductos(_id){
    let request = sendRequest('productos/'+_id, 'DELETE','');
    request.onload = function(){
        mostrarDatos()
    }
}

function guardarOmodificarDatos(_id = null) {
    const data = {
        Nombre: document.getElementById('nombres-n').value,
        Precio: document.getElementById('precio-p').value,
        Categoria: document.getElementById('categoria-c').value
    };
    const metodo = _id ? 'PUT' : 'POST';
    const url = _id ? `productos/${_id}` : 'productos';
    const request = sendRequest(url, metodo, data);
    request.onload = function () {
        if (request.status === 200) {
            window.location = `index.html`;
        } else {
            alert(`Error en la solicitud de ${metodo}`);
        }
    };
    request.onerror = function () {
        alert(`Error en la solicitud de ${metodo}`);
    };
}



function cargarDatos(_id) {
    let request = sendRequest('productos/' + _id, 'GET', '');
    const campos = {
        Nombre: document.getElementById('nombres-n'),
        Precio: document.getElementById('precio-p'),
        Categoria: document.getElementById('categoria-c'),
    };
    request.onload = function() {
        if (request.status === 200) {
            const data = request.response;
            for (let info in campos) {
                if (data[info] !== undefined) {
                    campos[info].value = data[info];
                }
            }
        } else {
            alert("Error al cargar los datos");
        }
    };
    request.onerror = function() {
        alert("Error al cargar los datos");
    };
}


