
export const rootColors: React.CSSProperties = {
    // bodyColor: '#E4E9F7',
    // sidebarColor: '#FFF',
    // primaryColor: '#695CFE',
    // primaryColorLight: '#F6F5FF',
    // toggleColor: '#DDD',
    // textColor: '#707070',
}

export const container: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

}

export const iconStyling: React.CSSProperties = {
    minWidth: '60px',
    borderRadius: '6px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
}

export const listItem: React.CSSProperties = {
    height: '50px',
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
}

export const flexColumn: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
}

export const sideBar: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '250px',
    padding: '10px 14px',
    //background: var(--sidebar-color);
    transition: 'all 0.3s ease',
    zIndex: '100',
}