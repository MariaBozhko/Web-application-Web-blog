<script>
export default {
    name: 'About'
}
</script>

<template>
     <div className="form_section">
        <div className="alert_message sucess">
            <h3>About</h3>
            <p>Our web blog allows you to create your own publications on topics
                 of interest. The user will be able to create a new publication 
                 and edit or delete existing posts. You can create a 
                 new post on the Profile page.</p>
        </div>
    </div>
</template>

<style scoped>
.form_section{
    height: 50vh;
}

.alert_message{
    padding: 0.8rem 1.4rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    background: #1e1e66;
    color: #f2f2fe;
    margin-top:8rem;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
}
</style>