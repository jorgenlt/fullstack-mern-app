import { Box, useMediaQuery } from "@mui/material"
import Navbar from "../navbar"
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { _id, picturePath } = useSelector((state) => state.user);
  console.log("🚀 ~ file: index.jsx:10 ~ HomePage ~ picturePath:", picturePath)
  console.log("🚀 ~ file: index.jsx:10 ~ HomePage ~ _id:", _id)

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} >
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box 
          flexBasis={isNonMobileScreens ? "42%" : undefined} 
          mt={isNonMobileScreens ? undefined : "2rem"}
        >

        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%" >
            
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage