import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function AccountSettingsWebsiteIcon(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_129_9522)"
        stroke="#6E8BB5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M19.285 10A9.286 9.286 0 11.714 10m18.571 0A9.286 9.286 0 10.714 10m18.571 0H.714" />
        <Path d="M13.57 10A16.029 16.029 0 0110 19.286 16.029 16.029 0 016.427 10 16.029 16.029 0 019.999.714 16.029 16.029 0 0113.571 10z" />
      </G>
      <Defs>
        <ClipPath id="clip0_129_9522">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default AccountSettingsWebsiteIcon;
