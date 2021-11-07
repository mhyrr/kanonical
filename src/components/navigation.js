import { Link } from "gatsby"
import React, { useContext } from "react"
import styled from 'styled-components';
import { mainMenuItems } from "./menu-items"
import { NavigationStyles } from "../styles/navstyles"
import MenuContext from "./menucontext"
import DarkToggle from "./darktoggle"

const NavTitle = styled.p`
  font-size: var(--fontSize-7);
  font-family: var(--sansSerif);
  margin: 0;
`;

const Navigation = () => {
  const [isOpen, setNav] = useContext(MenuContext)

  const toggleNav = () => {
    setNav(isOpen => !isOpen)
  }

  return (
    <NavigationStyles className={isOpen ? "open" : "closed"}>
      <ul>
        {mainMenuItems.map((item, index) => (
          <li key={`menu-item-${index}`} className="nav-link">
            <Link to={item.path} onClick={toggleNav}>
              <NavTitle>{item.title}</NavTitle>
            </Link>
          </li>
        ))}
        <li className="nav-link"><DarkToggle/></li>
      </ul>

    </NavigationStyles>
  )
}

export default Navigation
