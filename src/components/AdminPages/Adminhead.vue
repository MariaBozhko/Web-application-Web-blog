<script>
import {useRouter} from 'vue-router'
export default {
    name: 'Adminhead',
}

</script>

<template>
<section className="dashboard">
        <div className="container dashboard_container">
            <button id="show_sidebar-btn" className="sidebar_toggle"><i className='bx bx-chevron-right'></i></button>
            <button id="hide_sidebar-btn" className="sidebar_toggle"><i className='bx bx-chevron-left'></i></button>
            <aside>
                <ul>
                    <li>
                        <router-link :to="{ name: 'Managepostadmin'}" className="active"><i className='bx bx-credit-card-front'></i>
                            <h5>Manage Post</h5>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Adduser'}">
                       <i className='bx bx-pencil'></i>
                            <h5>Add User</h5>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Manageusers'}">
                       <i className='bx bx-pencil'></i>
                            <h5>Manage Users</h5>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Addcategory'}">
                       <i className='bx bx-pencil'></i>
                            <h5>Add Category</h5>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Managecategories'}">
                       <i className='bx bx-pencil'></i>
                            <h5>Manage Categories</h5>
                        </router-link>
                    </li>
                </ul>
            </aside>
        </div>
    </section>
</template>

<style scoped>
.dashboard {
    margin-top: 6rem;
}

.sidebar_toggle{
    display: none;
}

.dashboard_container{
    display: grid;
    grid-template-columns: 10rem auto;
    gap: 1rem;
    padding: 2rem;
    margin-bottom: 5rem;
}

.dashboard aside a {
    background: #6f6af8;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1.6rem;
}

.dashboard aside ul li:not(:last-child) a {
     border-bottom: 1px solid #1e1e66;
}

.dashboard aside a:hover{
    background: #2d2b7c;
}

.dashboard aside a.active{
    background-color: #1e1e66;
}

.dashboard main {
    margin: 1.5rem;
}

.dashboard main h2{
    margin: 0 0 2rem 0;
    line-height: 1;
}

.dashboard main table{
    width: 100%;
    text-align: left;
}

.dashboard main table th {
    background: #2d2b7c;
    padding: 0.8rem;
    color: #f2f2fe;
}

.dashboard main table td {
    padding: 0.8rem;
    border-bottom: 1px solid rgba(242, 242, 254, 0.7);
}

.dashboard main table tr:hover td{
    background: #0f0f3e;
    color: #f2f2fe;
    cursor: default;
    transition: all 300ms ease;
}
</style>