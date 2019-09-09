import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
interface BallProps {
  no: number;
  isActive?: boolean;
}

class SvgBackground extends React.Component {
  render() {
    return (
      // @ts-ignore
      <svg width={116} height={116} xmlns="http://www.w3.org/2000/svg">
        <title>Ball</title>
        <metadata />
        <defs>
          <style>
            {`
             .number-wrapper {
            fill: #fff;
            }
            .shadow-bottom, .shadow-top {
            fill-rule: evenodd;
            }
            .shadow-bottom {
            opacity: 0.15;
            }
            .shadow-top {
            fill: none;
            stroke: #fff;
            stroke-linecap: round;
            stroke-width: 8.333px;
            opacity: 0.8;
            }
            `}
          </style>
        </defs>
        <g>
          <title>Layer 1</title>
          <g>
            <circle className="number-wrapper" cx="56.800904" cy="58.533474" r="27.5" />
            <path
              className="shadow-bottom"
              d="m7.109904,84.173474c20.971,11.161 18.29,11.686 31.7,14.308c33.857,6.619 64.295,-18.679 61.219,-58.4c-0.472,-9.544 -3.216,-19.775 -7.214,-27.028c28.908,19.45 26.5,60.953 13.566,76.4c-19.028,22.733 -39.4,33.962 -73.721,20.645c-13.936,-5.407 -19.673,-15.706 -26.393,-27.063c1.005,1.507 0.666,0.903 0.843,1.138z"
            />
            <path className="shadow-top" d="m8.346904,42.614474a42.244,42.244 0 0 1 7.1,-14.128" />
            <path className="shadow-top" d="m28.194904,17.197474s14.217,-14.977 42.731,-8.968" />
          </g>
        </g>
      </svg>
    );
  }
}

const Ball = ({ no, isActive }: BallProps) => {
  const svgString = encodeURIComponent(renderToStaticMarkup(<SvgBackground />));
  const dataUri = `url("data:image/svg+xml,${svgString}")`;
  const style = {
    ballWrapper: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 3px 4px rgba(10, 10, 10, 0.1), 0 0 0 0 rgba(10, 10, 10, 0.1)",
      borderRadius: "50%",
      backgroundImage: dataUri,
      backgroundSize: "cover",
    },
  };

  return (
    <div
      className={isActive ? "has-background-primary" : "has-background-light"}
      style={style.ballWrapper}
    >
      <span className="is-size-7">{no}</span>
    </div>
  );
};

export default Ball;
