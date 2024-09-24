import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function VersesIcon(props: any) {
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
        d="M9.5 11h5m-5 5h5m-5-2.5H12m-5 4.625V6.375A.375.375 0 017.375 6h7.283c.099 0 .194.04.264.11l1.968 1.968a.375.375 0 01.11.266v9.781a.376.376 0 01-.375.375h-9.25A.376.376 0 017 18.125z"
        stroke="#6E8BB5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.5 6v2.125a.375.375 0 00.375.375H17"
        stroke="#6E8BB5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default VersesIcon;
