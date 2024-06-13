//Страница, где можно добавить комменатрий

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="page-header">
       <h1 class="logo">instapro</h1>
       <div class="add-post-sign"></div>
       <button class="header-button logout-button">Выйти</button>
      </div>

      <h1 class="postAdd">Добавить пост</h1>
      <button class="buttonAdd">Добавить фото</button>
      <div class="description">Опишите фотографию:</div>
      <textarea class="input textarea" rows="4"></textarea>
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
