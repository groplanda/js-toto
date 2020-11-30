import { Component } from '../core/component'
import { apiService } from './../services/api.service';
import { renderPost } from './../templates/post.template';

export class FavoriteComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', handlerFavorite.bind(this))
    }
  
    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        let html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }
  
    onHide() {
        this.$el.innerHTML = ''
    }
    
}

function renderList(list = []) {
    if(list && list.length) {
        return list.map(item => {
            return `<div class="panel-head"><a href="#" data-id="${item.id}">${item.name}</a></div>`
        }).join('')
    }
    return '<p class="text-center">Пока ничего не добавлено</p>'
}

async function handlerFavorite(event) {
    event.preventDefault()
    if(event.target.tagName.toLowerCase() === 'a') {
        let postId = event.target.dataset.id
        this.$el.innerHTML = ''
        this.loader.show()
        let post = await apiService.fetchPostById(postId)
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {button: false}))
    }
}
