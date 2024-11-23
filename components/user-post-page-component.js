import { disLike, getUserPosts, likesUser } from "../api.js"

export function renderUserProfileComponent({ element, user, token }) {
    if (!user) return

    getUserPosts({ token, id: user.id }).then((posts) => {
        element.innerHTML = `
          <div>
              <h1>Посты пользователя ${user.name}</h1>
              <ul class="posts-list">
              </ul>
          </div>
        `

        posts.forEach((post) => {
            const postElement = document.createElement("li")
            const hasLike = post.likes.some((like) => like.id === user._id)

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
                      ${
                          hasLike
                              ? '<img src="./assets/images/like-active.svg">'
                              : '<img src="./assets/images/like-not-active.svg">'
                      } 
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
                        ${new Date(post.createdAt).toLocaleString("ru-RU")}
                    </p>
                </div>
            `
            element.querySelector(".posts-list").appendChild(postElement)
        })

        Array.from(document.querySelectorAll(".like-button")).forEach((like, i) => {
            like.addEventListener("click", (e) => {
                const post = posts[i]
                const hasLike = post.likes.some((like) => like.id === user._id)

                if (!hasLike) {
                    e.target.src = "./assets/images/like-active.svg"
                    likesUser({ token, id: e.currentTarget.dataset.postId })
                    post.likes.push({ id: user._id, name: user.name })
                    e.target
                        .closest(".post-likes")
                        .querySelector(".post-likes-text").textContent = `Нравится: ${post.likes.length}`
                } else {
                    e.target.src = "./assets/images/like-not-active.svg"
                    disLike({ token, id: e.currentTarget.dataset.postId })
                    post.likes = post.likes.filter((like) => like.id !== user._id)
                    e.target
                        .closest(".post-likes")
                        .querySelector(".post-likes-text").textContent = `Нравится: ${post.likes.length}`
                }
            })
        })
    })
}
