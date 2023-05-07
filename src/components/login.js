import { useState} from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email,setEmail] = useState("");
    const [sentOtp, setsentOtp] = useState();
    const [enterOtp, setenterOtp] = useState("");
    const [counter,setCounter] = useState();
    const [resend, setResend] = useState(false);
    const navigate = useNavigate();

    const formSubmit =(e)=>{
        e.preventDefault();
        if(enterOtp){
            const savedotp=sessionStorage.getItem('otp');
            if(parseInt(savedotp) === parseInt(enterOtp)){
                navigate("/home")
                sessionStorage.setItem('isAuthenticated',true);
                sessionStorage.removeItem('otp');
            }else{
                alert("Please Enter Correct OTP");
            }
        } else{
            let generatedOtp = Math.floor(100000 + Math.random() * 900000);
            setsentOtp(generatedOtp);
            sessionStorage.setItem('otp',generatedOtp)
            sessionStorage.setItem('email',email)
            sendOtpMail(generatedOtp);
            countDownTimer();
        }
                   
    } 
    const countDownTimer = () =>{
        let count = 30;
        let counter = setInterval(countDown, 1000);
        function countDown (){
            if(count === 0){
                clearInterval(counter);
                setResend(true);
            }else{
                count--;
                setCounter(count)
            }
        }
    }

    const sendOtpMail = (generatedOtp) => {
        let messageOtp = "Please use this OTP " + generatedOtp
        let emailId = email.replace(/"/g,"'")
        if(email && generatedOtp){
            window.Email.send({
                Host : "smtp.elasticemail.com",
                Username : "archit32anand@gmail.com",
                Password : "A9BEA3BF1F3545B0484819D519E15641E0FC",
                To : emailId,
                From : "archit786anand@gmail.com",
                Subject : "OTP for login",
                Body : messageOtp
            }).then(
            message => successful(message)
            );
        }else {
            alert("Please enter correct mail")
        }
      
    }
    const successful = (message) =>{
        if(message==="OK"){
            // navigate('/otpverification')
            console.log("Logged Succesfully")
        }else{
            alert("Failed! Try Again")
        }
    }
    const otpHandler = (e) => {
        setenterOtp(e.target.value)
    }

    const inputHandler = (e) =>{
        setEmail(e.target.value)
    }

    const resendHandler = () =>{
        countDownTimer();
        setResend(false);
        sendOtpMail();
    }


    const OtpVerification = () =>{
        return (
            <>
                <div className = "inputBox "> 
                        <span className = "header-name"> Enter OTP recieved on your Email:</span>
                        <input type="text" inputMode= "numeric" placeholder="Please enter your OTP!" onChange={otpHandler} value={enterOtp}  required></input>
                </div>
                <p>Resend OTP after {counter} sec.</p>
                <div className = "inputBox">
                        <input className="submit-button1" type="submit" value="Login">
                        </input>
                </div>
                {resend && <button id="resend" onClick = {resendHandler}>Resend OTP</button> }
        </>
        )
    }

    return (
        <div>
            <h2>Login Here</h2>
            <form onSubmit={formSubmit}>
                <div className = "inputBox "> 
                    <span className = "header-name">Please Enter your Email:</span>
                    <input type="email" name= "email"  id = 'email' placeholder="Please enter your email!" onChange={inputHandler} value={email} disabled = {sentOtp ? true: false} required></input>
                </div>
                { }
                {
                    sentOtp && OtpVerification()
                }
               {!sentOtp &&  
                <div className = "inputBox">
                    <input className="submit-button1" type="submit" value="Get OTP">
                    </input>
                </div>}
             </form>
        </div>
    )
}

export default LoginPage;