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
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  passwordConf: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
});

const roleUser = ref(false);

const newUser = () => {
  if (roleUser.value) {
    roleUser.value = true;
  }

  axios({
    method: 'post',
    url: 'http://188.225.25.199:8008/auth/register',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      "name": formData.value.name,
      "email": formData.value.email,
      "password": formData.value.password,
      "role": roleUser.value
    }
  })
  .then(response => {
    if (roleUser.value) {
        store.commit('setUser', true);
    }
    router.push('/login');
  })
  .catch(error => {
    console.error('Error:', error);
  });
};
</script>

<template>
    <section class="form_section">
      <div class="container form_section-container">
        <h2>Sign Up</h2>
        <Form :validation-schema="schema" v-slot="{ isSubmitting }">
          <Field type="text" name="name" placeholder="User Name" v-model="formData.name" />
          <ErrorMessage className="alert_message error" name="name" />
  
          <Field type="email" name="email" placeholder="Email" v-model="formData.email" />
          <ErrorMessage className="alert_message error" name="email" />
  
          <Field name="password" type="password" placeholder="Created Password" v-model="formData.password" />
          <ErrorMessage className="alert_message error" name="password" />
  
          <Field name="passwordConf" type="password" placeholder="Confirm Password" />
          <ErrorMessage className="alert_message error" name="passwordConf" />
          <ul className="filter-list">
                <li>
                  <input type="checkbox" id="admin" value="admin" v-model="roleUser"/>
                <div className="checkAdmin">Admin</div>  
                </li>
          </ul>
          <button @click.prevent="newUser" :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }" class="btn">Sign Up</button>
        </Form>
      </div>
    </section>
  </template>

<style scoped>
.form_section {
    display: grid;
    place-items: center;
    height: 130vh;
    margin-bottom: 50px;
}

li{
  display: flex;
  flex-direction: row;
}

.checkAdmin{
  margin-left:10px;
}

.form_section-container {
    width: 60%;
}

.alert_message {
    padding: 0.8rem 1.4rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
}

.alert_message.error {
    background: hsl(346, 87%, 46%, 15%);
    color: #da0f3f;
}

.alert_message.sucess {
    background: hsl(156, 100%, 38%, 15%);
    color: #00c476;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}


.form_control {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}


.form_control.inline {
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
}

input,
textarea,
select {
    padding: 0.8rem 1.4rem;
    background: #1e1e66;
    ;
    border-radius: 0.5rem;
    resize: none;
    color: #f2f2fe;
}

.form_section small {
    margin-top: 1rem;
    display: block;
}

.form_section small a {
    color: #6f6af8;
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

.btn.danger {
    background: #da0f3f;
}

.btn:hover {
    background: #f2f2fe;
    color: #0f0f3e;
}
</style>