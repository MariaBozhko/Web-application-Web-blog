<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Edituser',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const formData = ref({
      name: '',
      email: '',
      password: '',
    });

    const schema = yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Email must be a valid email').required('Email is required'),
      password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const store = useStore();
    const token = store.state.globalState.t;
    const errorMessage = ref(null);
    const isSubmitting = ref(false);
    const router = useRouter();

    const userId = localStorage.getItem('userId'); 

    onMounted(async () => {
      try {
        const response = await axios.get(`http://188.225.25.199:8008/admin/get_user?id=${userId}`, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const user = response.data;
        formData.value.name = user.name;
        formData.value.email = user.email;
        formData.value.password = ''; // Оставляем пароль пустым
      } catch (error) {
        console.error('Error fetching user data:', error);
        errorMessage.value = 'An error occurred while fetching the user data. Please try again.';
      }
    });

    const update = async () => {
      isSubmitting.value = true;
      errorMessage.value = null;

      try {
        await axios.patch(`http://188.225.25.199:8008/admin/update_user?id=${userId}`, {
          name: formData.value.name,
          email: formData.value.email,
          password: formData.value.password,
          role: false,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        router.push('/');
      } catch (error) {
        console.error('Error updating user:', error);
        errorMessage.value = 'An error occurred while updating the user. Please try again.';
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      schema,
      errorMessage,
      isSubmitting,
      update,
    };
  },
};
</script>

<template>
  <section class="form_section">
    <div class="container form_section-container">
      <h2>Edit User</h2>
      <Form :validation-schema="schema" @submit="update" v-slot="{ isSubmitting }">
        <Field type="text" name="name" placeholder="User Name" v-model="formData.name" />
        <ErrorMessage class="alert_message error" name="name" />

        <Field type="email" name="email" placeholder="Email" v-model="formData.email" />
        <ErrorMessage class="alert_message error" name="email" />

        <Field name="password" type="password" placeholder="Password" v-model="formData.password" />
        <ErrorMessage class="alert_message error" name="password" />

        <button type="submit" :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }" class="btn">Update User</button>
      </Form>
      <p v-if="errorMessage" class="alert_message error">{{ errorMessage }}</p>
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
    margin-right: auto;
    margin-left: auto;
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