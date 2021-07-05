import React from 'react'
import PropTypes from 'prop-types'

enum colorsEnum {
  'fill' = '#42E6E7',
  'empty' = '#E7FAF8'
}

interface Props {
  value: number
}

const ProgressCycle: React.FC<Props> = ({ value }): JSX.Element => {
  const [colors, setColors] = React.useState<Array<string>>([])

  React.useEffect(() => {
    const val = Math.floor(value)
    const arr = Array(5).fill(colorsEnum.empty)
    if (!val || val > 100) setColors(arr)
    const emptyCount = Math.floor(((100 - val) / 100) * 5)
    const fillColorArr = arr.slice(0, 5 - emptyCount).fill(colorsEnum.fill)
    const emptyColorArr = arr.slice(5 - emptyCount, 5)
    setColors([...fillColorArr, ...emptyColorArr])
  }, [value])

  return (
    <svg
      width="177"
      height="176"
      viewBox="0 0 177 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M129.543 15.8381C144.364 24.54 156.238 37.4829 163.632 52.9973C171.027 68.5117 173.604 85.8859 171.03 102.879L165.928 102.106C168.348 86.1328 165.926 69.801 158.975 55.2175C152.023 40.6339 140.862 28.4676 126.931 20.2878L129.543 15.8381Z"
        fill={colors[0]}
      />
      <path
        d="M170.227 107.664C165.529 125.713 155.091 141.745 140.486 153.344C125.882 164.943 107.903 171.48 89.2594 171.97L89.1238 166.812C106.649 166.352 123.549 160.206 137.277 149.303C151.005 138.4 160.817 123.33 165.233 106.364L170.227 107.664Z"
        fill={colors[1]}
      />
      <path
        d="M84.5427 171.988C69.2012 171.728 54.2085 167.368 41.1199 159.361C28.0312 151.353 17.3232 139.99 10.1063 126.449L14.66 124.022C21.4438 136.751 31.5093 147.432 43.8127 154.959C56.116 162.486 70.2091 166.584 84.6301 166.828L84.5427 171.988Z"
        fill={colors[2]}
      />
      <path
        d="M7.58601 121.006C1.74751 106.959 -0.260309 91.6139 1.76737 76.5371C3.79505 61.4603 9.78565 47.1911 19.1281 35.1852L23.2004 38.3541C14.4185 49.6396 8.78735 63.0527 6.88133 77.2249C4.97531 91.3971 6.86266 105.821 12.3508 119.026L7.58601 121.006Z"
        fill={colors[3]}
      />
      <path
        d="M22.3947 32.1176C35.263 17.977 52.4765 8.52776 71.3151 5.26304C90.1536 1.99831 109.543 5.10431 126.419 14.0902L123.994 18.6448C108.13 10.1981 89.9044 7.27842 72.1962 10.3473C54.4879 13.4161 38.3072 22.2984 26.211 35.5906L22.3947 32.1176Z"
        fill={colors[4]}
      />
      <defs>
        <filter
          id="filter0_d"
          x="121.931"
          y="12.8381"
          width="55.0694"
          height="97.0406"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

ProgressCycle.propTypes = {
  value: PropTypes.number.isRequired
}

export default ProgressCycle
