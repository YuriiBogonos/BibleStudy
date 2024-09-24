import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function ProcessIcon(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={24} height={24} rx={12} fill="#F0F9FF" />
      <Path
        d="M11.146 13.646l6-6a.5.5 0 01.707.708l-6 6a.5.5 0 01-.707-.708zM12 9.5c.434 0 .866.07 1.277.208a.5.5 0 10.32-.947 5 5 0 00-6.567 5.294.5.5 0 00.497.445c.018 0 .037 0 .055-.003a.5.5 0 00.442-.552A4.004 4.004 0 0112 9.5zm6.233.812a.5.5 0 10-.89.457 6.015 6.015 0 01.313 4.732l-11.319-.005A6.015 6.015 0 0112 7.5h.055c.931.006 1.848.23 2.676.656a.5.5 0 10.456-.89 7 7 0 00-9.791 8.563 1.004 1.004 0 00.945.67h11.317a1 1 0 00.944-.668 7.023 7.023 0 00-.369-5.52v.001z"
        fill="#6E8BB5"
      />
    </Svg>
  );
}

export default ProcessIcon;
