import { NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import { NavPath } from '@models/Navpath';
import LionLogo from '@components/svgs/LionLogo';
import { observer } from 'mobx-react-lite';

type DesktopNavProps = {
    navPaths: NavPath[];
}

export const DesktopNav: React.FC<DesktopNavProps> = observer(({ navPaths }: DesktopNavProps) => {

    const linkHoverColor = '#dc8665';
    const [currentActivePath, setCurrentActivePath] = useState<string>("");

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <NavLink to={"/"} style={{ display: 'flex' }} >
                <LionLogo width={60} />
            </NavLink>
            <Toolbar>

                {navPaths.map((navItem, index) => (
                    <NavLink
                        to={navItem.path}
                        key={navItem.text + index}
                        style={({ isActive/*, isPending*/ }) => {
                            let result = HeaderLinkStyling;

                            if (isActive) {
                                result = ActiveHeaderLinkCSS;
                            }

                            result = {
                                ...result,
                            };

                            return result;
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = linkHoverColor;
                        }}
                        onMouseLeave={(e) => {
                            if (!(currentActivePath === navItem.path)) {
                                e.currentTarget.style.color = 'white';
                            }
                        }}
                        onClick={() => {
                            setCurrentActivePath(navItem.path);
                        }}
                    >
                        {navItem.text}
                    </NavLink>

                ))}
            </Toolbar>
        </div >
    )
});

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
}

