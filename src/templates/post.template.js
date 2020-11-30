export function renderPost(post, options) {
 
    const button = (JSON.parse(localStorage.getItem('favorites')) || []).find(item => item.id == post.id)
    ? `<button 
    class="button-danger button-small button-round button-shadow"
    data-id="${post.id}"
    data-name="${post.title}">Удалить</button>`
    : `<button 
    class="button-primary button-small button-round button-shadow"
    data-id="${post.id}"
    data-name="${post.title}">Сохранить</button>`

    const tag = post.type === 'note'
    ? '<li class="tag tag-blue tag-rounded">Заметка</li>'
    : '<li class="tag tag-red tag-rounded">Новость</li>'
    return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${options.button ? button : ''}
      </div>
    </div>
    `
}