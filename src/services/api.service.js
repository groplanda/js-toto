class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'POST',
                body: JSON.stringify(post)
            })
            return useRequest(request)

        } catch(error) {
            console.error(error);
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'GET',
            })
            return useRequest(request)

        } catch(error) {
            console.error(error);
        }
    }

    async fetchPostById(id) {
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'GET',
            })
            return useRequest(request)

        } catch(error) {
            console.error(error);
        }
    }
}

async function useRequest(request) {
    let response = await fetch(request)
    return await response.json()
}

export const apiService = new ApiService('https://js-project-b40ae.firebaseio.com')