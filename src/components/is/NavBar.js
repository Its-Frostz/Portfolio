import React from 'react'
import '../../css/App.css'

export default function Navar() {
    return (
        <div>
            <header id="header">
            <div className="header-bg">
                <div className="-default"></div>
            </div>
            <div className="header-container">
                <div className="logo">.Frostz()</div>
                <button title="Open menu" type="button" className="header-nav-button">
                    <span class="dots d1"></span>
                    <span class="dots d2"></span>
                    <span class="dots d3"></span>
                </button>
                <nav className="header-nav">
                <ul>
                    <li><a href="/" title="Home" className="active">.is()</a></li>
                    <li><a href="/about" title="About me">.about()</a></li>
                    <li><a href="mailto:yupthisisfrostz@gmail.com" title="Send me an email">.email()</a></li>
                    <li>
                    <a href="https://github.com/Its-Frostz" className="svgs" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img" aria-labelledby="GithubIcoTitle" className="ico"><path fillRule="evenodd" d="M8 0C3.6 0 0 3.6 0 8c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6 0 1.3-.1 2-.1s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4C13.7 14.5 16 11.5 16 8c0-4.4-3.6-8-8-8z" clipRule="evenodd"></path></svg>
                    </a>
                    </li>
                    <li>
                    <a href="https://www.instagram.com/signior_atif/" className="svgs" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="1 2 20 20" width="100px" height="90px"><path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"/></svg>
                    </a>
                    </li>
                </ul>
                </nav>
            </div>
            </header>
        </div>
    )
}
