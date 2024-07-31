## Web-application "Web-blog" on Vue.js ##
В результате разработки было создано защищенное веб-приложение «Веб-блог», который позволяет пользователям обмениваться информацией и хранить персональные данные под защитой.

Точка входа в приложение представлена файлом index.html, содержащим корневой
DOM-элемент, к которому будет привязано приложение.
Главным JavaScript-файлом является main.js, который создает экземпляр Vue, монтирует
приложение в DOM и настраивает глобальные зависимости, такие как Vue Router.
Корневой компонент App.vue выступает в роли контейнера для всех остальных
компонентов, которые находятся в каталоге src/components:
- **Login.vue** и **Signup.vue** страницы, содержащие формы для авторизации и
регистрации пользователей в веб-приложении;
- **About.vue** отображает информацию о том, для чего это веб-приложение;
- **Footer.vue**, **Header.vue** нижняя и верхняя части страниц;
- **Admin.vue** - родительский компонент, который используется для отображения
страниц, относящихся к администратору «Веб-блога»;
- **Blog.vue** - страница отображает все посты, которые есть в базе данных;
- **Contact.vue** - страница, содержащая контактную информацию владельцев «Веб-блога»;
- **Dashboard.vue** - родительский компонент в профиле пользователя, на котором
отображаются все страницы Managepost.vue, Addpost.vue, Headerdashboard.vue;
- **Edit.vue** - страница для изменения пользователем свего поста или
администратором;
- **Addcategory.vue**, **Adduser.vue**, **Adminhead.vue**, **Editcategory.vue**, **Edituser.vue**,
**Managecategory.vue**, **Managepostadmin.vue**, **Manageusers.vue** на данных
страницах можно добавлять категорию; добавлять нового пользователя; изменять
категорию; изменять данные пользователя; видеть все посты, которые
пользователь может изменять, а администратор и удалять, и изменять; видеть
администратору всех пользователей, которых можно удалить или изменить их
данные;
- **Managepost.vue**, **Addpost.vue**, **Headerdashboard.vue** на этих страницах
пользователь может видеть все посты, изменять и добавлять их; на этой странице
отображается меню в личном кабинете пользователя.
В директории **src/store** находится файл index.js, который содержит глобальные
переменные и настройки. 

