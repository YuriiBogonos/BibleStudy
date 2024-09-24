import * as React from "react";
import Svg, { Path } from "react-native-svg";

function AccountSettingSupportIcon(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 19c.5-4.5 2.5-8 7-10M7 16c6.218 0 10.5-3.288 11-12V2h-4.014c-9 0-11.986 4-12 9 0 1 0 3 2 5H7z"
        stroke="#6E8BB5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default AccountSettingSupportIcon;
