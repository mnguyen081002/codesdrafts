// @mui
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------
const H_FOOTER = 40;

export const StyledRoot = styled('main')(() => ({
  display: 'flex',
  userSelect: 'none',
}));

export const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 400,
  height: `calc(100vh - ${H_FOOTER}px)`,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  width: '100%',
  justifyContent: 'center',
}));

export const StyledEarth = styled('div')(() => ({
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'hidden',
}));

export const StyledSocialMedia = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 20,
  position: 'absolute',
  top: 20,
  right: 40,
  alignItems: 'center',
  '& img': {
    height: 35,
    borderRadius: '50%',
    filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))',
  },
  '& a:hover img': {
    filter: 'none',
  },
}));

export const StyledFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  height: H_FOOTER,
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: 'space-between',
  padding: '0px 24px',
  backgroundColor: '#E8E6E6',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));
