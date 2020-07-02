
import database from '../firebase/firebase';


export const addPost = (post) => ({
    type: 'ADD_POST',
    post
})

export const editPost = (id, updates) => ({
  type: 'EDIT_POST',
  id,
  updates
});

export const startEditPost = (id, updates) => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;

    return database.ref(`posts/${id}`).update(updates).then(() => {
      dispatch(editPost(id, updates))
    })

  }
}

export const startAddPost = (postData = {}) => {
    return (dispatch, getState) => {
      const {
        text = '',
        html = '',
        slug = '',
        title = '',
        createdAt = 0,
      } = postData;

      const post = { text, html, slug, title, createdAt };
      //const uid = getState().auth.uid;
  
      return database.ref(`posts`).push(post).then((ref) => {
        dispatch(addPost({
          id: ref.key,
          ...post
        }));
      });
    };
  };

  export const setPosts = (posts) => ({
    type: 'SET_POSTS',
    posts
  });
  

  
  export const startSetPosts = () => {
    return (dispatch,getState) => {
      //const uid = getState().auth.uid;
      return database.ref(`posts`).once('value').then((snapshot) => {
        const posts = [];
  
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setPosts(posts));
      });
    };
  };