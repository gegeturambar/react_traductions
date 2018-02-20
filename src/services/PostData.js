export function PostData(type, userData) {
    //let baseUrl = 'http://localhost/PHP-Slim-Restful/api/';
    //let baseUrl = 'https://www.msh-services.com/wsmsh-traduction/api/';
    let baseUrl = 'https://ppr-msh.s2hgroup.com/wsmsh-traduction/api/';
    return new Promise( (resolve, reject ) => {
        fetch(baseUrl+type, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
              },
              mode: 'cors',
            body: JSON.stringify(userData)
        })
        .then( ( response ) => {
            console.log('tes');
            console.log(response);
            return response.json()
        })
        .then( (res) => {
            resolve(res);
        })
        .catch( (error) => {
            reject(error);
        });
    });
}