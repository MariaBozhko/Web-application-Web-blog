<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'Managepost',
    setup() {
    const posts = ref([]);
    const router = useRouter();
    const edit = (id) =>{
        localStorage.setItem('postId', id);
        router.push('/edit');
    };
    axios({
      method: 'get',
      url: 'http://188.225.25.199:8008/posts/get_all_posts',
      headers: {
        accept: 'application/json',
      },
    })
      .then(response => {
        const data = response.data
        const postList = []

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const post = data[key]
            postList.push({
              _id: post._id,
              title: post.title,
              category: post.category,
            })
          }
        }
        posts.value = postList
      })
      .catch(error => {
        console.error('Error fetching posts:', error)
      });

    return {
      posts,
      edit
    }
  },
}
</script>

<template>
    <div className="block">
     <h2>Manage Post</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                            <tr v-for="post in posts" :key="post._id">
                                <td>{{ post.title }}</td>
                                <td>{{ post.category[0] }}</td>
                                <td><div @click="edit(post._id)" className="btn sm">Edit</div></td>
                            </tr>
                    </table>
                </div>
    </template>
  

<style scoped>
.btn {
    display: inline-block;
    width: fit-content;
    padding: 0.6rem 1.2rem;
    background-color: var(--color-primary);
    border-radius: var(--card-border-radius-2);
    cursor: pointer;
    transition: var(--transition);
    color: var(--color-white);
}


.btn.sm {
    padding: 0.3rem 0.7rem;
    font-size: 0.8rem;
}

.btn.danger{
    background:var(--color-red);
}

.btn:hover{
    background:var(--color-white);
    color: var(--color-bg);
}

.block
{
    margin-top: 6rem;
    margin-bottom: 4rem;
    background: var(--color-gray-900);
    padding: 20px;
}

h2
{
    margin: 0 0 2rem 0;
    line-height: 1;
}

table
{
    width: 100%;
    text-align: left;
    margin-bottom: 4rem;
}

.block table th
{
    background: var(--color-gray-700);
    padding: 0.8rem;
    color: var(--color-white);
}

table td
{
    padding: 0.8rem;
    border-bottom: 1px solid var(--color-gray-200);
}

.table td:hover td{
    background: var(--color-bg);
    color: var(--color-white);
    cursor: default;
    transition: var(--transition);
}
</style>