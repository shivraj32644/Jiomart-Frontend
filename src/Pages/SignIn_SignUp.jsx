import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

export default function SignIn_SignUp() {
  const toast = useToast();
  const { page } = useParams();
  const [otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    setOtp(Math.floor(100000 + Math.random() * 900000));
  }, []);
  let user_id = localStorage.getItem("user_id") || "";
  if (user_id != "") {
    return navigate("/account");
  }

  const handleOtp = () => {
    console.log(otp,inputOtp)
    return otp === parseInt(inputOtp);
  };

  const resetOtp = () => {
    setOtp(() => Math.floor(100000 + Math.random() * 900000));
    sendOtp();
  };

  const handleInputOtp = (e) => {
    setInputOtp(e.target.value);
  };

  const sendOtp = () => {
    toast({
      title: `Your OTP is ${otp}`,
      position: "top",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box bg="#F6F6F7" pt={10} pb={5}>
      <Flex width="75%" m="auto" borderRadius="10px" bg="white">
        <Box width="50%">
          <Image
            borderTopLeftRadius={10}
            src="https://www.jiomart.com/msassets/images/login-banner.jpg"
          />
        </Box>
        <Box width="50%">
          {page === "login" ? (
            <LoginForm
              handleOtp={handleOtp}
              resetOtp={resetOtp}
              sendOtp={sendOtp}
              handleInputOtp={handleInputOtp}
              inputOtp={inputOtp}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              otp={otp}
            />
          ) : page === "register" ? (
            <RegisterForm
              handleOtp={handleOtp}
              resetOtp={resetOtp}
              handleInputOtp={handleInputOtp}
              inputOtp={inputOtp}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              otp={otp}
            />
          ) : (
            <Text>Page Not Found</Text>
          )}
        </Box>
      </Flex>
      <Text
        fontWeight={"normal"}
        mt={"10px"}
        fontSize={"sm"}
        textAlign={"center"}
      >
        By continuing you agree to our{" "}
        <Text as={"span"} color={"red"}>
          Terms of service
        </Text>{" "}
        <br /> and{" "}
        <Text as={"span"} color={"red"}>
          Privacy & Legal Policy.
        </Text>
      </Text>
    </Box>
  );
}