const AnimatedSVG = () => {
  return (
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox="0 0 1440 590"
      xmlns="http://www.w3.org/2000/svg"
      className="transition duration-300 ease-in-out delay-150">
      <defs>
        <linearGradient id="gradient" x1="1%" y1="41%" x2="99%" y2="59%">
          <stop offset="5%" stopColor="#0693e3" />
          <stop offset="95%" stopColor="#eb144c" />
        </linearGradient>
      </defs>
      <path
        d="M 0,600 L 0,150 C 99.7129186602871,138.95693779904306 199.4258373205742,127.91387559808614 291,117 C 382.5741626794258,106.08612440191386 466.0095693779905,95.30143540669854 572,116 C 677.9904306220095,136.69856459330146 806.5358851674641,188.8803827751196 911,206 C 1015.4641148325359,223.1196172248804 1095.846889952153,205.17703349282297 1180,190 C 1264.153110047847,174.82296650717703 1352.0765550239234,162.41148325358853 1440,150 L 1440,600 L 0,600 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        fillOpacity="0.53"
        className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
      <style>
        {`
          .path-0 {
            animation: pathAnim-0 4s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-0 {
            // ... (same animation keyframes)
          }
        `}
      </style>
      <path
        d="M 0,600 L 0,350 C 119.44497607655506,356.42105263157896 238.88995215311013,362.8421052631579 327,357 C 415.11004784688987,351.1578947368421 471.8851674641147,333.05263157894734 560,321 C 648.1148325358853,308.94736842105266 767.5693779904307,302.9473684210526 880,320 C 992.4306220095693,337.0526315789474 1097.8373205741627,377.15789473684214 1190,386 C 1282.1626794258373,394.84210526315786 1361.0813397129186,372.42105263157896 1440,350 L 1440,600 L 0,600 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        fillOpacity="1"
        className="transition-all duration-300 ease-in-out delay-150 path-1"></path>
      <style>
        {`
          .path-1 {
            animation: pathAnim-1 4s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-1 {
            // ... (same animation keyframes)
          }
        `}
      </style>
    </svg>
  );
};

export default AnimatedSVG;
