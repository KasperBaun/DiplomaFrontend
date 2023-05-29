import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  path: string;
  text: string;
  isActive: boolean;
  isPending: boolean;
}

interface NavLinkComponentProps {
  navItem: NavItem;
}

const NavLinkComponent: React.FC<NavLinkComponentProps> = ({ navItem }) => {
  const linkStyles: React.CSSProperties = {
    ...HeaderLinkStyling,
    ...(navItem.isActive ? ActiveHeaderLinkCSS : {}),
    ...(navItem.isPending ? PendingHeaderLinkCSS : {}),
  };

  return (
    <NavLink to={navItem.path} style={linkStyles}>
      {navItem.text}
    </NavLink>
  );
};

export default NavLinkComponent;



const HeaderLinkStyling: React.CSSProperties = {
    color: 'white',
    paddingRight: '10px',
    display: 'inline-block',
    lineHeight: '1.8',
    fontWeight: '300',
    fontSize: '16px',
    textDecoration: 'none',
    cursor: 'pointer',
}

const ActiveHeaderLinkCSS: React.CSSProperties = {
    ...HeaderLinkStyling,
    color: '#dc8665',
    textDecoration: 'line',
}

const PendingHeaderLinkCSS: React.CSSProperties = {
    ...HeaderLinkStyling,
    color: '#dc8665',
    textDecoration: 'line',
}