import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

let activeBreadcrumb = {
  textDecoration: 'none',
  color: '#000',
};

let diactiveBreadcrumb = {
  textDecoration: 'none',
  color: '#797979',
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: '0.90rem',
    height: '0.90rem',
    borderRadius: '50%',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export { activeBreadcrumb, diactiveBreadcrumb, StyledBadge };
