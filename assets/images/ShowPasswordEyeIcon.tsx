import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ComponentProps } from "react";

function ShowPasswordEyeIcon(props: ComponentProps<typeof Svg>) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M16 17.75c-3.8 0-7.2-2.1-8.8-5.5H5c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5z"
        fill="#292929"
      />
    </Svg>
  );
}

export default ShowPasswordEyeIcon;
