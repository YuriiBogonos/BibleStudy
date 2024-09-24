import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ClearHistory(props: any) {
  return (
    <Svg
      width={123}
      height={123}
      viewBox="0 0 123 123"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M43.524 92.312a22.34 22.34 0 013.142-.861l.13.473a.24.24 0 00.258.179l4.225-.492c1.162-2.651 3.296-6.667 3.327-6.729-.03-1.002 0-1.845 0-2.804-2.417.898-6.888 2.602-9.225 3.69a.301.301 0 00-.13.326s.044.154.1.375c-1.145 0-4.57-.166-5.394.615a.96.96 0 00-.179.615c-.049.849.375 7.442 1.052 9.379.35 1.015 1.089.904 1.593-.068a16.781 16.781 0 001.113-4.57c0-.079-.019-.073-.012-.128zm-.708-5.504c.75-.062.984-.05 2.596-.099.289 1.095.885 3.346 1.193 4.496a22.086 22.086 0 00-3.204.744 33.614 33.614 0 01-.585-5.141z"
        fill="#000"
      />
      <Path
        d="M100.128 32.982c.154-.215-.043-.492-.209-.707.471-.484.992-.915 1.556-1.285a9.99 9.99 0 002.577-1.845c.314-.326.904-.997.683-1.39-.222-.394-.615-.418-1.15-.19.232-.244.421-.525.559-.831.173-.48-.233-.867-1.113-.51.32-.51.394-1.046-.147-1.304-.437-.21-1.077.289-1.446.615a21.078 21.078 0 00-2.035 2.041c-.388-.811-1.003-1.746-1.772-1.45-.768.294-.172 1.617.222 2.336l-1.396.966a1.297 1.297 0 00-.689-.154c-1.587.27-8.874 5.818-9.612 5.818-.566 0-8.647-3.875-15.634-4.994a.233.233 0 00-.19-.16 19.678 19.678 0 00-3.69-.277.259.259 0 00-.191.105h-.517c-.123-.498-.578-1.648-.738-2.091.419-.363.997-.547 1.298-1.132.553-1.082.529-2.964.375-4.17.695-.528.713-1.377.554-2.244-.062-.35-.253-1.144-.548-1.34-.166-.112-.516 0-.818.11-.301-.701-.301-.382-.178-.664.057-.13.09-.27.098-.412.326.098 1.003-.554.77-1.415a5.454 5.454 0 00-.45-.886c.086-.209.27-.46-.307-1.23a1.844 1.844 0 00-.929-.54h-.283a1.568 1.568 0 00-.849-.616 2.047 2.047 0 00-1.537.216c-.123.092-.222.215-.345.3a1.777 1.777 0 00-1.845 0 1.297 1.297 0 00-.725.714 2.295 2.295 0 00-1.845.154 4.625 4.625 0 00-2.214 2.7c-.01.174-.01.349 0 .523h-.068c-.922-.136-2.097 2.054-1.156 3.757.11.203.252.394.387.615.394.615.24.8 1.12 1.55.258.222.301.203.46.338.16.136.1.068.191.412a1.581 1.581 0 00.726.978 2.83 2.83 0 00.732 1.612c.13.145.281.27.449.369.045.025.096.04.148.043.184 1.143.412 2.632.51 3.265l-.547.296c-.716.288-1.413.622-2.085 1.002a.259.259 0 00-.105.154c-.652.344-1.267.67-1.617.88C49.68 35.91 35.81 55.005 35.67 55.878a.259.259 0 000 .154c.199.317.441.605.72.855a2.381 2.381 0 01-.308.436c-1.23.806-3.075 2.005-4.065 3.075a.535.535 0 00.178.904c.185.062.215.043 1.415-.615-.33.29-.6.64-.794 1.033-.08.339.228.536.615.474.218-.057.426-.148.615-.27a1.058 1.058 0 000 1.15c.615.774 2.227-1.667 3.075-2.27.345.437.812 1.458 1.556 1.187.646-.24-.061-1.66 0-2.072.25-.24.518-.463.8-.665a4.255 4.255 0 001.593.732c1.014 0 11.605-10.689 12.41-11.544-.289 2.719-1.746 14.386-1.439 16.655.142 1.027 2.608 1.174 3.647 1.23-.313 7.38-.522 18.56-.578 18.677-1.63 3.512-2.072 4.472-2.62 5.535-.996 1.907-5.19 8.943-5.664 10.542-.068.252-.074.35.19.818a25.602 25.602 0 00-2.2 2.65c-.34.615 1.112 6.347 2.14 8.377.233.455.614 1.156 1.125 1.137 1.537-.055 1.531-5.578 1.488-7.121a.2.2 0 00-.05-.13c.28-.416.584-.814.911-1.193.196.135.401.254.615.357.21.092.443-.068.615-.209 2.048-1.611 13.094-15.375 15.461-21.87 1.077-2.964 2.51-7.06 2.915-9.963a22.71 22.71 0 00.068-5.535.099.099 0 01.168-.07.099.099 0 01.029.07c.308 1.852.368 3.736.178 5.603-.455 4.028-3.635 12.423-5.332 15.51 1.464-.27 4.44-.86 5.88-1.291 4.796-1.458 9.224-5.806 9.612-10.689.125-2.3.125-4.606 0-6.906a40.731 40.731 0 00-1.23-9.416c1.304-.707 2.497-1.538 2.884-2.3.83-1.63-1.365-11.009-1.845-13.64 2.626.288 7.098.81 9.182-.819 2.386-1.919 7.54-7.318 10.498-11.47zm-50.891 73.622c-1.107-.67-2.657-2.263-2.89-3.511.252-.32.516-.615.762-.947a13.732 13.732 0 003.075 3.327c-.338.358-.654.736-.947 1.131zm48.893-77.97a.147.147 0 00.049-.197c-.215-.4-.861-1.808-.412-1.968.258-.098.486.062.676.277.291.37.518.785.67 1.23a.21.21 0 00.162.143.209.209 0 00.201-.075c.616-.683 2.055-2.239 2.866-2.657.615-.32.763.27-.744 1.648a12.98 12.98 0 00-.996.843.138.138 0 00-.027.083c0 .03.009.059.027.083 0 .16.129.338.351.172.534-.47 1.099-.903 1.691-1.297.302-.215.653-.35 1.021-.394-.185.566-1.901 2.103-2.048 2.275a.24.24 0 00.313.363c.683-.443 1.876-1.476 2.288-1.322.412.154-.812 1.298-1.119 1.568-1.765 1.532-1.31.548-3.352 2.626a14.143 14.143 0 00-3.032-2.509l1.415-.892zM71.408 58.05a63.205 63.205 0 00-.394-2.718l.265-.351c1.23-1.58 1.599-4.096 1.482-6.07.658 2.884 1.18 5.72 1.58 8.536l-2.933.603zm-9.145-21.058c-1.618-1.23-4.22-3.352-5.732-4.803l2.46-1.23a31.278 31.278 0 015.738 7.22 53.742 53.742 0 015.209 13.807l-8.77-12.405 1.144-2.373a.19.19 0 00-.05-.216zm4.157-6.974c.037.068.461.972 1.107 2.552a86.6 86.6 0 01-.172 2.147 9.574 9.574 0 01-2.202-1.23c.135-.535.744-2.965.787-3.512l.48.043zm-2.183 6.605c.043-.11.086-.258.135-.43l.412.215c.234.154.142-.314.35 1.04 0 .227.062.479.075.756-.283-.51-.634-1.058-.966-1.58h-.006zm-.344-.516a30.469 30.469 0 00-3.949-4.564l4.631 2.011c-.178.425-.437 1.722-.676 2.553h-.007zm4.729 3.604c-.615-1.68-1.089-3.555-1.322-4.047a2.557 2.557 0 000-.462c.089.034.182.054.276.062a.246.246 0 00.246-.21c.05-.202.13-1.23.142-1.457a112.099 112.099 0 014.47 13.856c-3.474-7.392-2.939-5.252-3.806-7.742h-.006zm5.086 11.74c-1.402-6.722-3.868-15.105-6.673-21.316 1.03 0 2.058.083 3.075.246.523 4.674.086 4.514.437 4.699.35.184 2.46 1.033 2.773 1.162-.03.474.413 14.016.394 15.209h-.006zm-7.079-32.27c.32.7.434 1.477.326 2.24a1.083 1.083 0 01-1.888.411 8.856 8.856 0 01-.658-1.937c.166-.215 1.937-.646 2.22-.713zm-8.462 6.15a6.977 6.977 0 00-.689-.27 1.114 1.114 0 01-.467-1.697c.387-.326.738-.308 1.057.178.203.375.197.406.29.443a.203.203 0 00.276-.13 3.02 3.02 0 00.043-1.174c-.074-.424-.086-2.306-.074-2.368.18.095.382.14.585.13 1.113-.044 1.334-.616 1.777-1.083.51.05.615.295 1.193 0a3.41 3.41 0 00.738-.566c.177.073.348.159.51.259a1.913 1.913 0 002.233-.425c.068.13.13.259.185.394a5.338 5.338 0 00-1.575.793c-.104.13.05.83.086.996a4.164 4.164 0 00-1.47.474c-.092-.32-.295-.916-.615-1.082a.505.505 0 00-.295 0c-.553.086-2.54.682-2.78 1.008-.209.228.388 1.987.572 2.276.708 1.094 2.78.775 3.168-.505.096-.429.096-.874 0-1.303.178 0 .713-.191.775-.21.424.954.547 1.01 1.039 2.036-.068.056-.178.148-.27.21-.437.288-.53.24-.505.362a.104.104 0 00.117.074c.258-.037.51-.107.75-.21a.614.614 0 00.332-.294c.172-.388-.78-1.845-1.156-2.282.074 0 .246-.123.375-.19.172.688.29 1.23.953 1.5a1.526 1.526 0 001.194-.05c.098 1.083.08 2.842-.437 3.802-.265.498-.916.688-1.335 1.1-.123.117-.043.283 0 .462.683 1.9.695 1.894.658 2.14a22.055 22.055 0 01-.756 3.013c-.154-.067-1.882-.984-5.264-2.3-.105-.695-.665-4.403-.843-5.086.012-.24-.019-.295-.375-.455v.03zm4.305-2.508c-.197.67-1.126.959-1.79.774-.664-.184-.707-.522-1.02-1.322a3.474 3.474 0 01-.302-.965c.203-.222 2.423-.677 2.7-.72.388.664.534 1.442.412 2.202v.03zM38.407 59.746c-.234.228.08.972.129 1.618 0 .055 0 .295-.037.313-.338.111-.652-.4-.843-.707-.19-.307-.38-.726-.682-.615-.615.29-2.042 2.183-2.602 2.38-.283-.541 1.335-2.085 1.39-2.17a.252.252 0 00-.233-.382c-.111 0-.185.098-.357.252a7.114 7.114 0 01-1.777 1.267 21.837 21.837 0 011.9-1.925.264.264 0 00.067-.123s-.129-.326-.38-.197c-.358.197-2.092 1.2-2.64 1.458-.073-.05-.03-.123 0-.197.868-1.064 2.775-2.355 3.943-3.173a1.88 1.88 0 00.338-.48 22.63 22.63 0 002.583 2.072c-.28.184-.547.388-.8.61zm14.31 5.59c-.134-.085-.233-.165-.251-.276-.339-2.51 1.543-16.728 1.513-17.288a.246.246 0 00-.252-.246c-.314 0 .24 0-7.596 7.503-.516.486-4.465 4.262-5.123 4.514-.904-.067-4.305-2.78-4.858-3.634 1.07-2.165 14.046-19.976 18.536-22.7.344-.21.935-.535 1.58-.88.224.211.464.402.72.572 1.427 1.353 3.413 3.038 4.92 4.306l-1.175 2.33a.202.202 0 000 .203c9.539 13.684 9.398 13.53 9.46 13.53a66.293 66.293 0 011.137 9.582c0 .867 0 .793.037.732.037-.062 0 .043 0 .043-1.489 1.624-16.218 3.136-18.647 1.71zm33.998-20.374c-2.786.387-5.935-.191-6.543-.216a12.123 12.123 0 00-1.98-4.557.099.099 0 00-.167.105c.357.725 1.55 3.856 1.845 4.618-.092.296 2.78 12.171 1.968 13.77-.725 1.446-4.95 3.266-6.476 3.789a92.229 92.229 0 00-1.476-10.197c.21-1.771-.061-12.3-.141-16.193a.24.24 0 00-.148-.21l-2.761-1.161a40.117 40.117 0 00-.277-4.373c6.894 1.193 14.926 5.135 15.597 5.141.971 0 8.191-5.535 9.686-5.756.664-.105 3.518 2.386 3.85 3.075-2.915 4.071-8.038 9.422-10.412 11.273a5.387 5.387 0 01-2.565.892z"
        fill="#000"
      />
      <Path
        d="M61.839 21.592a.315.315 0 00-.366-.249.313.313 0 00-.25.366c.124.615.148.757.419.757a.309.309 0 00.283-.43 31.85 31.85 0 00-.086-.444zm1.882 4.072c.4.117.78-.074.768-.172-.012-.099 0-.05-.541-.253-.363-.135-.763-.615-.904-.54-.141.073.074.467.123.54.131.2.326.35.553.425zm11.248-5.843c-.806 3.377-1.396 6.242-1.495 6.814a1.846 1.846 0 00-.037.763c.326.695 4.54 2.067 5.074 1.796.535-.27 1.925-3.401 3.543-6.63.99.032 1.982-.04 2.958-.215a12.544 12.544 0 002.977-.941c2.078-.96 4.354-5.068 4.661-7.134a10.836 10.836 0 00-1.359-6.464c-5.16-8.948-20.295-4.133-19.065 5.806a13.05 13.05 0 002.743 6.205zm3.751 7.325c0 .098-.11.086-.615 0a8.444 8.444 0 01-2.946-.941c-.43-.234-.547-.283-.504-.387.043-.105.135-.068.8.116.061 0 1.968.615 2.515.806.707.32.75.32.75.406zm-.11-10.006a3.83 3.83 0 001.9-.394c.548.266 1.14.426 1.747.474-1.034 1.925-3.13 5.849-3.807 7.94l-2.608-.72a195.97 195.97 0 002.755-7.3h.013zm-.216-.51a2.122 2.122 0 01-1.79-1.846c-.171-1.23.616-2.607 1.803-2.281.744.203.836.793.707 1.537-.11.541-.51 1.9-.732 2.565l.012.024zm1.673-1.477a2.86 2.86 0 01.443-1.125 1.144 1.144 0 011.07-.566c.455.135.652.996.277 1.538a4.69 4.69 0 01-1.322 1.193 1.002 1.002 0 01-.48-1.04h.012zm-5.652-7.816c2.756-3.315 7.94-4.631 11.685-3.266a8.869 8.869 0 014.816 3.98 10.338 10.338 0 011.297 6.15c-.282 1.912-2.46 5.885-4.372 6.764a12.602 12.602 0 01-5.578 1.132c-.21 0-.43 0-.51.147-.364.738-1.028 2.165-1.68 3.506a9.356 9.356 0 00-1.396-.541c.714-2.042 2.965-6.052 4.035-7.995.927.08 1.859-.082 2.706-.468a1.36 1.36 0 00-.117-2.46c-.953-.467-1.808.652-2.306 1.593a60.33 60.33 0 00-.462.861 5.4 5.4 0 01-1.457-.301 5.614 5.614 0 001.23-1.181 1.703 1.703 0 00-.062-1.968 1.051 1.051 0 00-1.377-.19 2.626 2.626 0 00-1.23 2.57c.067.283.22.539.436.732-.403.167-.836.25-1.273.246.246-.726.646-2.036.75-2.57.066-.306.08-.62.044-.93a1.402 1.402 0 00-1.04-1.113c-1.494-.424-2.595 1.23-2.38 2.774a2.59 2.59 0 002.104 2.263c-.788 2.214-2.018 5.787-2.633 7.313l-1.353-.351c.867-4.354.972-4.25.85-4.305a12.663 12.663 0 01-2.59-6.15 7.996 7.996 0 011.863-6.242zm8.537 9.44c.43-.781 1.291-2.49 2.127-2.073a.99.99 0 01.616.818c-.013 1.083-1.698 1.273-2.768 1.255h.025zm23.542 2.712a3.512 3.512 0 012.46-.418 3.63 3.63 0 013.561 3.487 2.805 2.805 0 00-1.845-.344c-1.544.135-3.561.971-3.29 2.46.221 1.23 1.845 1.064 3.075.732 1.23-.333 2.207-.935 2.46-2.122 1.494 1.088 1.845 2.995 1.906 4.858 0 .026.01.051.029.07a.096.096 0 00.069.029c.027 0 .052-.01.07-.03a.1.1 0 00.029-.069c.043-2.085-.332-4.126-2.036-5.313a3.94 3.94 0 00-2.445-3.782 3.947 3.947 0 00-1.558-.296 3.693 3.693 0 00-2.461.504c-.227.111-.123.277-.024.234zm5.609 4.41c-.695.91-2.663 1.383-3.573 1.23-.339-.056-.615-.197-.689-.548-.222-1.23 1.9-1.9 3.167-1.943.516-.04 1.03.092 1.464.375a1.942 1.942 0 01-.369.886zm-8.426-11.6c.658-.811.215-2.226-1.623-2.232-.714 0-1.058.726-1.009 1.421.111 1.654 1.974 1.605 2.632.812zm-2.202-.842c0-.406.191-.935.615-.928.991 0 1.446.46 1.446.971-.025 1.163-2.14 1.765-2.061-.043zm-.252 69.723c-5.406-2.159-7.915 8.29-12.33 17.27-.028.377-.016.756.036 1.13 0 .942.105 7.172.652 7.879.148.283.77 0 1.058-.178a48.217 48.217 0 006.913-5.191.202.202 0 00.049-.154c1.144-1.629 5.43-10.116 6.47-14.372.725-3.014.006-5.258-2.848-6.384zm1.931 7.81a23.181 23.181 0 01-8.247-2.693c1.44-2.725 3.217-5.83 6.15-4.662 3.266 1.298 3.198 3.985 2.097 7.337v.019zm-10.233 15.991a3.182 3.182 0 00-.615-.406 3.69 3.69 0 00-2.688-.259c-.061-.731-.412-5.492-.412-5.535 4.606 1.686 3.186.954 7.75 3.223-.48.455-2.282 1.716-4.035 2.964v.013zm3.173-17.798c.6.327 1.216.625 1.845.891A53.78 53.78 0 0094.212 95c-1.033 2.159-.996 2.147-2.048 4.502-.615-.197-1.23-.381-1.845-.566.665-1.322 5.388-10.99 5.775-11.765v.013zm-3.69 12.38c1.999-3.586 4.035-8.045 5.781-11.409.615.258 1.23.468 1.845.652-.326.615-1.279 2.251-1.531 2.725-.252.473-2.78 5.455-2.958 5.836-.283.615-1.058 2.33-1.298 2.878a20.176 20.176 0 00-1.863-.695l.024.013zm2.06.762c.376-.683 1.92-3.549 2.11-3.918.289-.571 3.512-7.158 3.69-7.54.566.16 1.162.296 1.544.37-1.126 3.075-4.367 8.997-5.536 11.918-1.063-.498-1.303-.621-1.832-.842l.024.012zm.376-13.85l1.1.615a87.762 87.762 0 00-5.78 11.784l-.923-.283c3.573-7.614 3.74-8.61 5.578-12.128l.025.012zm2.533 15.215l-.928-.442c1.002-1.968 4.139-7.018 5.572-11.968.344.061.682.117 1.008.16a89.119 89.119 0 01-5.676 12.238l.024.012zm-19.268 3.992a1.52 1.52 0 00.45-1.716 1.9 1.9 0 00-3.69-.369 229.898 229.898 0 00-2.46-1.568c.614-.818 2.422-.455 2.607.215a.1.1 0 00.04.065.098.098 0 00.074.018.1.1 0 00.083-.114c-.093-1.07-2.319-1.697-3.217-.437a65.004 65.004 0 00-2.601-1.525c.707-.615 2.288-.27 2.46.369.008.022.023.04.044.052.02.011.044.015.067.011a.102.102 0 00.058-.035.1.1 0 00.022-.065c-.08-.996-2.14-1.666-3.076-.572a7.021 7.021 0 00-1.23-.54.437.437 0 00-.467.085c-1.556 1.938-6.802 6.968-9.225 7.553a.352.352 0 00-.274.218.354.354 0 00.053.347c.532.54 1.141.998 1.808 1.36-.615.615-1.095 1.168-1.452 1.568-.184.197-.283 3.96-.123 4.791a.347.347 0 00.148.196c.775.529 10.756 4.847 11.777 4.269.683-.388 8.832-8.869 8.96-9.127.198-.406.13-3.112.118-4.194-.05-.326-.658-.677-.954-.855zm-19.68 8.124v-1.372c2.553 1.23 8.395 3.74 10.61 4.441.565.184.614.16.91 0 1.69-1.083 7.662-7.811 8.757-8.838v1.298c-3.321 3.327-8.96 9.157-9.065 8.825-.61-.037-10.683-4.108-11.212-4.354zm19.527-10.197c.22.373.34.797.344 1.23a.894.894 0 01-.363.707 311.79 311.79 0 00-2.65-1.734c.633-1.248 2.041-1.267 2.644-.203h.025zm-19.68 3.936c2.62-.775 7.595-5.572 9.268-7.65.402.112.79.271 1.156.473-.615 1.144.043 2.399.277 2.22.129-.098-.105-.135-.142-.738a2.53 2.53 0 01.29-1.267c.848.443 1.844 1.021 2.687 1.507-.517 1.15.104 2.288.32 2.122.215-.166-.099-.129-.136-.732-.015-.395.061-.789.222-1.15.867.51 1.752 1.039 2.564 1.537a2.071 2.071 0 00.172 1.895.098.098 0 00.067.038.104.104 0 00.04-.002.104.104 0 00.061-.047.101.101 0 00-.008-.112 1.808 1.808 0 01.031-1.55c1.433.873 2.59 1.605 2.946 1.845-.068.061-6.482 5.769-8.666 7.466-1.432-.375-8.954-4.108-11.15-5.855zm.233 3.426c2.786 1.23 9.115 4.083 10.572 4.36.252.049.35.068.83-.314 2.048-1.642 8.709-8.61 8.77-8.536a.175.175 0 010 .056v1.23c-1.371 1.1-8.997 9.108-9.12 8.726-.615 0-10.609-4.077-11.12-4.305-.012-.258.044-.947.068-1.217zm11.2 8.475c-.616.35-9.982-3.457-11.237-4.232a9.472 9.472 0 01-.067-1.181c2.693 1.329 10.529 4.638 11.248 4.607 1.052-.055 8.487-8.426 9.016-9.01a4 4 0 01-.092.935c-.105.203-8.463 8.653-8.869 8.881zM18.751 84.778c.043.658.073 1.23.073 1.765a.308.308 0 00.615 0c0-.572-.03-1.138-.074-1.808a.308.308 0 00-.614.043zm93.707-12.331a.3.3 0 00-.282.326c.036.566.073 1.175.073 1.765a.309.309 0 00.525.218.306.306 0 00.09-.218c0-.615-.037-1.23-.08-1.808a.29.29 0 00-.103-.21.301.301 0 00-.223-.073zm-95.3 10.8a.308.308 0 100-.615c-.744 0-1.366.055-1.98.042a.314.314 0 00-.314.308.307.307 0 00.307.308c.634.012 1.329-.013 1.987-.044zm93.394-12.62c-.738 0-1.359.043-1.98.049a.309.309 0 00-.218.525c.058.057.136.09.218.09.664 0 1.353 0 2.017-.05a.309.309 0 00-.037-.614zm-91.968 8.819c.037.566.074 1.174.074 1.765a.314.314 0 00.308.307.308.308 0 00.307-.307c0-.615-.037-1.23-.074-1.808a.308.308 0 10-.615.043zm94.114-10.24c0-.615-.037-1.23-.08-1.808a.309.309 0 00-.615.043c.037.566.074 1.174.074 1.765a.309.309 0 00.527.218.31.31 0 00.094-.218zm-89.575 13.96a.308.308 0 00.295-.32.32.32 0 00-.32-.294c-.744.03-1.365.055-1.986.043a.307.307 0 100 .615c.658.012 1.347-.013 2.011-.043zm93.394-12.62c-.615.031-1.297.05-1.98.05a.302.302 0 00-.314.301.316.316 0 00.308.314c.701 0 1.267 0 2.011-.05a.313.313 0 00.214-.098.3.3 0 00.081-.221.323.323 0 00-.32-.295zM8.991 64.945c.08.061 17.423-2.51 18.168-2.964a.301.301 0 00.123-.265c0-.793-1.04-8.24-1.538-10.098-.061-.228-.123-.455-.264-.535-.941-.566-17.522 2.558-18.512 3.198a.221.221 0 00-.105.147c-.209.745 1.593 10.148 2.128 10.517zM7.24 54.575c1.18-.535 16.23-3.29 17.952-3.075.418 1.076 1.537 8.96 1.61 10.117-.854.252-17.576 3.124-17.637 3.136-.062.013-.068.086-.197-.301-.541-1.624-1.76-8.487-1.728-9.877z"
        fill="#000"
      />
      <Path
        d="M28.512 62.527a.369.369 0 00.043-.203c0-.978-1.403-11.833-1.9-12.7a.425.425 0 00-.376-.203c-2.06-.252-19.44 3.143-20.584 3.936-.16.111-.135.388-.117.683.098 1.617 1.845 12.257 2.46 12.196.068 0 .043-.05-.117.276-.96 1.974-2.78 8.297-2.743 9.57 0 .535.123 1.23.652 1.193 3.795-.468 22.399-3.42 27.75-4.52.208-.043.343-.234.337-.548a4.307 4.307 0 00-.467-1.494c-.75-1.409-3.862-6.987-4.939-8.186zM8.075 66.045c-.48-.615-2.245-11.212-2.11-12.386 1.354-.701 18.5-4.016 20.296-3.746.492 1.353 1.765 11.126 1.845 12.3-2.178.75-17.251 3.186-20.031 3.832zm.27.184c.517-.129 18.112-3.075 19.724-3.499.88.818 4.852 7.884 5.11 8.487-3.53.615-24.47 4.114-27.552 4.582.043-1.864 1.956-8.377 2.719-9.57z"
        fill="#000"
      />
      <Path
        d="M10.658 72.607c.535-.08 11.888-1.445 15.99-2.558a.098.098 0 00.025-.18.098.098 0 00-.074-.011c-.806.166-10.634 1.476-15.953 2.558a.098.098 0 00-.073.178.099.099 0 00.085.013zm8.296-42.792a12.17 12.17 0 00-.578 1.6.35.35 0 00.068.245c.621.935 6.986 8.112 8.647 9.12.227.142.498.24.664.038a11.156 11.156 0 014.57-3.377 15.074 15.074 0 014.526-.855c1.23-.11 1.445-.233 1.919-1.04.558-1.06 1.3-2.013 2.19-2.816a17.297 17.297 0 013.745-2.497.315.315 0 00.147-.356 6.646 6.646 0 00-.818-1.489c.221-.074.468-.141.468-.363 0-.615-5.363-8.376-6.852-9.84-.153-.153-.375-.356-.578-.344-3.075.172-6.07 3.075-7.804 5.609-1.986-.074-3.272-.252-5.535.7a12.608 12.608 0 00-4.231 2.94c-.185.191-1.44 1.52-1.458 1.624-.018.105.019.105.91 1.101zm24.6-.172c-2.564.436-4.2 2.57-5.405 4.89-.535 1.032-.486 1.081-1.052 1.07a15.827 15.827 0 00-2.964.11c-.721.108-1.43.285-2.116.529-1.562.553-3.352 2.325-4.305 3.64a.24.24 0 01-.357.031c-1.998-2.06-5.535-5.676-7.312-7.755-.086-.092.061-.227.148-.129 1.15 1.23 4.12 4.176 7.306 7.38 1.076-1.371 2.736-3.032 4.378-3.61.896-.32 1.828-.526 2.774-.615a17.587 17.587 0 012.663 0c.363-.418 2.159-5.166 6.23-5.695a.097.097 0 01.04.075.097.097 0 01-.034.079h.006zm-6.488-11.304c1.23.861 6.236 8.272 6.888 9.57a17.61 17.61 0 00-3.26 1.408 7.38 7.38 0 00-3.898 5.006c-2.208-3.592-5.29-7.546-7.337-10.455.123-.08 3.579-5.289 7.607-5.529zm-13.198 6.15c2.245-.904 3.487-.695 5.345-.615 1.845 3.149 5.16 7.59 7.343 10.498a8.32 8.32 0 00-5.947.818c-1.089.615-2.417 2.091-3.235 3.008-1.181-.948-7.995-8.205-9.09-9.435 1.685-1.906 3.241-3.34 5.584-4.299v.025zM12.614 40.13a.96.96 0 00-1.046-.037.965.965 0 10.787 1.765.935.935 0 00.259-1.728zm-.406 1.23c-.43.135-.689 0-.794-.21-.196-.436.05-1.107.69-.91.448.166.811.923.104 1.15v-.03zm31.678-29.373c.179.363 1.01.228 1.372.11.19-.06.314-.128.332-.313.055-.461.117-4.459-.092-4.846a.234.234 0 00-.228-.123 6.649 6.649 0 00-1.937.283c-.252.154.332 4.483.553 4.89zm-.424-4.742a9.003 9.003 0 011.716-.08c.037.456-.061 4.398-.068 4.46-.26.092-.537.126-.811.098a15.62 15.62 0 01-.21-1.003 32.977 32.977 0 01-.627-3.475zM12.017 34.938a.419.419 0 00.381 0c.238-.147.426-.36.542-.615a.252.252 0 00-.037-.246c-.296-.35-3.518-4.084-3.912-3.85-.483.313-.941.663-1.371 1.046a.166.166 0 00-.056.123c-.012.32 3.568 3.185 4.453 3.542zm-2.952-4.551c.449.326 1.962 2.196 3.364 3.85-.06.095-.135.18-.221.252a38.172 38.172 0 01-4.213-3.124c.334-.35.691-.677 1.07-.978zm9.662-13.567c.135-2.386 1.525-3.493 2.976-3.776-.412 1.513-.344 3.48 1.15 3.733.714.117 1.064-.252 1.581-.683 2.208-1.845.424-3.69-2.066-3.56.928-2.547 3.075-4.62 5.922-4.687a.098.098 0 00.07-.168.098.098 0 00-.07-.029c-3.075-.061-5.492 2.153-6.445 4.92-1.642.283-3.272 1.513-3.315 4.213a.1.1 0 00.044.102.1.1 0 00.138-.029.1.1 0 00.015-.036zm3.5-3.85c.915-.061 2.28.221 2.656 1.052.215.473 0 1.058-.763 1.697a3.016 3.016 0 01-.7.523c-.923.393-1.944-.744-1.194-3.272zm1.758 86.98a4.613 4.613 0 00-5.676 3.37 4.794 4.794 0 109.366 2.06 4.625 4.625 0 00-3.69-5.43zm1.9 5.012a4.248 4.248 0 01-4.514 3.198 4.23 4.23 0 01-2.607-4.778 4.306 4.306 0 014.538-3.334 4.305 4.305 0 012.559 4.914h.024z"
        fill="#000"
      />
      <Path
        d="M32.177 101.703a3.312 3.312 0 00-1.666-.13 8.54 8.54 0 00-.849-1.506c.4-.363 1.495-1.372 1.23-1.845a13.582 13.582 0 00-3.309-2.86 4.527 4.527 0 00-1.69-.547c-.395.055-1.33 1.586-1.538 1.93-.136 0-.615-.153-.652-.172 0-.442-.13-2.041-.53-2.226a6.319 6.319 0 00-1.383-.338c-.437-.068-4.366.652-4.655 1.18-.191.358.252 1.704.38 2.08a8.12 8.12 0 00-.953.614c-.615.437-.448.419-.56.37a1.357 1.357 0 00-.423-.124 2.46 2.46 0 00-1.63-.307c-.566.184-1.9 3.223-2.116 4.004a1.23 1.23 0 00-.055.615c.147.406 1.131.731 1.543.861a8.388 8.388 0 000 2.386c-.54.147-1.666.48-1.605 1.033.062.554 1.5 4.207 2.097 4.496a2.7 2.7 0 002.165.203c.2-.1.393-.213.578-.339.246.185.505.351.77.511-.192.473-.616 1.531-.48 2.011.067.252.27.332.553.437.781.282 4.988 1.291 5.627 1.18.24-.036.37-.289.443-.529a8.229 8.229 0 00.24-1.666c.316-.031.63-.079.94-.142.19.335.434.636.72.892.314.222.578.111.935-.117.172.222.43.529.707.56.695.08 3.567-2.626 3.863-3.18.246-.461-.652-1.285-1.052-1.648a8.41 8.41 0 001.009-2.103c.443.067.892.091 1.34.074.203 0 .437-.074.523-.265.375-.855.264-4.096 0-4.92-.037-.24-.314-.4-.517-.473zm.148.565c.21.8.277 3.82-.03 4.601a5.562 5.562 0 01-1.594-.074.224.224 0 00-.161.033.225.225 0 00-.097.133 7.899 7.899 0 01-1.125 2.325.227.227 0 00.037.313c.431.342.798.759 1.082 1.23-.308.505-2.712 2.706-3.376 2.891-.099 0-.37-.369-.437-.468a9.653 9.653 0 01-.615-1.064.238.238 0 00-.128-.116.236.236 0 00-.173 0c-1.784.67-2.46.276-2.46.719 0 .663-.108 1.322-.32 1.95a19.583 19.583 0 01-4.244-.947c.067-.657.25-1.296.541-1.888.185-.413-.553-.296-1.93-1.698a.24.24 0 00-.327 0c-.615.504-1.414.996-1.574.916-.314-.153-1.759-3.431-1.845-4.095a3.793 3.793 0 011.458-.615.241.241 0 00.172-.265 7.713 7.713 0 010-2.632.216.216 0 00-.16-.246 5.684 5.684 0 01-1.329-.535c-.135-.099-.123-.092-.11-.197a13.189 13.189 0 011.888-4.016c.332-.092 1.23.566 1.537.8a.172.172 0 00.24 0c.283-.293.587-.565.91-.812.935-.707 1.187-.615 1.107-.861a5.184 5.184 0 01-.467-1.962c.095-.08.203-.142.32-.185a12.741 12.741 0 011.765-.553 10.238 10.238 0 012.232-.363c.13.055.246.615.277.787.228 1.23.074 1.482.252 1.5 1.753.173 2.11.659 2.233.444.34-.597.738-1.159 1.187-1.68.129-.128.123-.19.51.031a13.74 13.74 0 013.075 2.75c.092.16-.707 1.008-1.291 1.506-.203.179.086.259.615 1.267.529 1.009.405 1.292.688 1.23a5.914 5.914 0 011.667-.154zm85.356-51.39a16.143 16.143 0 00-4.022-1.063c-1.008-.16-2.195-.32-3.198-.45.966-1.364 3.825-4.82 4.305-5.663.135-.228-.123-.548-.314-.738-1.07-1.144-3.136-1.575-4.723-1.82-.91-.148-4.711-.616-5.356-.308-.775.369-6.507 8.979-6.68 10.289 0 .221.074.307.29.387.904.332 4.981.849 5.891 1.064-1.23 2.153-6.697 9.428-7.232 10.455-.13.259-.05.412.105.462.553.22 1.123.396 1.703.528.221.068.707-.233 1.415-.664 3.173-1.906 16.789-10.898 17.835-12.06a.275.275 0 00.086-.213.282.282 0 00-.105-.205zm-13.216 7.38c-5.228 3.451-6.993 4.46-7.054 4.503.842-1.286 6.076-8.457 6.974-10.172a.229.229 0 00.023-.106.242.242 0 00-.092-.191.245.245 0 00-.097-.048c-.615-.221-5.092-.701-6.15-1.076.135-1.144 5.719-9.791 6.396-10.135.676-.345 7.238.436 8.468 1.316-.645 1.26-4.212 5.676-4.79 6.703-.117.21-.154.412.073.468.228.055 6.009.731 7.27 1.144-1.538 1.285-9.299 6.439-11.021 7.57v.025zm-39.453-37.6c0 .055.037.123.13.48a.314.314 0 00.38.208.307.307 0 00.21-.38 6.775 6.775 0 00-.154-.542.308.308 0 00-.566.234z"
        fill="#000"
      />
    </Svg>
  );
}

export default ClearHistory;