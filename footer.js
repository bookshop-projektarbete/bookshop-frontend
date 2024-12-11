//Template för att länka till footer. I html-filerna: <script src="footer.js">
const footerTemplate = document.createElement('template');

footerTemplate.innerHTML=`
     <footer>
        <div id="footer-left">
            <div id="kundservice">
                <h3>Kundservice</h3>
                <ul>
                    <li>Frakt och retur</li>
                    <li>Betalningsvillkor</li>
                    <li>Kontakta oss</li>
                </ul>
            </div>
            <div id="om-oss">
                <h3>Om Boklusen</h3>
                <ul>
                    <li>Vår historia</li>
                    <li>Jobba med oss</li>
                </ul>
            </div>
        </div>
        <div id="footer-right">
            <a href="index.html"><img src="icons/logo.svg" id="logo-footer"></a>
        </div>
    </footer>
`
document.body.appendChild(footerTemplate.content);