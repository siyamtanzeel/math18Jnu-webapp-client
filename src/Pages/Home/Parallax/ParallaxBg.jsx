import { Parallax, Background } from "react-parallax";

const ParallaxBg = ({ children }) => {
  return (
    <Parallax strength={300}>
      Blur transition from min to max
      <div style={{ height: "200px" }} />
      <Background className="custom-bg">{children}</Background>
    </Parallax>
  );
};

export default ParallaxBg;
