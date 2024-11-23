import { addUserPost, getPosts } from "./api.js"
import { renderAddPostPageComponent } from "./components/add-post-page-component.js"
import { renderAuthPageComponent } from "./components/auth-page-component.js"
import { ADD_POSTS_PAGE, AUTH_PAGE, LOADING_PAGE, POSTS_PAGE, USER_POSTS_PAGE } from "./routes.js"
import { renderPostsPageComponent } from "./components/posts-page-component.js"
import { renderLoadingPageComponent } from "./components/loading-page-component.js"
import { getUserFromLocalStorage, removeUserFromLocalStorage, saveUserToLocalStorage } from "./helpers.js"
import { renderUserProfileComponent } from "./components/user-post-page-component.js"

export let user = getUserFromLocalStorage()
export let page = null
export let posts = []

const getToken = () => {
    const token = user ? `Bearer ${user.token}` : undefined
    return token
}

export const logout = () => {
    user = null
    removeUserFromLocalStorage()
    goToPage(POSTS_PAGE)
}

export const goToPage = (newPage, data) => {
    if ([POSTS_PAGE, AUTH_PAGE, ADD_POSTS_PAGE, USER_POSTS_PAGE, LOADING_PAGE].includes(newPage)) {
        if (newPage === ADD_POSTS_PAGE) {
            page = user ? ADD_POSTS_PAGE : AUTH_PAGE
            return renderApp(data)
        }

        if (newPage === POSTS_PAGE) {
            page = LOADING_PAGE
            renderApp(data)

            return getPosts({ token: getToken() })
                .then((newPosts) => {
                    page = POSTS_PAGE
                    posts = newPosts
                    renderApp(data)
                })
                .catch((error) => {
                    console.error(error)
                    goToPage(POSTS_PAGE)
                })
        }

        if (newPage === USER_POSTS_PAGE) {
            page = USER_POSTS_PAGE
            return renderApp(data)
        }

        page = newPage
        renderApp(data)

        return
    }

    throw new Error("страницы не существует")
}

const renderApp = (data) => {
    const appEl = document.getElementById("app")
    if (page === LOADING_PAGE) {
        return renderLoadingPageComponent({
            appEl,
            user,
            goToPage,
        })
    }

    if (page === AUTH_PAGE) {
        return renderAuthPageComponent({
            appEl,
            setUser: (newUser) => {
                user = newUser
                saveUserToLocalStorage(user)
                goToPage(POSTS_PAGE)
            },
            user,
            goToPage,
        })
    }

    if (page === ADD_POSTS_PAGE) {
        return renderAddPostPageComponent({
            appEl,
            onAddPostClick({ description, imageUrl }) {
                addUserPost({
                    token: getToken(),
                    description: description,
                    imageUrl: imageUrl,
                }).catch((error) => {
                    alert(error.message)
                })
                goToPage(POSTS_PAGE)
            },
        })
    }

    if (page === POSTS_PAGE) {
        return renderPostsPageComponent({
            appEl,
            token: getToken(),
            user,
        })
    }

    if (page === USER_POSTS_PAGE) {
        return renderUserProfileComponent({
            element: appEl,
            user: posts.map((p) => p.user).find((u) => u.id === data.userId),
            token: getToken(),
        })
    }
}

goToPage(POSTS_PAGE)
