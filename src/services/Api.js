 
 
 class Api{
     
    //let baseUrl = 'http://localhost/PHP-Slim-Restful/api/';
    // baseUrl = 'https://www.msh-services.com/wsmsh-traduction/api/';
    //baseUrl = 'http://traductions.com/api/traductions';
    baseUrl = 'http://traductions.com/api/';

    postData (type, userData) {
        
        return new Promise( (resolve, reject ) => {
            fetch(this.baseUrl+type, {
                method: 'POST',
                body: JSON.stringify(userData)
            })
            .then( ( response ) => response.json())
            .then( (res) => {
                resolve(res);
            })
            .catch( (error) => {
                reject(error);
            });
        });
    }

    getData(type, userData) {
        
        return new Promise( (resolve, reject ) => {
            fetch(this.baseUrl+type, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  },
                  mode: 'cors'
            })
            .then( ( response ) => response.json())
            .then( (res) => {
                resolve(res);
            })
            .catch( (error) => {
                reject(error);
            });
        });
    }

}


export default Api;