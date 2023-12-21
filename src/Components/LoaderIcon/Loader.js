import { BallTriangle } from "react-loader-spinner";
const Loader = () => {
  return (
    <BallTriangle
      color="green" // Change this color to your desired color
      height={70}
      width={70}
      visible={true}
      // Other props can be added as needed
    />
  );
};

export default Loader;


