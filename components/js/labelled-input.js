class Element extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // this.onclick = (e) => {
        //     e.preventDefault()
        //     navigator.clipboard.writeText(document.querySelector('#link * input').value)
        // }
        // Element functionality written in here
    }
    connectedCallback() {
        this.innerHTML =
            `
            <html>
            <head>
            <style>
    #link {
        isolation: isolate;
        display: flex;
        width: max-content;
        align-items: center;
        justify-content: center;

        padding: 3px;
        border-radius: 3px;
        border: 1px solid;
        /* background-color: beige; */
        /* background: linear-gradient(90deg, beige 0%, transparent 50%); */
        /* background: linear-gradient(90deg, red 0%, red 35%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 100%); */
    }

    #link * input {
        padding: 3px;
        border: none;
        outline: none;
    }
</style>

</head>
<body>
              <div id="link">
        <label>
            <span>Link</span>
            <input type="text" placeholder="Path...">
            <button>Copy</button>
        </label>
    </div>

    <script>
document.querySelector('#link * button').onclick = (e) => {
            e.preventDefault()
            navigator.clipboard.writeText(document.querySelector('#link * input').value)
        }</script>
    </body>
    </html>
            `
        console.log('Custom square element added to page.');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
    }
    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

}

customElements.define("link-input", Element)
























// class Element {
//     constructor() {
//         // Always call super first in constructor
//         // super();

//         // Element functionality written in here
//     }
//     connectedCallback() {
//         console.log('Custom square element added to page.');
//     }
//     attributeChangedCallback(name, oldValue, newValue) {
//         console.log('Custom square element attributes changed.');
//     }
//     disconnectedCallback() {
//         console.log('Custom square element removed from page.');
//     }

//     adoptedCallback() {
//         console.log('Custom square element moved to new page.');
//     }

// }

// customElements.define("labelled-input", Element)
