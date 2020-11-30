import { Component } from '../core/component'
import { apiService } from './../services/api.service';
import { TransformService } from './../services/transform.service';
import { renderPost } from './../templates/post.template';

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
      this.$el.addEventListener('click', handlerButton.bind(this))
    }

    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPosts()
        const posts = TransformService.fbObjectToArray(fbData)
        const html = posts.map(post => renderPost(post, {button: true})).join('')
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
      this.$el.innerHTML = ''
    }
    
}

function handlerButton(event) {
  let $el = event.target
  let id = $el.dataset.id
  let name = $el.dataset.name
  if(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    
    if(favorites.find(item => item.id == id)) {
      //remove
      favorites = favorites.filter(fId => fId.id !== id)
      $el.classList.remove('button-danger')
      $el.classList.add('button-primary')
      $el.textContent = 'Сохранить'
    } else {
      //add
      favorites.push({id: id, name: name})
      $el.classList.remove('button-primary')
      $el.classList.add('button-danger')
      $el.textContent = 'Удалить'
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}

