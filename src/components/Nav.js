import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';

import '../css/Nav.css';

const NavigationMenu = () => {

  const location = useLocation();

  const menuItems = [
    {
      label: 'Accueil', path: '/', 
      subMenu : []
    },

    {
      label: 'TPI',
      path: '/tpi',
      subMenu: [
        { label: 'Planning', path: '/tpi/Schedule' },
        { label: 'Journal', path: '/tpi/Journal' },
        { label: 'Suivi', path: '/tpi/SuiviTPI' },
      ]
    },

    {
      label: 'Planning', path: '/soutenances', 
      subMenu: []
    },
    {
      label: 'Inscription', path: '/inscription',
      subMenu: []
    }
  ];
  
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setActiveSubMenu(index);
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubMenu(null);
      setSubMenuVisible(false);
    }, 500);
  };

  const handleMenuListMouseEnter = () => {
    if (isSubMenuVisible) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleSubMenuMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleSubMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubMenu(null);
      setSubMenuVisible(false);
    }, 300);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TPI Central Hub
        </Typography>

        <nav>
          <List className="menu-list" 
          onMouseEnter={handleMenuListMouseEnter}
          sx=
          {
            {
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center', 
            justifyContent: 'center', 
            color : '#f0f5f9'
            }
          }>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.path}>
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>

          {activeSubMenu !== null && isSubMenuVisible && (
            <List className="submenu-list" 
            onMouseEnter={handleSubMenuMouseEnter}
            onMouseLeave={handleSubMenuMouseLeave}

            sx=
            {
              { 
                position: 'absolute',
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center' ,
                color: '#1e2022'
              }}>
              {menuItems[activeSubMenu].subMenu.map((subItem) => (
                <ListItem
                  key={subItem.path}
                  button
                  component={Link}
                  to={subItem.path}
                  className={location.pathname === subItem.path ? 'active' : ''}
                >
                  <ListItemText primary={subItem.label} />
                </ListItem>
              ))}
            </List>
           
          )}
        </nav>

        <IconButton size="large" edge="end" color="inherit">
          <Search />
        </IconButton>

        <InputBase placeholder="Recherche…" inputProps={{ 'aria-label': 'Recherche' }} />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationMenu;
