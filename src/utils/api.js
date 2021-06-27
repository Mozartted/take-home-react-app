import axios from 'axios'

let headers = {}, running = 0;

class API{

    SIGNUP = ''
    LOGIN =  ''
    CREATE_PROJECT = ''

    constructor(options = {}){
        this.axios = axios.create(options);
        this.headers = {}
    }

    send(type, args) {
		running++;
		const respond = (func, resp) => {
			running--;
			if (!resp) resp = {};
			func(resp.data, resp.headers, resp.status);
		};
		return new Promise(
			function(resolve, reject) {
				this[type]
					.apply(this, args)
					.then(resp => {
						respond(resolve, resp);
					})
					.catch(error => {
						let resp = error.response;
						respond(reject, resp);
					});
			}.bind(this.axios)
		);
    }

    get(){
        return this.send('get', arguments)
    }

    post(){
        return this.send('post', arguments)
    }

    put(){
        return this.send('put', arguments)
    }

    patch(){
        return this.send('patch', arguments)
    }

    delete(){
        return this.send('delete', arguments)
    }

    getHeaders(){
        return headers
    }

    getHeader(name) {
		return headers[name];
	}

	headerIs(name, value) {
		return headers[name] == value;
	}
	setHeaders(new_headers) {
		headers = new_headers;
		return this.renew();
	}
	
	setHeader (key, value) {
		this.axios.defaults.headers.common[key] = value
		return this
	}

	removeHeader(name, norenew) {
		delete headers[name];
		if (!norenew) this.renew();
		return this;
	}
	renew() {
		this.axios = axios.create({
			// baseURL: process.env.API_BASE_URL,
			headers: this.headers
		});
		return this;
	}
}

export default API;