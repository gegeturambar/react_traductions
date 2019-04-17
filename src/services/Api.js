import Axios from "axios";

 
 
 class Api{
     
    //let baseUrl = 'http://localhost/PHP-Slim-Restful/api/';
    // baseUrl = 'https://www.msh-services.com/wsmsh-traduction/api/';
    //baseUrl = 'http://traductions.com/api/traductions';
    baseUrl = 'https://traductions.local.s2h.corp/api/';

    putData (type, userData) {
        let id = userData.id;
        delete userData.id;
        let url = this.baseUrl+type+'/update/'+id;

        let headers = {};
        if(sessionStorage.getItem('X-AUTH-TOKEN')){
            headers['X-AUTH-TOKEN'] = sessionStorage.getItem('X-AUTH-TOKEN');
        }

        var config = {
            headers: headers
          };
        return Axios.put(url,userData,config);


        return this.apiCall(url,'POST',JSON.stringify(userData));
    }

    postData (type, userData) {
        let url = this.baseUrl+type;
        
        let headers = {};
        if(sessionStorage.getItem('X-AUTH-TOKEN')){
            headers['X-AUTH-TOKEN'] = sessionStorage.getItem('X-AUTH-TOKEN');
        }

        var config = {
            headers: headers
          };
        return Axios.post(url,userData,config);


        return this.apiCall(url,'POST',JSON.stringify(userData));
    }

    deleteData (type, userData) {
        let url = this.baseUrl+type;
        
        let headers = {};
        if(sessionStorage.getItem('X-AUTH-TOKEN')){
            headers['X-AUTH-TOKEN'] = sessionStorage.getItem('X-AUTH-TOKEN');
        }

        var config = {
            headers: headers
          };
        return Axios.delete(url,userData,config);


        return this.apiCall(url,'POST',JSON.stringify(userData));
    }

    
    getData(type, userData,limit = 0,offset = 0 ) {

        let url = this.baseUrl+type;
        console.log(url);
        if(limit){
            url += "/"+limit;
            url += offset ? "/"+offset : "";
        }
        let headers = {};
        if(sessionStorage.getItem('X-AUTH-TOKEN')){
            headers['X-AUTH-TOKEN'] = sessionStorage.getItem('X-AUTH-TOKEN');
        }
        var config = {
            headers: headers
          };
        return Axios.get(url,config);

        return this.apiCall(url,'GET');
    }

    apiCall(url,method, body = null){

        let headers = {};
        if(sessionStorage.getItem('X-AUTH-TOKEN')){
            headers['X-AUTH-TOKEN'] = sessionStorage.getItem('X-AUTH-TOKEN');
        }
        var config = {
            headers: headers
          };
          
        return Axios[method](url,body,config);
        /*
        .then(function(response){
            console.log(response)
        });
*/


/*
        let headers = {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };*/
        
        
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




