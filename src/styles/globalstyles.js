import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  :root {
    --heavyWeight: 900;
    --transMed: 0.1s;
    --transSlow: 0.3s;

    --dark: #313349;
    --darkRGB: 49, 51, 73;
    --light: #fffdfa;
    --primary: #81B29A;
    --primaryRGB: 129, 178, 154;
    --secondary: #DB6443;
    --secondaryRGB: 219, 100, 67;
    --yellowHighlight: F4D7A4;
    --alpha: 0.2;


    --black: #2d2828;
    --charcoal: #3e3e3e;
    --primaryColor: #939393;
    --lobster-two: "Lobster Two";
    --serif: Poppins, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, Ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
    --sansSerif: Poppins, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, Ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
    --h1: 1.8rem;
    --h2: 1.5rem;
    --h3: 1.3rem;
    --h4: 1.15rem;
    --h5: 1rem;
    --h6: .8rem;
    --footerMenuItem: 0.85rem;
    --para: 1rem;
    --spacing: 1rem;

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
      --h2: 1.6rem;
      --h3: 1.4rem;
      --h4: 1.2rem;
      --h5: 1.1rem;
      --para: 1rem;
    }
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
    padding: calc(var(--spacing) * 4) calc(var(--spacing) * 2)
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
        height: 0.1rem;
        width: 100%;
        background-color: var(--primary);
        left: 0;
        bottom: -0.25rem;
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
    max-width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

`

export default GlobalStyles
