<script>
import Adminhead from './AdminPages/Adminhead.vue';
import Addcategory from './AdminPages/Addcategory.vue'
import Adduser from './AdminPages/Adduser.vue'
import Managecategories from './AdminPages/Managecategories.vue'
import Managepostadmin from './AdminPages/Managepostadmin.vue'
import Manageusers from './AdminPages/Manageusers.vue'
import Edituser from './AdminPages/Edituser.vue'
import Editcategory from './AdminPages/Editcategory.vue'

export default {
    name: 'Admin',
    components: {
        Adminhead,
        Addcategory,
        Adduser,
        Managecategories,
        Managepostadmin,
        Manageusers,
        Edituser,
        Editcategory
    }
}
</script>

<template>
    <div className="main">
        <Adminhead />
        <div>
            <router-view />
        </div>
    </div>
</template>

<style scoped>
.main{
    display: flex;
    flex-direction: row;
}
</style>