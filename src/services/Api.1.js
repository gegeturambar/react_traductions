 
 
 class Api{
     
    //let baseUrl = 'http://localhost/PHP-Slim-Restful/api/';
    // baseUrl = 'https://www.msh-services.com/wsmsh-traduction/api/';
    //baseUrl = 'http://traductions.com/api/traductions';
    baseUrl = 'http://traductions.com/api/';

    putData (type, userData) {
        let id = userData.id;
        delete userData.id;
        let url = this.baseUrl+type+'/update/'+id;
        return this.apiCall(url,'POST',JSON.stringify(userData));
    }

    postData (type, userData) {
        let url = this.baseUrl+type;
        return this.apiCall(url,'POST',JSON.stringify(userData));
    }

    
    getData(type, userData,limit = 0,offset = 0 ) {

        let url = this.baseUrl+type;
        if(limit){
            url += "/"+limit;
            url += offset ? "/"+offset : "";
        }
        return this.apiCall(url,'GET');
    }

    apiCall(url,method, body = null){
        let headers = { };
        /*
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };*/
        if(sessionStorage.getItem('X-AUTH-TOKEN')){
            headers['X-AUTH-TOKEN'] = sessionStorage.getItem('X-AUTH-TOKEN');
        }
        
        return new Promise( (resolve, reject ) => {
            fetch(url, {
                method: method,
                headers: headers,
                body: body
            })
            .then( ( response ) => {
                console.log(response);
                return response.json;
            })
            .then( (res) => {
                resolve(res);
            })
            .catch( (error) => {
                console.log(error);
                reject(error);
            });
        });
    }
}


export default Api;




