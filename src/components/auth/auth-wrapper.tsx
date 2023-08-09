import { Box, rem } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: '873px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: ` 0 ${rem(16)}`,
      })}
    >
      <Box
        sx={{
          width: rem(286),
          height: rem(286),
          backgroundColor: '#5470FA',
          position: 'absolute',
          left: rem(-286 / 2),
          bottom: rem(-286 / 2),
          borderRadius: '50%',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '25.625%',
          bottom: '59.27%',
          zIndex: 1,
        }}
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_186_608)">
            <rect x="14.98" width="19" height="19" transform="rotate(34 14.98 0)" fill="#4461F2" />
          </g>
          <defs>
            <filter
              id="filter0_d_186_608"
              x="0.355225"
              y="0"
              width="34.3765"
              height="34.3764"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_186_608" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_186_608"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '26%',
          bottom: '30.625%',
          zIndex: 1,
        }}
      >
        <svg
          width="37"
          height="38"
          viewBox="0 0 37 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_186_605)">
            <path
              d="M12.6883 0.916597L20.2035 9.21287L29.8965 4.69295L24.8482 14.3403L32.3634 22.6365L21.7282 20.3026L16.6798 29.9499L15.1552 18.8602L4.51992 16.5263L14.2129 12.0063L12.6883 0.916597Z"
              fill="#4461F2"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_186_605"
              x="0.52002"
              y="0.916626"
              width="35.8435"
              height="37.0333"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_186_605" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_186_605"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '28.85%',
          right: '30%',
          zIndex: 1,
        }}
      >
        <svg
          width="39"
          height="46"
          viewBox="0 0 39 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_186_606)">
            <path
              d="M30.71 36.3812C27.2361 38.6372 22.5911 37.6499 20.3351 34.176L6.17453 12.3706C3.91856 8.89668 4.90588 4.25171 8.37977 1.99575V1.99575C11.8537 -0.260223 16.4986 0.727096 18.7546 4.20098L32.9152 26.0064C35.1712 29.4803 34.1839 34.1253 30.71 36.3812V36.3812Z"
              fill="#4461F2"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_186_606"
              x="0.963623"
              y="0.784912"
              width="37.1625"
              height="44.8072"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_186_606" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_186_606"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '26.875%',
          right: '29.47%',
          zIndex: 1,
        }}
      >
        <svg
          width="28"
          height="31"
          viewBox="0 0 28 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_186_607)">
            <path
              d="M23.5906 0.437975L23.2127 22.0853L4.6545 10.9344L23.5906 0.437975Z"
              fill="#4461F2"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_186_607"
              x="0.654541"
              y="0.437988"
              width="26.936"
              height="29.6473"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_186_607" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_186_607"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '44.8%',
          right: '19.375%',
          zIndex: 1,
        }}
      >
        <Image src="/CSharp.png" width={150} height={150} alt="" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '10.52%',
          left: '17.8%',
          zIndex: 1,
        }}
      >
        <Image src="/html.png" width={150} height={150} alt="" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '7.7%',
          left: '16%',
          zIndex: 1,
        }}
      >
        <Image src="/Kotlin.png" width={150} height={150} alt="" />
      </Box>
      {children}
    </Box>
  );
};

export default AuthWrapper;
