<script>
import { RouterLink } from 'vue-router'
</script>

<template>
    <footer>
        <div className="footer_socials">
          <i className='bx bxl-youtube'></i>
           <i className='bx bxl-instagram-alt'></i>
            <i className='bx bxl-facebook'></i>
            <i className='bx bxl-twitter'></i>
           <i className='bx bxl-linkedin'></i>
        </div>
        <div className="container footer_container">
            <article>
                <h4>Categories</h4>
                <ul>
                    <li><a href="">Art</a></li>
                    <li><a href="">Wild Life</a></li>
                    <li><a href="">Travel</a></li>
                    <li><a href="">Music</a></li>
                    <li><a href="">Sciene & Technology</a></li>
                    <li><a href="">Food</a></li>

                </ul>
            </article>

            <article>
                <h4>Support</h4>
                <ul>
                    <li><a href="">Oline Support</a></li>
                    <li><a href="">Call Numbers</a></li>
                    <li><a href="">Emails</a></li>
                    <li><a href="">Social Support</a></li>
                    <li><a href="">Location</a></li>
                </ul>
            </article>

            <article>
                <h4>Blog</h4>
                <ul>
                    <li><a href="">Safety</a></li>
                    <li><a href="">Repair</a></li>
                    <li><a href="">Recent</a></li>
                    <li><a href="">Popular</a></li>
                    <li><a href="">Categories</a></li>


                </ul>
            </article>

            <article>
                <h4>Permalinks</h4>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Services</a></li>
                    <li><a href="">Contact</a></li>

                </ul>
            </article>
        </div>
        <div className="footer_copyright ">
            <small>Copyright &copy 2024 UNITPRESS 💻🌐 TUTORIALS</small>
        </div>
    </footer>
</template>

<style scoped>
footer{
    background: #1e1e66;
    padding: 5rem 0 0;
    box-shadow: inset 0 1.5rem 1.5rem rgba(0, 0, 0, 0.2);
}

.footer_socials{
    margin-inline: auto;
    width: fit-content;
    margin-bottom: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
}

.footer_socials a{
    background:#0f0f3e;
    border-radius: 50%;
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer_socials a:hover{
    background: #f2f2fe;
    color: #0f0f3e;
}



.footer_container{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

footer h4{
    color: #f2f2fe;
    margin-bottom: 0.6rem;
}

footer ul li{
    padding: 0.4rem 0;
}


footer ul a{
    opacity: 0.75;
}

footer ul a:hover{
    letter-spacing: 0.2rem;
    opacity: 1;
}


.footer_copyright{
    text-align: center;
    padding: 1.5rem 0;
    border-top: 2px solid #0f0f3e;
    margin-top: 4rem;
}

</style>