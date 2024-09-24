import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PlusIconButton(props: any) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.25 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 110 1.5H13v5.75a.75.75 0 11-1.5 0V12.5H5.75a.75.75 0 110-1.5h5.75V5.25a.75.75 0 01.75-.75z"
        fill="#fff"
      />
    </Svg>
  );
}

export default PlusIconButton;
