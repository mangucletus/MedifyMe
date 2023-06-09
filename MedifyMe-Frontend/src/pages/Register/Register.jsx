import styles from "./Register.module.css";
import useChatGPT from "../../hooks/useChatGPT";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../store";
import { useCookies } from "react-cookie";
import { loginSuccess, logoutSuccess } from "../../store";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, handleSend } = useChatGPT({
    InitialMessage :`Hello! Welcome to MedifyMe, I ayukumi an AI-powered medical health record management system. To start, we want to inform you that we take your privacy and security very seriously. We adhere to all applicable data protection laws, and any personal information collected will only be used for the purpose of providing healthcare services to you. By signing up, you consent to the collection, use, and storage of your personal information by MedifyMe . \n\nNow, may I have your name, please?`,
    content : `I want you to behave as MedifyMes AI Chatbot, and you will one by one ask me questions and get input. Ask me one question then wait for my output and then ask the next one. MedifyMe is an AI-powered medical health record management system that uses ChatGPT API to give users various insights and can alert doctors in case of a significant problem or discrepancy. To ensure the privacy and security of user data, MedifyMe will keep all user information confidential and adhere to all applicable data protection laws. Any personal information collected will be used solely for the purpose of providing healthcare services to the user. By signing up, users consent to the collection, use, and storage of their personal information by MedifyMe. This needs to be informed to the user   Next, users will be asked about their Name , age,  weight (in kg) , height (in cm), gender . They will then be asked about their current symptoms , followed by an overview of their diagnosis . ChatGPT will also ask about any medications they are taking, as well as any allergies. In addition to the above, MedifyMe will also ask about the users family medical history, including any significant health conditions or diseases that run in the family.  The system will also ask about the users medical history or any chronic conditions they may have. This information can help doctors identify potential risks and develop more personalized treatment plans. Additionally, ChatGPT will ask 2-3 follow-up questions based on the users input and their conditions, which will be relevant to the problem they are having to obtain more information. These questions may relate to the condition they are having.The next message will be in the format - "this is the json you asked for" JSON.file After all the information is gathered, the system will generate a response in JSON.file in the format { name:  ,age: ,gender:  ,weight:  ,height:  ,allergies (summarized in 10 words or less): ,otherConditions (summarized in 10 words or less): ,medications: ,overview: An overview of the patient (in 50 words or more) }`
  });
  const [register, registerResults] = useRegisterMutation();
  const [cookies, setCookie] = useCookies(["patient"]);
  const lastElement = messages[messages.length - 1];

  const messageListRef = useRef(null);
  const inputRef = useRef(null);

  const patient = useSelector((state) => {
    return state.patient;
  });

  useEffect(() => {
    messageListRef.current.lastChild.scrollIntoView();
    inputRef.current.focus();

    if (lastElement.message.includes("{")) {
      const reqMsg = lastElement.message;
      let init = reqMsg.indexOf("{");
      let fin = reqMsg.indexOf("}");
      let json = reqMsg.substr(init, fin - init + 1);
      const jsonObject = JSON.parse(json);
      messages.pop();

      async function cool() {
        let finalData = {
          name: jsonObject.name,
          email: patient.email,
          photo: patient.photo,
          age: jsonObject.age,
          gender: jsonObject.gender,
          height: jsonObject.height,
          weight: jsonObject.weight,
          allergies: jsonObject.allergies,
          otherConditions: jsonObject.otherConditions,
          medications: jsonObject.medications,
          overview: jsonObject.overview,
          token: patient.token,
        };
        try {
          const { data } = await register(finalData);

          dispatch(
            loginSuccess({
              id: data.id,
            })
          );
          setCookie(
            "patient",
            {
              id: data.id,
            },
            { path: "/" }
          );
        } catch (error) {
          console.error(error);
        }
      }

      cool();
    }

    if (!patient.isLoggedIn) {
      navigate("/login");
    }
    if (
      patient.isLoggedIn &&
      registerResults.data &&
      registerResults.data.status === 200
    ) {
      navigate("/");
      toast.success("Welcome");
    }

    if (
      patient.isLoggedIn &&
      registerResults.data &&
      registerResults.data.status === 400
    ) {
      navigate("/login");
      toast.warn(registerResults.data.message);
    }
  }, [navigate, registerResults.data, patient.isLoggedIn, messages]);

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;
    handleSend(inputValue);
    inputRef.current.value = "";
  };

  return (
    <div className={styles.chatContainer}>
      <Navbar />
      <div className={styles.title}>Tell us about yourself</div>
      <div className={styles.messageList} ref={messageListRef}>
        {messages.map((message, i) => (
          <div
            key={i}
            className={`${
              message.sender === "ChatGPT" ? styles.incoming : styles.outgoing
            }`}
          >
            <div className={styles.messageText}>{message.message}</div>
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <input
          type="text"
          placeholder="Enter your message here"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend(e.target.value);
              e.target.value = "";
            }
          }}
          ref={inputRef}
        />
        <button onClick={handleButtonClick} className={styles.button}>
          <img src="image8.svg" />
        </button>
      </div>
    </div>
  );
}

export default Register;
