<script setup>
import * as yup from 'yup';
import { ref, inject } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const formData = ref({
  name: '',
  email: '',
  password: '',
});
const store = inject('store');
const token = store.state.globalState.t;
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  passwordConf: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
});

const newUser = () => {
  
  axios({
    method: 'post',
    url: 'http://188.225.25.199:8008/admin/create_user',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      "name": formData.value.name,
      "email": formData.value.email,
      "password": formData.value.password,
      "role": false
    }
  })
  .then(response => {
    router.push('/manageusers');
  })
  .catch(error => {
    console.error('Error:', error);
  });
};
</script>

<template>
    <section class="form_section">
      <div class="container form_section-container">
        <h2>Add User</h2>
        <Form :validation-schema="schema" v-slot="{ isSubmitting }">
          <Field type="text" name="name" placeholder="User Name" v-model="formData.name" />
          <ErrorMessage className="alert_message error" name="name" />
  
          <Field type="email" name="email" placeholder="Email" v-model="formData.email" />
          <ErrorMessage className="alert_message error" name="email" />
  
          <Field name="password" type="password" placeholder="Created Password" v-model="formData.password" />
          <ErrorMessage className="alert_message error" name="password" />
  
          <Field name="passwordConf" type="password" placeholder="Confirm Password" />
          <button @click.prevent="newUser" :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }" class="btn">Add User</button>
        </Form>
      </div>
    </section>
  </template>

<style scoped>
.form_section{
    border: var(--color-gray-900) solid 2px;
    display: grid;
    place-items: center;
    width: 760px;
    padding-bottom: 3rem;
    margin-top: 8rem;
    margin-bottom: 6rem;
}

.form_section-container{
    width: var(--form-width);
}

.alert_message{
    padding: 0.8rem 1.4rem;
    margin-bottom: 1rem;
    border-radius: var(--card-border-radius-2);
}

.alert_message.error{
    background: var(--color-red-light);
    color: var(--color-red);
}

.alert_message.sucess {
    background: var(--color-green-light);
    color: var(--color-green);
}

form{
    display: flex;
    flex-direction: column; 
    gap: 1rem;
}


.form_control{
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}


.form_control.inline{
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
}

input, textarea, select {
    padding: 0.8rem 1.4rem;
    background: var(--color-gray-900);
    border-radius: var(--card-border-radius-2);
    resize: none;
    color: var(--color-white);
}

.form_section small {
    margin-top: 1rem;
    display: block;
}

.form_section small a{
    color:var(--color-primary);
}

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
</style>