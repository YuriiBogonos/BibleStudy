import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
>
    <G clipPath="url(#clip0_173_1751)">
    <Path
        d="M7.757 7.636h10.607m0 0v10.607m0-10.607L5.636 20.364"
    stroke="#F9F9F9"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    />
    </G>
    <Defs>
    <ClipPath id="clip0_173_1751">
    <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
        </Defs>
        </Svg>
)
}

export default SvgComponent
