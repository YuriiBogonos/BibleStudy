import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function AccountSettingsAboutIcon(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_129_9516)">
        <Path
          d="M9 7h2V5H9m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-18a10 10 0 100 20 10 10 0 000-20zM9 15h2V9H9v6z"
          fill="#6E8BB5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_129_9516">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default AccountSettingsAboutIcon;
