declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-loading-dot': any
    }
  }
}

export default class XLoadingDot extends HTMLElement {
  public constructor() {
    super()

    let shadow = this.attachShadow({
      mode: 'open',
    })

    let div = document.createElement('span')

    div.innerHTML = '...'
    let style = document.createElement('style')

    style.textContent = `
      span {
        display: inline-block;
        height: 1em;
        line-height: 1;
        text-align: left;
        vertical-align: -.25em;
        overflow: hidden;
      }

      span::before {
        display: block;
        content: '...\\A..\\A.';
        white-space: pre;
        animation: dot 3s infinite step-start both;
      }

      @keyframes dot {
          33% { transform: translateY(-2em); }
          66% { transform: translateY(-1em); }
      }
    `

    shadow.appendChild(style)
    shadow.appendChild(div)
  }
}

customElements.define('x-loading-dot', XLoadingDot)
