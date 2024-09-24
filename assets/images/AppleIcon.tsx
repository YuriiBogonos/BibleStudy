import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
  return (
    <Svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.159 6.342c-.088.054-2.032 1.186-2.01 3.54.025 2.815 2.468 3.752 2.497 3.763-.022.067-.391 1.335-1.289 2.645-.775 1.134-1.578 2.262-2.846 2.286-1.246.023-1.647-.739-3.07-.739-1.424 0-1.87.715-3.048.762-1.224.046-2.155-1.225-2.936-2.354C.86 13.935-.361 9.72 1.278 6.873 2.092 5.46 3.547 4.564 5.125 4.54c1.203-.023 2.336.808 3.072.808.725 0 2.024-.968 3.555-.855.6.044 2.304.223 3.407 1.848zm-4.352-3.373c.65-.786 1.088-1.88.968-2.969-.936.037-2.068.623-2.74 1.409-.601.696-1.129 1.81-.986 2.877 1.044.08 2.108-.53 2.758-1.317z"
        fill="#292929"
      />
    </Svg>
  );
}

export default SvgComponent;