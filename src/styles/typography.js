import { createGlobalStyle } from "styled-components"
import "@fontsource/lato"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/lobster-two"
import "@fontsource/libre-baskerville"

const Typography = createGlobalStyle`
h1 {
  font-size: var(--h1);
  margin: calc(var(--spacing) * 2) 0;
}

p {
  margin: calc(var(--spacing) / 2) 0 var(--spacing) 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--serif);
  font-weight: 400;
}

hr,
blockquote,
table,
ol,
ul,
.gatsby-resp-image-wrapper {
  margin: calc(var(--spacing) * 2) 0;

  @media (min-width: 768px) {
    margin: calc(var(--spacing) * 2) 0;
  }

  @media (min-width: 1200px) {
    margin: calc(var(--spacing) * 2) 0;
  }
}

h1,
h2,
h3,
h4 {
  color: var(--dark);
}

h5,
h6 {
  color: var(--dark);
  margin: var(--spacing) 0;
}

h2 {
  margin: calc(var(--spacing) ) 0;
  font-size: var(--h2);

  @media (min-width: 768px) {
    margin: calc(var(--spacing) ) 0;
  }
}

h3 {
  font-size: var(--h3);
}

h4 {
  font-size: var(--h4);
  margin: calc(var(--spacing) * 1.5) 0;
}

h5 {
  font-size: var(--h5);
}

h6 {
  font-size: var(--h6);
}

small {
  font-style: italic;
}

blockquote {
  padding: calc(var(--spacing) * 2) var(--spacing);
  background-color: rgba(var(--primaryRGB), 0.2);
  font-family: var(--libre-baskerville);
  color: var(--dark);
  text-shadow: .2px .2px 0 var(--secondary);
  box-sizing: border-box;
  width: 92%;
  border-radius: 8px 8px;

  p {
    font-size: var(--size-400);
    margin: 0;
  }

  p:nth-child(2) {
    margin-top: 1em;
  }

  @media (min-width: 768px) {
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 2);
  }
}

hr {
  border: 0.1rem solid var(--primaryColor);
  opacity: 0.15;
}

ul,
ol {
  padding-left: var(--spacing);
  font-size: var(--para);
  li {
    padding-left: calc(var(--spacing) / 2);
    margin: var(--spacing) 0;

    &::marker {
      font-size: 0.75rem;
      color: var(--primaryColor);
    }
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    padding-left: calc(var(--spacing) * 2);

    li {
      padding-left: var(--spacing);
    }
  }
}

code {
  /* font-family: $mono; */
  line-height: 1rem !important;
  font-size: 0.8rem !important;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  /* background-color: $lightGrey; */
}

table {
  font-size: var(--para);
  thead {
    font-family: var(--serif);
    color: #fff;
    background-color: var(--primaryColor);
  }

  th,
  td {
    text-align: left;
    font-weight: 400;
    padding: var(--spacing);
  }

  tbody {
    background-color: rgba(var(--secondaryRGB), var(--alpha));
  }

  @media (min-width: 768px) {
    th,
    td {
      padding: var(--spacing) calc(var(--spacing) * 1.5);
    }
  }

  @media (min-width: 1200px) {
    th,
    td {
      padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    }
  }
}

.gatsby-resp-image-wrapper {
  max-width: 100% !important;
}
`

export default Typography
