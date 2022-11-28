import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaWhatsappSquare } from "react-icons/fa";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPICall from "../CustomHooks/useAPICall";
import { useDispatch } from "react-redux";
import { Login } from "../Redux/Login/action";

const initMsg = {
  First_Name: {
    status: false,
    notice: "Please enter your First Name",
  },
  Last_Name: {
    status: false,
    notice: "Please enter your Last Name",
  },
  Email: {
    status: false,
    notice: "Please enter your Email",
  },
  password: {
    status: false,
    notice: "Please enter your Password",
  },
  password2: {
    status: false,
    notice: "Password does not match",
  },
  otp: {
    status: false,
    notice: "Invalid OTP!!!",
  },
};

const initform = {
  First_Name: "",
  Last_Name: "",
  Email: "",
  password: "",
  password2: "",
};

const RegisterForm = ({
  handleOtp,
  resetOtp,
  handleInputOtp,
  inputOtp,
  phoneNumber,
  setPhoneNumber,
  otp,
}) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [form, setform] = useState(initform);
  const [msg, setMsg] = useState(initMsg);
  const { baseUrl } = useAPICall();
  const dispatch = useDispatch();
  const { First_Name, Last_Name, Email, password, password2 } = form;

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setform({ ...form, [name]: value });
  };

  const handleClick = () => setShow(!show);

  const handleForm = async (e) => {
    // e.prevantDefault();
    setMsg(initMsg);
    if (First_Name === "") {
      setMsg({ ...msg, First_Name: { ...msg.First_Name, status: true } });
    } else if (Last_Name === "") {
      setMsg({ ...msg, Last_Name: { ...msg.Last_Name, status: true } });
    } else if (Email === "") {
      setMsg({ ...msg, Email: { ...msg.Email, status: true } });
    } else if (password === "") {
      setMsg({ ...msg, password: { ...msg.password, status: true } });
    } else if (password2 === "" || password !== password2) {
      setMsg({ ...msg, password2: { ...msg.password2, status: true } });
    } else if (handleInputOtp === "") {
      setMsg({ ...msg, otp: { ...msg.otp, status: true } });
    } else {
      if (handleOtp()) {
        // dispatch(regsiter(`${baseUrl}/users`,{...form,number:phoneNumber}))
        // let obj = {
        //   Mobile_Number :phoneNumber
        // }
        // dispatch(Login(obj,inputOtp,otp))
        let obj = {
          First_Name: First_Name,
          Last_Name: Last_Name,
          Email: Email,
          password: password,
          Mobile_Number: phoneNumber,
        };
        let res = await fetch(`https://jiomart-server.cyclic.app/auth/Signup`, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let res2 = await res.json();
        if (res2.error) {
        return  toast({
            title: "User is Already Registered",
            description: "Please Login",
            position: "top",
            status: "Error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Account created Successfully",
            // description: "We've created your account for you.",
            position: "top",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          return navigate("/");
        }
      } else {
        setMsg({ ...msg, otp: { ...msg.otp, status: true } });
      }
    }
  };

  // console.log(form)
  return (
    <Box m={"20px 20px"}>
      <form>
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          color="black"
          pb="6px"
          mt="20px"
        >
          Sign up
        </Text>

        <Text color={"#8d9bad "} ml={"20px"} mb={"30px"}>
          Please enter your details.
        </Text>
        <Input
          mb={"0px"}
          placeholder="Your First Name"
          name="First_Name"
          onChange={handleChange}
          value={First_Name}
        />
        {msg.First_Name.status && (
          <Text fontSize="xs" color="crimson">
            {msg.First_Name.notice}
          </Text>
        )}
        <Input
          mt={"30px"}
          placeholder="Your Last Name"
          name="Last_Name"
          onChange={handleChange}
          value={Last_Name}
        />
        {msg.Last_Name.status && (
          <Text fontSize="xs" color="crimson">
            {msg.Last_Name.notice}
          </Text>
        )}
        <Input
          mt={"30px"}
          placeholder="Your Email Id"
          name="Email"
          onChange={handleChange}
          value={Email}
        />
        {msg.Email.status && (
          <Text fontSize="xs" color="crimson">
            {msg.Email.notice}
          </Text>
        )}
        <InputGroup mt={"30px"} size="md">
          <Input
            mb={"30px"}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {msg.password.status && (
          <Text mt={"-30px"} pb="25px" fontSize="xs" color="crimson">
            {msg.password.notice}
          </Text>
        )}

        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            name="password2"
            onChange={handleChange}
            value={password2}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Text mb={"30px"} fontSize="13px" color="##e3c6b0">
          Use 8 or more characters with a mix of letters & numbers <br />
          {msg.password2.status && (
            <Text fontSize="xs" color="crimson">
              {msg.password2.notice}
            </Text>
          )}
        </Text>

        <Flex mb={"1rem"} justifyContent={"center"} alignItems={"center"}>
          <Box p={"10px"} fontSize={"32px"} color={"#48df62"}>
            <FaWhatsappSquare />
          </Box>
          <Box>
            {" "}
            <Text fontSize={"sm"} as={"b"}>
              Enable order updates and important information on <br /> Whatsapp
            </Text>{" "}
          </Box>
          <Spacer />
          <Box>
            <Checkbox defaultChecked></Checkbox>
          </Box>
        </Flex>
        <hr />

        <Text
          mb={"10px"}
          fontSize="10xl"
          fontWeight="semibold"
          color="black"
          pb="6px"
          mt="20px"
        >
          Verify
        </Text>
        <Text as={"span"} mb={"10px"} fontSize="14px" color="##e3c6b0">
          We have sent 6 digit OTP on <Text as={"b"}>+91-{phoneNumber}</Text>{" "}
        </Text>
        <Button
          fontSize={"13px"}
          color="#e23911"
          boder="0"
          bg="white"
          onClick={() => {
            navigate("/account/login");
            setPhoneNumber("");
          }}
        >
          Change
        </Button>

        <Input
          mb={"10px"}
          placeholder="Enter your OTP"
          name="otp"
          onChange={handleInputOtp}
          value={inputOtp}
        />
        {msg.otp.status && (
          <Text fontSize="xs" color="crimson">
            {msg.otp.notice}
          </Text>
        )}
        <Button
          fontSize={"13px"}
          color="#e23911"
          boder="0"
          bg="white"
          onClick={resetOtp}
        >
          Resend OTP
        </Button>
        <Button
          w={"100%"}
          mb={"10px"}
          mt="30px"
          colorScheme="blue"
          onClick={handleForm}
        >
          Verify
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;