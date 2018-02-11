import styled from 'styled-components';

export const Card = styled.div`
  background: linear-gradient(to bottom, ${props => props.type == 'link' ? 'rgba(218, 176, 161, .5)' : (props.type == 'quote' ? 'rgba(116, 164, 195,  .5)' : 'rgba(255, 156, 122, .5)')} 0%,rgba(0,0,0,0) 100%);
  box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.5);
  transition:all 0.4s;
  transition: background 0.3s cubic-bezier(0.33, 0.66, 0.66, 1);
  border-radius: 5px; /* 5px rounded corners */
  padding: 10px;
  top: 20%;
  right: 0;
  left: 0;
  margin: 0 auto;
  overflow: hidden;

  a {
    text-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
    text-decoration: none
  }

  &:hover {
    box-shadow: 0px 18px 20px -9px rgba(0, 10, 30, 0.75);
    background: ${props => props.type == 'link' ? 'rgba(218, 176, 161, .5)' : (props.type == 'quote' ? 'rgba(116, 164, 195,  .5)' : 'rgba(255, 156, 122, .5)')};
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  }

  a:hover {
    text-decoration: underline;
  }


`;

export const CardLink = styled.div`
  text-align: center;
  margin: 16px 0 0 0;
  z-index: 20;
  width: 100%;
  top: 0;
  left: 0;
  transition:all 0.6s
`;

export const CardAttr = styled.div`
  text-align: center;
  margin: 16px 0 32px 0;
  z-index: 20;
  width: 100%;
  top: 0;
  left: 0;
  transition:all 0.6s
  display: inline-block;
`;

export const CardDate = styled.span`
  position: absolute;
  bottom: 0px;
  left: 0;
  z-index: 20;
  width:100%;
  text-align:left
  margin: 0 0 4px 20px;
  padding: 10px 10px 4px 10px;
  width: 100%;
  display: inline-block;
  font-size: .5em;
`;

CardAttr.defaultProps = {
  type: "link",



}
