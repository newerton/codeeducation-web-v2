import { ButtonBase, Icon } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

const NavExpandRoot = styled('div')(({ theme }) => ({
  '& .expandIcon': {
    transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
    transform: 'rotate(90deg)',
  },
  '& .collapseIcon': {
    transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
    transform: 'rotate(0deg)',
  },
  '& .expansion-panel': {
    overflow: 'hidden',
    transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)',
  },
  '& .highlight': {
    background: theme.palette.primary.main,
  },
  '&.compactNavItem': {
    width: 44,
    overflow: 'hidden',
    justifyContent: 'center !important',
    '& .itemText': {
      display: 'none',
    },
    '& .itemIcon': {
      display: 'none',
    },
  },
}));

const BaseButton = styled(ButtonBase)(({ theme }) => ({
  height: 44,
  width: '100%',
  whiteSpace: 'pre',
  overflow: 'hidden',
  paddingRight: '16px',
  borderRadius: '4px',
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between !important',
  color: theme.palette.text.primary,
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
  },
  '& .icon': {
    width: 36,
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle',
  },
}));

const BulletIcon = styled('div')(({ theme }) => ({
  width: 4,
  height: 4,
  color: 'inherit',
  overflow: 'hidden',
  marginLeft: '20px',
  marginRight: '8px',
  borderRadius: '300px !important',
}));

const ItemText = styled('span')(() => ({
  fontSize: '0.875rem',
  paddingLeft: '0.8rem',
  verticalAlign: 'middle',
}));

const BadgeValue = styled('div')(() => ({
  padding: '1px 4px',
  overflow: 'hidden',
  borderRadius: '300px',
}));

const VerticalNavExpansionPanel = ({ item, children, mode }: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const elementRef = useRef<any>(null);
  const componentHeight = useRef(0);
  const { pathname } = useRouter();
  const { name, icon, iconText, badge } = item;

  const handleClick = () => {
    componentHeight.current = 0;
    calculateHeight(elementRef.current);
    setCollapsed(!collapsed);
  };

  const calculateHeight = useCallback((node: any) => {
    if (node.name !== 'child') {
      for (let child of node.children) {
        calculateHeight(child);
      }
    }

    if (node.name === 'child') componentHeight.current += node.scrollHeight;
    else componentHeight.current += 44; //here 44 is node height
    return;
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;

    calculateHeight(elementRef.current);

    const children = elementRef.current.children;
    // OPEN DROPDOWN IF CHILD IS ACTIVE
    for (let child of children) {
      if (child.firstChild.getAttribute('href') === pathname) {
        setCollapsed(false);
      }
    }
  }, [pathname, calculateHeight]);

  return (
    <NavExpandRoot>
      <BaseButton
        className={`has-submenu compactNavItem ${
          mode === 'compact' && 'compactNavItem'
        } ${!collapsed && 'open'}`}
        onClick={handleClick}
      >
        <Box display="flex" alignItems="center">
          {icon && <Icon className="icon">{icon}</Icon>}
          {iconText && <BulletIcon />}
          <ItemText className="sidenavHoverShow">{name}</ItemText>
        </Box>
        {badge && (
          <BadgeValue className="sidenavHoverShow itemIcon">
            {badge.value}
          </BadgeValue>
        )}
        <div
          className={`sidenavHoverShow ${collapsed && 'collapseIcon'} ${
            !collapsed && 'expandIcon'
          }`}
        >
          <Icon fontSize="small" sx={{ verticalAlign: 'middle' }}>
            chevron_right
          </Icon>
        </div>
      </BaseButton>

      <div
        ref={elementRef}
        className="expansion-panel submenu"
        style={
          collapsed
            ? { maxHeight: '0px' }
            : { maxHeight: componentHeight.current + 'px' }
        }
      >
        {children}
      </div>
    </NavExpandRoot>
  );
};

export default memo(VerticalNavExpansionPanel);
