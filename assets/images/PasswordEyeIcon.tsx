import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16 13a3 3 0 110 6 3 3 0 010-6zm0-4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S6.73 20.39 5 16c1.73-4.39 6-7.5 11-7.5zM7.18 16a9.822 9.822 0 0017.64 0 9.822 9.822 0 00-17.64 0z"
        fill="#292929"
      />
    </Svg>
  );
}

export default SvgComponent;
