import * as React from "react";
import Svg, { Path } from "react-native-svg";

function AccountSettingsSignOutIcon(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 20.75H6a2.64 2.64 0 01-2.75-2.53V5.78A2.64 2.64 0 016 3.25h3a.75.75 0 010 1.5H6a1.16 1.16 0 00-1.25 1v12.47a1.16 1.16 0 001.25 1h3a.75.75 0 010 1.5v.03zm7-4a.74.74 0 01-.53-.22.75.75 0 010-1.06L18.94 12l-3.47-3.47a.75.75 0 111.06-1.06l4 4a.75.75 0 010 1.06l-4 4a.739.739 0 01-.53.22z"
        fill="#6E8BB5"
      />
      <Path
        d="M20 12.75H9a.75.75 0 110-1.5h11a.75.75 0 110 1.5z"
        fill="#6E8BB5"
      />
    </Svg>
  );
}

export default AccountSettingsSignOutIcon;
