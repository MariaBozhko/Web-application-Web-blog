<template>
  <section v-if="!flag2">
    <section class="search_bar" v-if="flag">
      <form class="container search_bar-container" @submit.prevent="handleSearch">
        <div>
          <i class="bx bx-search"></i>
          <input type="search" v-model="searchQuery" placeholder="Search" />
        </div>
        <button type="submit" class="btn">Go</button>
      </form>
    </section>

    <section class="posts" v-if="flag">
      <div class="container posts_container">
        <article v-for="post in filteredPosts" :key="post._id" class="post">
          <div class="post_thumbnail">
            <img :src="post.imageUrl" alt="Post Image" />
          </div>
          <div class="post_info">
            <a href="#" class="category_button">{{ post.category[0] }}</a>
            <h3 class="post_title">{{ post.title }}</h3>
            <p class="post_body">{{ post.content }}</p>
            <div class="post_author">
            </div>
          </div>
        </article>
      </div>
    </section>
  </section>
  <div class="form_section" v-if="flag2">
    <div class="alert_message success">
      <h3>Уou need to log in</h3>
    </div>
  </div>
  <div v-if="!flag2">
    <div class="form_section" v-if="!flag">
    <div class="alert_message success">
      <h3>There are no posts</h3>
    </div>
  </div>
  </div>

</template>

<script>
import axios from 'axios'
import { ref, computed, inject } from 'vue'

export default {
  name: 'Blog',
  setup() {
    const store = inject('store');
    const posts = ref([]);
    const searchQuery = ref('');
    const flag = ref(true);
    const flag2 = ref(false);
    const token = computed(() => store.state.globalState.t);
    if(token.value==='')
    {
      flag2.value=true;
    }
    axios({
  method: 'get',
  url: 'http://188.225.25.199:8008/posts/get_all_posts',
  headers: {
    accept: 'application/json',
  },
})
  .then(async (response) => {
    const data = response.data;
    const promises = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const post = data[key];
        promises.push(
          axios({
            method: 'get',
            url: `http://188.225.25.199:8008/images/get-photo/${post.photo}`,
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token.value}`,
            },
            responseType: 'blob',
          })
            .then(photoResponse => {
              const imageUrl = URL.createObjectURL(photoResponse.data);

              return {
                _id: post._id,
                title: post.title,
                category: post.category,
                content: post.content,
                photo: post.photo,
                imageUrl: imageUrl,
              };
            })
            .catch(error => {
              console.error('Error fetching photo:', error);
              return null; 
            })
        );
      }
    }

    const resolvedPosts = await Promise.all(promises);
    posts.value = resolvedPosts.filter(post => post !== null);
  })
  .catch(error => {
    if (error.response && error.response.status === 404) {
      flag.value = false;
    } else {
      console.error('Error fetching posts:', error); 
    }
  });
    const filteredPosts = computed(() => {
      return posts.value.filter(post =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const handleSearch = () => {
      // Placeholder function for handling search logic
    };

    return {
      searchQuery,
      posts,
      filteredPosts,
      handleSearch,
      flag,
      flag2
    };
  },
}
</script>
          

<style scoped>
.search_bar{
    margin-top: 7rem;
    width: 100vw;
}

.category_button{
   background: hsl(242, 91%, 69%, 18%);
   color: #6f6af8;
   display: inline-block;
   padding: 0.5rem 1rem;
   border-radius: 0.5rem;
   font-weight: 600;
   font-size: 0.8rem;
   align-items: center; 
}

.category_button:hover{
    color: #f2f2fe;
}

.search_bar-container{
    position: relative;
    width: 30rem;
    background: #1e1e66;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    color: rgba(242, 242, 254, 0.3);
}

.search_bar-container > div {
    width: 100%;
    display: flex;
    align-items: center;
}

.search_bar input{
    background: transparent;
    margin-left: 0.7rem;
    padding: 0.5rem 0;
    width: 100%;
}

.search_bar input::placeholder {
    color: rgba(242, 242, 254, 0.3);
}

.btn {
    display: inline-block;
    width: fit-content;
    padding: 0.6rem 1.2rem;
    background-color: #6f6af8;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 300ms ease;
    color: #f2f2fe;
}

.btn.sm {
    padding: 0.3rem 0.7rem;
    font-size: 0.8rem;
}

.btn.danger{
    background:#da0f3f;
}

.btn:hover{
    background:#f2f2fe;
    color: #0f0f3e;
}

.posts_container{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;
    margin-bottom: 5rem;
}

.post_thumbnail{
    border-radius:  5rem 0;
    border: 1rem solid #1e1e66;
    overflow: hidden;
    margin-bottom: 1.6rem;
}


.post:hover .post_thumbnail img{
    filter: saturate(0);
    transition: filter 500ms ease;
}

.post_author{
   display: flex;
   gap: 1rem;
   margin-top: 1.2rem;
}

.post_author-avatar{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.8rem;
    overflow: hidden;
}

section{
    margin-top: 3rem;
    width: 100vw;
}

.form_section{
    height: 40vh;
}

.alert_message{
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background: #1e1e66;
    color: #f2f2fe;
    margin-top:7rem;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
}

</style>