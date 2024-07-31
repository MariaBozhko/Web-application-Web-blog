<script>
import Addpost from './DashboardPages/Addpost.vue'
import Headerdashboard from './DashboardPages/Headerdashboard.vue'
import Managepost from './DashboardPages/Managepost.vue'

export default {
    name: 'Dashboard',
    components: {
        Addpost,
        Headerdashboard,
        Managepost
    }
}
</script>

<template>
    <div className="main">
        <Headerdashboard />
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