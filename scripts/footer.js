//Template för att länka till footer. I html-filerna: <script src="scripts/footer.js">
const footerTemplate = document.createElement('template');

footerTemplate.innerHTML=`
    <footer>
        <div id="footer-left">
            <div id="kundservice">
                <h3><a href="contact.html">Kundservice</a></h3>
                <ul>
                    <li><a href="">Frakt och retur</a></li>
                    <li><a href="">Betalningsvillkor</a></li>
                    <li><a href="contact.html">Kontakta oss</a></li>
                </ul>
            </div>
            <div id="om-oss">
                <h3><a href="">Om Boklusen</a></h3>
                <ul>
                    <li><a href="">Vår historia</a></li>
                    <li><a href="">Jobba med oss</a></li>
                </ul>
            </div>
        </div>
        <div id="footer-right">
            <a href="index.html"><img src="icons/logo.svg" id="logo-footer"></a>
        </div>
    </footer>
`
document.body.appendChild(footerTemplate.content);