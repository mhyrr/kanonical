import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

  :root {
    --heavyWeight: 900;
    --transMed: 0.1s;
    --transSlow: 0.3s;

    --dark: #313349;
    --darkRGB: 49, 51, 73;
    --light: #fffdfa;
    --lightRGB: 255, 253, 250;
    --primary: #81B29A;
    --primaryRGB: 129, 178, 154;
    --secondary: #DB6443;
    --secondaryRGB: 247, 125, 49;
    --yellowHighlight: F4D7A4;
    --yellowRGB: 242, 205, 145;
    --alpha: 0.2;


    --black: #2d2828;
    --charcoal: #3e3e3e;
    --primaryColor: #939393;
    --noto: "Noto Serif";
    --lobster-two: "Lobster Two";
    --serif: "avenir next", -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, Ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
    --sansSerif: "Sans Serif Workhorse", -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, Ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
    --h1: 1.8rem;
    --h2: 1.5rem;
    --h3: 1.3rem;
    --h4: 1.15rem;
    --h5: 1rem;
    --h6: .8rem;
    --footerMenuItem: 0.85rem;
    --para: 1rem;
    --spacing: 1rem;

    scroll-behavior: smooth;
    --size-300: 0.75rem;
    --size-400: 1rem;
    --size-500: 1.33rem;
    --size-600: 1.77rem;
    --size-700: 2.36rem;
    --size-800: 3.15rem;
    --size-900: 4.2rem;

    @media (min-width: 768px) {
      --h1: 2.2rem;
      --h2: 2rem;
      --h3: 1.5rem;
      --h4: 1.25rem;
      --h5: 1rem;
      --h6: .8rem;
      --footerMenuItem: 1rem;
      --para: 1rem;
    }

    @media (min-width: 1200px) {
      --h1: 2.2rem;
      --h2: 1.8rem;
      --h3: 1.6rem;
      --h4: 1.4rem;
      --h5: 1.2rem;
      --para: 1rem;
    }

  }

  :root.dark {
    --dark: #fffdfa;
    --darkRGB: 255, 253, 250;
    --light: #313349;
    --lightRGB: 49, 51, 73;
    --primary: #DB6443;
    --primaryRGB: 219, 100, 67;
    --secondary: #81B29A;
    --secondaryRGB: 129, 178, 154;
    --yellowHighlight: F4D7A4;
    --yellowRGB: 242, 205, 145;
    --alpha: 0.2;

  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--sansSerif);
    background-color: var(--light);
    color: var(--dark);
    font-size: var(--para);
    margin: 0;
  }

  p {
    font-size: var(--para);
    line-height: 1.35;

    @media (min-width: 768px) {
      line-height: 1.5;
    }
  }

  a {
    color: var(--dark);
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }

    &:hover {
      color: var(--dark);
    }
  }

  .main-body {
    padding: calc(var(--spacing) * 6) calc(var(--spacing) * 2)
      calc(var(--spacing) * 4) calc(var(--spacing) * 2);
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
      padding: calc(var(--spacing) * 6) calc(var(--spacing) * 2)
        calc(var(--spacing) * 6) calc(var(--spacing) * 2);

      max-width: 600px;
    }

    @media (min-width: 1200px) {
      max-width: 720px;
    }
  }

  .main-index {
    padding: calc(var(--spacing) * 6) calc(var(--spacing) * 2)
      calc(var(--spacing) * 4) calc(var(--spacing) * 2);
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
      padding: calc(var(--spacing) * 6) calc(var(--spacing) * 2)
        calc(var(--spacing) * 6) calc(var(--spacing) * 2);

      max-width: 768px;
    }

    @media (min-width: 1200px) {
      max-width: 840px;
    }

    @media (min-width: 1800px) {
      max-width: 1240px;
    }
  }

  .blog-post {

    .anchorLink {
      top: -100px;
    }

    blockquote {
      padding: calc(var(--spacing) * 1.5);
      margin: calc(var(--spacing));
    }

    hr {
      margin: calc(var(--spacing) * 2);
    }

    ul, ol {
      margin: 0;
      line-height: 1.25;
    }

    li {
      margin: 0;
      padding: 0.1rem;
    }

    strong {
      font-weight: bold;
    }

    a {
      display: inline-block;
      text-decoration: underline;
      background-color: inherit !important;
      position: relative;
      -webkit-transition: var(--transSlow);
      transition: var(--transSlow);
      font-size: var(--size-400);
      font-weight: 600;
      color: var(--secondary);
      text-shadow: .2px .2px 0 var(--darkRGB 0.5);
      line-height: 1.75rem;
      
      &::after {
        width: 0;
        left: 100%;
      }
      
      &:visited {
        text-decoration: underline;
      }
      
      &:hover {
        color: var(--primary);

        
      }
    }

  }

  img {

    max-width: 384px;

    @media (min-width: 768px) {
      max-width: 600px;
    }

    @media (min-width: 1200px) {
      max-width: 720px;
    }

  }

  .nav-link {
    font-weight: var(--heavyWeight);
    list-style: none;
    display: inline;

    a {
      display: inline-block;
      text-decoration: none;
      position: relative;
      -webkit-transition: var(--transMed);
      transition: var(--transMed);
      color: var(--dark);
      line-height: 1.75rem;

      &:hover {
        color: var(--primary);

        &::after {
          width: 0;
          left: 100%;
        }
      }
    }
  }

  .btn {
    color: var(--dark);
    text-decoration: none;
    border: none;
    background: none;
    font-family: var(--serif);
    padding: 0;
    font-size: 1rem;
    display: inline-block;
    line-height: 30px;
    position: relative;

    &-link {
      border: none;
      background-color: transparent;
      font-size: var(--h5);
      padding: 0;
      display: flex;
      font-family: var(--serif);
      color: var(--primary);
      text-decoration: none;
      position: relative;

      &:after {
        content: "";
        display: block;
        position: absolute;
        height: 0.05rem;
        width: 100%;
        background-color: var(--primary);
        left: 0;
        bottom: 0.1rem;
        opacity: 1;
        transition: opacity var(--transSlow);
      }

      &:hover,
      &:focus {
        cursor: pointer;

        &:after {
          opacity: 0.15;
        }
      }

      &:visited {
        text-decoration: none;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important; /* 2 */
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important; /* 3 */
  }
  .sr-only-focusable:focus,
  .sr-only-focusable:active {
    clip: auto !important;
    -webkit-clip-path: none !important;
    clip-path: none !important;
    height: auto !important;
    margin: auto !important;
    overflow: visible !important;
    width: auto !important;
    white-space: normal !important;
  }

  .tumble {
    max-width: 76%;
    margin-right: auto;
    margin-left: auto;
  }


    /* ############################# Content Cycle ####################### */

    @-moz-keyframes cycle {
      0% {
        top: 0px;
      }
      4% {
        top: 0px;
      }
      16% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      20% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
      21% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      92% {
        top: -325px;
        opacity: 0;
        z-index: 0;
      }
      96% {
        top: -325px;
        opacity: 0;
      }
      100% {
        top: 0px;
        opacity: 1;
      }
    }

    @-moz-keyframes cycle2 {
      0% {
        top: -325px;
        opacity: 0;
      }
      16% {
        top: -325px;
        opacity: 0;
      }
      20% {
        top: 0px;
        opacity: 1;
      }
      24% {
        top: 0px;
        opacity: 1;
      }
      36% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      40% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
      41% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      100% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
    }

    @-moz-keyframes cycle3 {
      0% {
        top: -325px;
        opacity: 0;
      }
      36% {
        top: -325px;
        opacity: 0;
      }
      40% {
        top: 0px;
        opacity: 1;
      }
      44% {
        top: 0px;
        opacity: 1;
      }
      56% {
        top: 0px;
        opacity: 1;
      }
      60% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
      61% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      100% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
    }

    @-moz-keyframes cycle4 {
      0% {
        top: -325px;
        opacity: 0;
      }
      56% {
        top: -325px;
        opacity: 0;
      }
      60% {
        top: 0px;
        opacity: 1;
      }
      64% {
        top: 0px;
        opacity: 1;
      }
      76% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      80% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
      81% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      100% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
    }

    @-moz-keyframes cycle5 {
      0% {
        top: -325px;
        opacity: 0;
      }
      76% {
        top: -325px;
        opacity: 0;
      }
      80% {
        top: 0px;
        opacity: 1;
      }
      84% {
        top: 0px;
        opacity: 1;
      }
      96% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      100% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
    }

    @-webkit-keyframes cycle {
      0% {
        top: 0px;
      }
      4% {
        top: 0px;
      }
      16% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      20% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
      21% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      50% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      92% {
        top: -325px;
        opacity: 0;
        z-index: 0;
      }
      96% {
        top: -325px;
        opacity: 0;
      }
      100% {
        top: 0px;
        opacity: 1;
      }
    }

    @-webkit-keyframes cycle2 {
      0% {
        top: -325px;
        opacity: 0;
      }
      16% {
        top: -325px;
        opacity: 0;
      }
      20% {
        top: 0px;
        opacity: 1;
      }
      24% {
        top: 0px;
        opacity: 1;
      }
      36% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      40% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
      41% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      100% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
    }

    @-webkit-keyframes cycle3 {
      0% {
        top: -325px;
        opacity: 0;
      }
      36% {
        top: -325px;
        opacity: 0;
      }
      40% {
        top: 0px;
        opacity: 1;
      }
      44% {
        top: 0px;
        opacity: 1;
      }
      56% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      60% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
      61% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      100% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
    }

    @-webkit-keyframes cycle4 {
      0% {
        top: -325px;
        opacity: 0;
      }
      56% {
        top: -325px;
        opacity: 0;
      }
      60% {
        top: 0px;
        opacity: 1;
      }
      64% {
        top: 0px;
        opacity: 1;
      }
      76% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      80% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
      81% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
      100% {
        top: -325px;
        opacity: 0;
        z-index: -1;
      }
    }

    @-webkit-keyframes cycle5 {
      0% {
        top: -325px;
        opacity: 0;
      }
      76% {
        top: -325px;
        opacity: 0;
      }
      80% {
        top: 0px;
        opacity: 1;
      }
      84% {
        top: 0px;
        opacity: 1;
      }
      96% {
        top: 0px;
        opacity: 1;
        z-index: 0;
      }
      100% {
        top: 325px;
        opacity: 0;
        z-index: 0;
      }
    }

    /*########################## Nav Bar Cycles ########################*/

    @-webkit-keyframes navCycle {
      0% {
        background: rgba(255,255,255,0.25);
      }
      4% {
        background: rgba(255,255,255,0.25);
      }
      16% {
        background: rgba(255,255,255,0.25);
      }
      20% {
        background: rgba(255,255,255,0);
      }
      21% {
        background: rgba(255,255,255,0);
      }
      50% {
        background: rgba(255,255,255,0);
      }
      92% {
        background: rgba(255,255,255,0);
      }
      96% {
        background: rgba(255,255,255,0);
      }
      100% {
      background: rgba(255,255,255,0.25);
      }
    }

    @-webkit-keyframes navCycle2 {
      0% {
        background: rgba(255,255,255,0);
      }
      16% {
        background: rgba(255,255,255,0);
      }
      20% {
        background: rgba(255,255,255,0.25);
      }
      24% {
        background: rgba(255,255,255,0.25);
      }
      36% {
      background: rgba(255,255,255,0.25);
      }
      40% {
      background: rgba(255,255,255,0);
      }
      41% {
        background: rgba(255,255,255,0);
      }
      100% {
        background: rgba(255,255,255,0);
      }
    }

    @-webkit-keyframes navCycle3 {
      0% {
        background: rgba(255,255,255,0);
      }
      36% {
        background: rgba(255,255,255,0);
      }
      40% {
        background: rgba(255,255,255,0.25);
      }
      44% {
        background: rgba(255,255,255,0.25);
      }
      56% {
        background: rgba(255,255,255,0.25);
      }
      60% {
        background: rgba(255,255,255,0);
      }
      61% {
      background: rgba(255,255,255,0);
      }
      100% {
      background: rgba(255,255,255,0);
      }
    }

    @-webkit-keyframes navCycle4 {
      0% {
        background: rgba(255,255,255,0);
      }
      56% {
        background: rgba(255,255,255,0);
      }
      60% {
        background: rgba(255,255,255,0.25);
      }
      64% {
        background: rgba(255,255,255,0.25);
      }
      76% {
        background: rgba(255,255,255,0.25);
      }
      80% {
        background: rgba(255,255,255,0);
      }
      81% {
        background: rgba(255,255,255,0);
      }
      100% {
        background: rgba(255,255,255,0);
      }
    }


    @-webkit-keyframes navCycle5 {
      0% {
        background: rgba(255,255,255,0);
      }
      76% {
        background: rgba(255,255,255,0);
      }
      80% {
        background: rgba(255,255,255,0.25);
      }
      84% {
        background: rgba(255,255,255,0.25);
      }
      96% {
        background: rgba(255,255,255,0.25);
      }
      100% {
        background: rgba(255,255,255,0);
      }
    }


    @-moz-keyframes navCycle {
      0% {
        background: rgba(255,255,255,0.25);
      }
      4% {
        background: rgba(255,255,255,0.25);
      }
      16% {
        background: rgba(255,255,255,0.25);
      }
      20% {
        background: rgba(255,255,255,0);
      }
      21% {
        background: rgba(255,255,255,0);
      }
      50% {
        background: rgba(255,255,255,0);
      }
      92% {
        background: rgba(255,255,255,0);
      }
      96% {
        background: rgba(255,255,255,0);
      }
      100% {
      background: rgba(255,255,255,0.25);
      }
    }

    @-moz-keyframes navCycle2 {
      0% {
        background: rgba(255,255,255,0);
      }
      16% {
        background: rgba(255,255,255,0);
      }
      20% {
        background: rgba(255,255,255,0.25);
      }
      24% {
        background: rgba(255,255,255,0.25);
      }
      36% {
      background: rgba(255,255,255,0.25);
      }
      40% {
      background: rgba(255,255,255,0);
      }
      41% {
        background: rgba(255,255,255,0);
      }
      100% {
        background: rgba(255,255,255,0);
      }
    }

    @-moz-keyframes navCycle3 {
      0% {
        background: rgba(255,255,255,0);
      }
      36% {
        background: rgba(255,255,255,0);
      }
      40% {
        background: rgba(255,255,255,0.25);
      }
      44% {
        background: rgba(255,255,255,0.25);
      }
      56% {
        background: rgba(255,255,255,0.25);
      }
      60% {
        background: rgba(255,255,255,0);
      }
      61% {
      background: rgba(255,255,255,0);
      }
      100% {
      background: rgba(255,255,255,0);
      }
    }

    @-moz-keyframes navCycle4 {
      0% {
        background: rgba(255,255,255,0);
      }
      56% {
        background: rgba(255,255,255,0);
      }
      60% {
        background: rgba(255,255,255,0.25);
      }
      64% {
        background: rgba(255,255,255,0.25);
      }
      76% {
        background: rgba(255,255,255,0.25);
      }
      80% {
        background: rgba(255,255,255,0);
      }
      81% {
        background: rgba(255,255,255,0);
      }
      100% {
        background: rgba(255,255,255,0);
      }
    }


    @-moz-keyframes navCycle5 {
      0% {
        background: rgba(255,255,255,0);
      }
      76% {
        background: rgba(255,255,255,0);
      }
      80% {
        background: rgba(255,255,255,0.25);
      }
      84% {
        background: rgba(255,255,255,0.25);
      }
      96% {
        background: rgba(255,255,255,0.25);
      }
      100% {
        background: rgba(255,255,255,0);
      }
    }

`

export default GlobalStyles
