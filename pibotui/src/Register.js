import{ useRef, useState, useEffect } from "react";
import{ faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import{ FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;  
/* Validates User Parameters| Must start with upper or lower case letter, Must be followed by 3-23 upper or lowercase letters, digits, hyphens, or underscores.  */
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.[!@#$%]).{8,24}$/; 
/* Validates Password Parameters | Requires at least 1 uppercase letter. 1 digit. 1 special character. 8-24 characters. */

/*Functional Component */
const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState(''); 
    const [validName, setValidName] = useState(false);  /* Boolean tied to whether or not the name validates. */
    const [userFocus, setUserFocus] = useState(false);  /* Boolean tied to whether or not we have focus on input field */

    const [pwd, setPwd] = useState(''); 
    const [validPwd, setValidPwd] = useState(false); 
    const [pwdFocus, setPwdFocus] = useState(false); 

    const [matchPwd, setMatchPwd] = useState(''); 
    const [validMatch, setValidMatch] = useState(false); 
    const [matchFocus, setMatchFocus] = useState(false); 

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    /* Set focus on user input when component loads [No Dependency] */
    useEffect(() => {
        userRef.current.focus();
    }, [])

    /* User State in validation array checks status of specified field */
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    return(
        <section>
            <p ref = {errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live = "assertive"> {errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" :
                    "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"S
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user &&
                !validName ? "instructions" : "ofscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. <br />
                    Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </form>
        </section>
    )
}

export default Register