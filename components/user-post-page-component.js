import {getUserPosts} from "../api.js";

export function renderUserProfileComponent({element, user, token}) {

    const render = () => {
        element.innerHTML = `
          <div>
              Hello
          </div>
        `;
    }

    getUserPosts({token, id: user._id}).then((posts) => {
        element.innerHTML = `
          <div>
              <h1>Посты пользователя ${user.name}</h1>
              <ul class="posts-list">
              </ul>
          </div>
        `;

        posts.forEach((post) => {
            const postElement = document.createElement("li");
            postElement.innerHTML = `
                <div class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>    
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text" >
                        <span class="user-name">${post.user.name}</span>
                        ${post.description} 
                    </p>
                    <p class="post-date">
                        ${new Date(post.createdAt).toLocaleString('ru-RU')}
                    </p>
                </div>
            `
            element.querySelector(".posts-list").appendChild(postElement);
        })
    }).then(() => {
        // render();
    })
}
