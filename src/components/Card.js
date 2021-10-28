import styled from 'styled-components';

import GlobalStyles from '../styles/globalstyles'

export const Card = styled.div`
  background: linear-gradient(to bottom, ${props => props.type == 'link' ? 'rgba(var(--primaryRGB), var(--alpha))' : (props.type == 'word' ? 'rgba(var(--secondaryRGB), var(--alpha))' : (props.type == 'quote' ? 'rgba(var(--yellowRGB), var(--alpha))' : 'rgba(var(--primaryRGB), var(--alpha))'))} 0%,rgba(255,255,255,.4) 100%);
  box-shadow: 0px 3px 6px -2px rgba(var(--primaryRGB), 0.4);
  transition:all 0.2s; */
  transition: background 0.3s cubic-bezier(0.33, 0.66, 0.66, .6);
  border-radius: 16px; /* 5px rounded corners */
  padding: 16px;
  /* top: 20%; */
  /* right: 0; */
  /* left: 0; */
  margin: 0 auto;
  /* overflow: hidden; */

  img {
    max-width: 320px !important;
  }

  a {
    color: var(--dark);
    text-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
    text-decoration: none
  }

  &:hover {
    box-shadow: 0px 5px 10px -4px rgba(var(--darkRGB), 0.6);
    background: linear-gradient(135deg, ${props => props.type == 'link' ? 'rgba(var(--primaryRGB), .4)' : (props.type == 'word' ? 'rgba(var(--secondaryRGB), .4)' : (props.type == 'quote' ? 'rgba(var(--yellowRGB),  .4)' : 'rgba(255, 156, 122, .4)'))} 0%,rgba(255,255,255,.4) 100%);
    text-shadow: 0px 0px 16px rgba(var(--dark), 0.2);
  }

  a:hover {
    text-decoration: underline;
    color: var(--dark);
  }


`;

export const CardLink = styled.div`
  text-align: center;
  margin: 16px 0 0 0;
  /* z-index: 20; */
  /* width: 100%; */
  /* top: 0; */
  /* left: 0; */
  transition:all 0.6s
`;

export const CardAttr = styled.div`
  text-align: center;
  margin: 16px 0 32px 0;
  /* z-index: 20; */
  /* width: 100%; */
  /* top: 0; */
  /* left: 0; */
  transition:all 0.6s
  display: inline-block;
`;

export const CardDate = styled.span`
  /* position: absolute; */
  /* bottom: 0px; */
  /* left: 0; */
  /* z-index: 20; */
  /* width:100%; */
  /* text-align:left */
  margin: 0 0 0px 4px;
  padding: 10px 10px 4px 10px;
  width: 100%;
  /* display: inline-block; */
  font-size: .8em;
`;

CardAttr.defaultProps = {
  type: "link",



}
