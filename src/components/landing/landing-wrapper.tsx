import { Box, MantineProvider } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const LandingWrapper = ({ children }: Props) => {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Inter, sans-serif',
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1320,
                xxl: 1780,
                xxxl: 1920,
              },
            },
          },
        },
      }}
    >
      <Box className="relative">
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '180px',
            left: '5%',
          })}
        >
          <Image height={62} width={62} alt="" src="/assets/landing-page/image9.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '200px',
            left: '28%',
            transform: 'rotate(80deg)',
          })}
        >
          <Image height={32} width={32} alt="" src="/assets/landing-page/star.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '700px',
            left: '10%',
          })}
        >
          <Image height={36} width={36} alt="" src="/assets/landing-page/Ellipse.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '480px',
            left: '40%',
          })}
        >
          <Image height={60} width={60} alt="" src="/assets/landing-page/calculator.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '660px',
            left: '44%',
          })}
        >
          <Image height={200} width={200} alt="" src="/assets/landing-page/Arrow.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '1060px',
            left: '8%',
          })}
        >
          <Image height={175} width={175} alt="" src="/assets/landing-page/image11.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '1600px',
            left: '18%',
          })}
        >
          <Image height={59} width={54} alt="" src="/assets/landing-page/image12.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '1600px',
            right: '12%',
          })}
        >
          <Image height={75} width={75} alt="" src="/assets/landing-page/telegram.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '1900px',
            right: '12%',
          })}
        >
          <Image height={75} width={75} alt="" src="/assets/landing-page/highlight.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '1880px',
            left: '8%',
          })}
        >
          <Image height={100} width={100} alt="" src="/assets/landing-page/rectange.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '2260px',
            left: '5%',
          })}
        >
          <Image height={100} width={100} alt="" src="/assets/landing-page/chemistry.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '2432px',
            right: '5%',
          })}
        >
          <Image height={100} width={100} alt="" src="/assets/landing-page/rocket.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '2680px',
            left: '10%',
          })}
        >
          <Image height={40} width={46} alt="" src="/assets/landing-page/image9.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '5080px',
            left: '10%',
          })}
        >
          <Image height={40} width={46} alt="" src="/assets/landing-page/image9.svg" />
        </Box>

        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '3730px',
            left: '5%',
          })}
        >
          <Image height={95} width={86} alt="" src="/assets/landing-page/wave.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '4050px',
            right: '6%',
          })}
        >
          <Image height={95} width={77} alt="" src="/assets/landing-page/vetchan.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '4460px',
            left: '10%',
          })}
        >
          <Image height={85} width={75} alt="" src="/assets/landing-page/chambi.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 20,
            top: '4444px',
            right: '18%',
          })}
        >
          <Image height={51} width={47} alt="" src="/assets/landing-page/highlight.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            zIndex: 10,
            position: 'relative',
          })}
        >
          {children}
        </Box>
      </Box>
    </MantineProvider>
  );
};

export default LandingWrapper;
