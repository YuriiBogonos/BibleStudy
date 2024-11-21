import * as React from "react";
import Svg, { Path } from "react-native-svg";

function TabAccountIcon(props: any) {
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
        d="M13.25 11.692c-.963 0-1.786-.342-2.472-1.028-.685-.685-1.028-1.51-1.028-2.472s.343-1.786 1.028-2.471c.686-.686 1.51-1.029 2.472-1.029.963 0 1.786.343 2.472 1.029.685.685 1.028 1.509 1.028 2.471 0 .963-.343 1.787-1.028 2.472-.686.686-1.51 1.028-2.472 1.028zm-7.5 7.616v-2.224c0-.49.133-.943.399-1.36a2.663 2.663 0 011.066-.963 14.508 14.508 0 012.992-1.09 12.946 12.946 0 016.086 0c1.006.243 2.003.606 2.992 1.09.445.225.8.546 1.066.963.266.417.399.87.399 1.36v2.224h-15zm1.5-1.5h12v-.724a.98.98 0 00-.176-.562 1.334 1.334 0 00-.478-.422 12.863 12.863 0 00-2.635-.965 11.395 11.395 0 00-5.422 0c-.895.22-1.774.54-2.635.965-.201.109-.36.25-.478.422a.98.98 0 00-.176.563v.723zm6-7.616c.55 0 1.02-.196 1.412-.587.392-.392.588-.863.588-1.413s-.196-1.02-.588-1.412a1.926 1.926 0 00-1.412-.588c-.55 0-1.02.196-1.412.588a1.926 1.926 0 00-.588 1.412c0 .55.196 1.021.588 1.413.391.391.862.587 1.412.587z"
        fill="#696969"
      />
    </Svg>
  );
}

export default TabAccountIcon;
