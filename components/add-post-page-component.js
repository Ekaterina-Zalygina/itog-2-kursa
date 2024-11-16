//Страница, где можно добавить комменатрий

import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
            <div class="page-container">
                  <div class="page-header">
                       <h1 class="logo">instapro</h1>
                       <div class="add-post-sign"></div>
                       <button class="header-button logout-button">Выйти</button>
                  </div>
                  
                  <div class="upload-image-container"></div>
            
                  <h1 class="postAdd">Добавить пост</h1>
                  <div class="description">Опишите фотографию:</div>
                  <textarea class="input textarea" rows="4"></textarea>
                  <button class="button" id="add-button">Добавить</button>
            </div>
      `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      const textarea = document.querySelector(".input.textarea");
      const text = textarea.value;

      if (!text || !imageUrl) {
        alert("Заполните все поля");
        return;
      }

      onAddPostClick({ description: text, imageUrl: imageUrl });
    });
  };

  render();

  const uploadImageContainer = appEl.querySelector(".upload-image-container");

  if (uploadImageContainer) {
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
  }
}
