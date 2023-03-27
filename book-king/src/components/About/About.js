import aboutstyle from './aboutstyle.module.css';
import {Link} from 'react-router-dom';

export const About = () => {
    return (
        <section className={aboutstyle.about}>
            <div className={aboutstyle.main}>
                <img src="../images/book.jpg" alt="book.jpg" />
                <div className={aboutstyle.abouttext}>
                    <h1>About</h1>
                    <h5>Books <span className={aboutstyle.edit}>&amp;</span> Knowledge</h5>
                    <p>This website is designed for educational purposes.<br/>Thank you for stopping by!</p>
                    <Link to="/"><button type="button" className={aboutstyle.homeBtni}><span className={aboutstyle.btnEdti}></span> Home</button></Link>
                    <Link to="/catalog"><button type="button" className={aboutstyle.homeBtni}><span className={aboutstyle.btnEdti}></span> All Books</button></Link>
                </div>
            </div>
        </section>
    )
}