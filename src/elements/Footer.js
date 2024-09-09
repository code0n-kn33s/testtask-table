import { ReactComponent as TelegramIcon } from '../assets/icons/social-links/TelegramIcon.svg';
import { ReactComponent as YouTubeIcon } from '../assets/icons/social-links/YouTubeIcon.svg';
import { ReactComponent as Facebook } from '../assets/icons/social-links/Facebook.svg';
import { ReactComponent as InstaIcon } from '../assets/icons/social-links/InstaIcon.svg';

export default function Main(params) {

    return (
        <div className="footer__main">

            <div className="footer__main-social-links">
                <a className="link" target="_blank" href="https://youtube.com">
                    {/* <!--youtube--> */}
                    <YouTubeIcon />
                </a>
                <a className="link" target="_blank" href="https://www.instagram.com">
                    {/* <!--instagram--> */}
                    <InstaIcon />
                </a>
                <a className="link" target="_blank" href="https://www.facebook.com">
                    {/* <!--facebook--> */}
                    <Facebook />
                </a>
                <a className="link" target="_blank" href="https://t.me">
                    {/* telegram */}
                    <TelegramIcon />
                </a>
            </div>

            <span  className="footer-year">&#169;2024</span>
            <div className="footer-contacts">
                <div className="footer-contacts-item">+3809912331222</div>
                <div className="footer-contacts-item">+3809912331222</div>
            </div>

        </div>
    )
}