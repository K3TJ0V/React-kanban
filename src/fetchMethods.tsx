const url = "http://localhost:6050";

async function request(path: string, method : string, body : Object) {
    let joinedPath = url + (path.startsWith('/')? "" : "/") + path;
    return await fetch(joinedPath, {
        method: method,
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
    });
}

export async function fetchGet(path : string){
    return request(path, "GET", {});
}

export async function fetchPost(path: string, body : Object) {
    return request(path, "POST", body);
};

export async function fetchDelete(path : string, body : Object) {
    return request(path, "DELETE", body);
}