export class Request {
    //esport başka bir yerden çalıştırmasını sağlar...

    constructor(url) {
        this.url = url;
    }
    async get() {
        const response = await fetch(this.url);
        const responseData = await response.json();

        return responseData;
    }

    async post(data) {
        const response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json;"
            }
        });
        const responseData = await response.json();
        return responseData;

    }

    async put(id, data) {
        const response = await fetch(this.url + "/" + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json;"
            }
        });
        const responseData = await response.json();
        return responseData;

    }
    async delete(id) {
        const response = await fetch(this.url + "/" + id, {
            method: 'DELETE',

        });
        // const responseData = await response.json();
        // return responseData;
        return " veri silindi";

    }
}