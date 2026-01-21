import { ButtonBase, Icon } from '@mui/material';
import { Box, styled } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { Paragraph, Span } from '@components/Typography';

import VerticalNavExpansionPanel from './VerticalNavExpansionPanel';

const ListLabel = styled(Paragraph)(({ theme, mode }): any => ({
  fontSize: '12px',
  marginTop: '20px',
  marginLeft: '15px',
  marginBottom: '10px',
  textTransform: 'uppercase',
  display: mode === 'compact' && 'none',
  color: theme.palette.text.secondary,
}));

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
  },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important',
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle',
  },
};
const ExternalLink = styled('a')(({ theme }): any => ({
  ...ExtAndIntCommon,
  color: theme.palette.text.primary,
}));

const InternalLink = styled(Box)(({ theme }) => ({
  '& a': {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary,
  },
  '& .navItemActive': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
}));

const StyledText = styled(Span)(({ mode }): any => ({
  fontSize: '0.875rem',
  paddingLeft: '0.8rem',
  display: mode === 'compact' && 'none',
}));

const BulletIcon = styled('div')(({ theme }): any => ({
  padding: '2px',
  marginLeft: '20px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '300px',
  background: theme.palette.primary.contrastText,
}));

const BadgeValue = styled('div')((): any => ({
  padding: '1px 8px',
  overflow: 'hidden',
  borderRadius: '300px',
}));

const VerticalNav = ({ items, handleDrawerToggle }: any) => {
  const mode: any = 'full';
  const { route } = useRouter();

  const renderLevels = (data: any) => {
    return data.map((item: any, index: number) => {
      if (item.type === 'label')
        return (
          <ListLabel key={index} mode={mode} className="sidenavHoverShow">
            {item.label}
          </ListLabel>
        );

      if (item.children) {
        return (
          <VerticalNavExpansionPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </VerticalNavExpansionPanel>
        );
      } else if (item.type === 'extLink') {
        return (
          <ExternalLink
            key={index}
            href={item.path}
            className={`${mode === 'compact' && 'compactNavItem'}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
              {(() => {
                if (item.icon) {
                  <Icon className="icon">{item.icon}</Icon>;
                } else {
                  return (
                    <span className="item-icon icon-text">{item.iconText}</span>
                  );
                }
              })()}
              <StyledText mode={mode} className="sidenavHoverShow">
                {item.name}
              </StyledText>
              <Box mx="auto"></Box>
              {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
            </ButtonBase>
          </ExternalLink>
        );
      } else {
        return (
          <InternalLink key={index}>
            <Link href={item.path} passHref>
              <ButtonBase
                key={item.name}
                name="child"
                sx={{ width: '100%', color: 'white' }}
                className={`${route === item.path ? 'navItemActive' : ''}${
                  mode === 'compact' ? ' compactNavItem' : ''
                }`}
                onClick={handleDrawerToggle}
              >
                {item?.icon ? (
                  <Icon className="icon" sx={{ width: 36 }}>
                    {item.icon}
                  </Icon>
                ) : (
                  <>
                    <BulletIcon
                      className={`nav-bullet`}
                      sx={{
                        display: mode === 'compact' ? 'none' : null,
                      }}
                    />
                    <Box
                      className="nav-bullet-text"
                      sx={{
                        ml: '20px',
                        fontSize: '11px',
                        display: mode !== 'compact' ? 'none' : null,
                      }}
                    >
                      {item.iconText}
                    </Box>
                  </>
                )}
                <StyledText mode={mode} className="sidenavHoverShow">
                  {item.name}
                </StyledText>
                <Box mx="auto"></Box>
                {item.badge && (
                  <BadgeValue className="sidenavHoverShow">
                    {item.badge.value}
                  </BadgeValue>
                )}
              </ButtonBase>
            </Link>
          </InternalLink>
        );
      }
    });
  };

  return <div className="navigation">{renderLevels(items)}</div>;
};

export default memo(VerticalNav);
