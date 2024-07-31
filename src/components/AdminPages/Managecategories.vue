<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'Managecategories',
    setup() {
        const cats = ref([]);
        const store = useStore();
        const router = useRouter();
        const token = store.state.globalState.t;
        const edit = (id) => {
            localStorage.setItem('catId', id);
            router.push('/editcategory');
        };
        axios({
            method: 'get',
            url: 'http://188.225.25.199:8008/category/categories/',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                const data = response.data
                const catList = []

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const cat = data[key]
                        catList.push({
                            _id: cat._id,
                            name: cat.name,
                            description: cat.description,
                        })
                    }
                }
                cats.value = catList
            })
            .catch(error => {
                console.error('Error fetching posts:', error)
            });
       
        return {
           cats,
            edit,
        }
    },
}

</script>

<template>
    <div className="block">
        <h2>Manage Categories</h2>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tr v-for="cat in cats" :key="cat._id">
                <td>{{ cat.name }}</td>
                <td>
                    <div @click="edit(cat._id)" className="btn sm">Edit</div>
                </td>
                <td>
                    <div class="btn sm danger">Delete</div>
                </td>
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

.btn.danger {
    background: var(--color-red);
}

.btn:hover {
    background: var(--color-white);
    color: var(--color-bg);
}

.block {
    margin-top: 8rem;
    margin-bottom: 4rem;
    background: var(--color-gray-900);
    padding: 20px;
}

h2 {
    margin: 0 0 2rem 0;
    line-height: 1;
}

table {
    width: 100%;
    text-align: left;
    margin-bottom: 4rem;
}

.block table th {
    background: var(--color-gray-700);
    padding: 1rem;
    color: var(--color-white);
}

table td {
    padding: 1rem;
    border-bottom: 1px solid var(--color-gray-200);
}

.table td:hover td {
    background: var(--color-bg);
    color: var(--color-white);
    cursor: default;
    transition: var(--transition);
}
</style>