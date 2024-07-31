<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'Manageusers',
  setup() {
    const users = ref([]);
    const store = useStore();
    const router = useRouter();
    const token = store.state.globalState.t;

    const edit = (id) => {
      localStorage.setItem('userId', id);
      router.push('/edituser');
    };

    // Fetch all users
    axios({
      method: 'get',
      url: '/api/admin/get_all_user',
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        const data = response.data;
        const usersList = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const user = data[key];
            usersList.push({
              id: user.id,
              name: user.name,
              email: user.email,
            });
          }
        }
        users.value = usersList;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    const del = (id) => {
        axios({
            method: 'delete',
            url: `/api/admin/delete_user?id=${id}`,
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Delete response:', response); // Debug log
                // Remove the deleted user from the list
                users.value = users.value.filter(user => user.id !== id);
                router.push('/');
            })
            .catch(error => {
                console.error('Error deleting user:', error.response ? error.response.data : error.message);
            });
    };

    return {
      users,
      edit,
      del
    }
  },
}
</script>

<template>
  <div className="block">
    <h2>Manage Users</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <div @click="edit(user.id)" className="btn sm">Edit</div>
          </td>
          <td>
            <div @click="del(user.id)" class="btn sm danger">Delete</div>
          </td>
        </tr>
      </tbody>
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
    padding: 0.8rem;
    color: var(--color-white);
}

table td {
    padding: 0.8rem;
    border-bottom: 1px solid var(--color-gray-200);
}

.table td:hover td {
    background: var(--color-bg);
    color: var(--color-white);
    cursor: default;
    transition: var(--transition);
}
</style>