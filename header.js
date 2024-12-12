//Template för att länka till header. I html-filerna: <script src="header.js">
const template = document.createElement('template');

template.innerHTML=`
    <header>
        <a href="index.html"><img src="icons/logo.svg" alt="Logotyp Boklusen" id="logo-boklusen"></a>
        <a href="cart.html"><img src="icons/cart-icon.svg" alt="Kundvagn" id="logo-cart"></a>
    </header>
`
document.body.appendChild(template.content);