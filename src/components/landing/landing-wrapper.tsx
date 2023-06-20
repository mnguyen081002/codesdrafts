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
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 10,
            top: '120px',
            left: '24%',
          })}
        >
          <Image
            height={62}
            width={62}
            alt=""
            src="/assets/landing-page/attachment-tool-svgrepo-com1.svg"
          />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 10,
            top: '280px',
            left: '6%',
            transform: 'rotate(45deg)',
          })}
        >
          <Image height={32} width={32} alt="" src="/assets/landing-page/star.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 10,
            top: '200px',
            left: '36%',
            transform: 'rotate(80deg)',
          })}
        >
          <Image height={32} width={32} alt="" src="/assets/landing-page/star.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 10,
            top: '600px',
            left: '32%',
            transform: 'rotate(320deg)',
          })}
        >
          <Image height={36} width={36} alt="" src="/assets/landing-page/star.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 10,
            top: '700px',
            left: '10%',
          })}
        >
          <Image height={36} width={36} alt="" src="/assets/landing-page/Ellipse.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 10,
            top: '480px',
            left: '48%',
          })}
        >
          <Image height={60} width={60} alt="" src="/assets/landing-page/calculator.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 10,
            top: '720px',
            left: '45%',
          })}
        >
          <Image height={160} width={160} alt="" src="/assets/landing-page/Arrow.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 15,
            top: '0',
            right: '0',
          })}
        >
          <Image height={147} width={90} alt="" src="/assets/landing-page/Polygon.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 5,
            bottom: '960px',
            left: '-20px',
          })}
        >
          <Image height={240} width={240} alt="" src="/assets/landing-page/Ellipse2.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 5,
            top: '1150px',
            right: '12%',
          })}
        >
          <Image height={75} width={75} alt="" src="/assets/landing-page/highlight.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 5,
            top: '1320px',
            left: '5%',
          })}
        >
          <Image height={100} width={100} alt="" src="/assets/landing-page/chemistry.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: theme.white,
            position: 'absolute',
            zIndex: 5,
            top: '1640px',
            right: '5%',
          })}
        >
          <Image height={100} width={100} alt="" src="/assets/landing-page/rocket.svg" />
        </Box>

        <Box
          sx={(theme) => ({
            zIndex: 20,
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
