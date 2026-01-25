
import React from "react";
import { Dimensions } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Responsive font helper
const responsiveFontSize = (size: number) => {
  const scale = SCREEN_WIDTH / 375;
  return size * scale;
};

interface TextHeaderProps {
  title: string;
  fontSize?: number;
}

const TextHeader: React.FC<TextHeaderProps> = ({ title, fontSize = 18 }) => {
  const size = responsiveFontSize(fontSize);

  return (
    <Svg height={size * 1} width="100%">
      <SvgText
        x="50%"
        y="100%"
        textAnchor="middle"
        fill="#F5CE8E" // main text color
        stroke="black" // thick black stroke
        strokeWidth={2} // adjust for thickness
        fontSize={size}
        fontWeight="bold"
      >
        {title}
      </SvgText>
    </Svg>
  );
};

export default TextHeader;
