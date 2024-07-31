<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'EditPost',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const formData = ref({
      title: '',
      category: '',
      content: '',
      thumbnail: null,
    });

    const schema = yup.object({
      title: yup.string().required('Title is required'),
      category: yup.string().required('Category is required'),
      content: yup.string().required('Content is required'),
    });

    const store = useStore();
    const errorMessage = ref(null);
    const isSubmitting = ref(false);
    const router = useRouter();

    const postId = localStorage.getItem('postId'); // Assuming postId is stored in localStorage
    onMounted(async () => {
      try {
        const response = await axios.get(`http://188.225.25.199:8008/posts/get_post/${postId}`, {
          headers: {
            accept: 'application/json',
          },
        });

        const post = response.data;
        formData.value.title = post.title;
        formData.value.category = post.category[0];
        formData.value.content = post.content;
      } catch (error) {
        console.error('Error fetching post data:', error);
        errorMessage.value = 'An error occurred while fetching the post data. Please try again.';
      }
    });

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      formData.value.thumbnail = file;
    };

    const handleSubmit = async () => {
      isSubmitting.value = true;
      errorMessage.value = null;
      try {
        const token = store.state.globalState.t;

        let photoFilename = '';

        if (formData.value.thumbnail) {
          const photoFormData = new FormData();
          photoFormData.append('file', formData.value.thumbnail);

          const uploadResponse = await axios.post('http://188.225.25.199:8008/images/upload-photo/', photoFormData, {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          photoFilename = uploadResponse.data.info.match(/file '(.+)'/)[1];
        }

        const postResponse = await axios.patch(`http://188.225.25.199:8008/posts/update_post/${postId}`, {
          title: formData.value.title,
          category: [formData.value.category],
          content: formData.value.content,
          photo: photoFilename || undefined,
        }, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Post updated!', postResponse.data);

        router.push('/');
      } catch (error) {
        console.error('Error:', error);
        errorMessage.value = `An error occurred while updating the post: ${error.response?.data?.message || error.message}. Please try again.`;
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      schema,
      handleSubmit,
      handleFileChange,
      errorMessage,
      isSubmitting,
    };
  },
};
</script>

<template>
  <section class="form_section">
    <div class="container form_section-container">
      <h2>Edit Post</h2>
      <div v-if="errorMessage" class="alert_message error">
        <p>{{ errorMessage }}</p>
      </div>
      <Form :validation-schema="schema" @submit="handleSubmit">
        <Field name="title" type="text" placeholder="Title" v-model="formData.title" />
        <ErrorMessage name="title" />

        <Field name="category" as="select" v-model="formData.category">
          <option value="" disabled>Select a category</option>
          <option value="Travel">Travel</option>
          <option value="Art">Art</option>
          <option value="Science & Technology">Science & Technology</option>
          <option value="Other">Other</option>
        </Field>
        <ErrorMessage name="category" />

        <Field name="content" as="textarea" rows="10" placeholder="Body" v-model="formData.content" />
        <ErrorMessage name="content" />

        <div class="form_control">
          <label for="thumbnail">Add Thumbnail</label>
          <input type="file" id="thumbnail" @change="handleFileChange" />
        </div>

        <button type="submit" class="btn" :disabled="isSubmitting">Save Changes</button>
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