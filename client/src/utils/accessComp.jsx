import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// custom hook
const useAccess = (url) => {
  const [access, setAccess] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const getComp = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });
        // console.log(response)
        if (response.status !== 200) {
          navigate("/signup")
        } else {
          setAccess(true);
        }
      }
      catch (err) {
        console.log("Can not access multiplayer !", err);
        setAccess(false)
        navigate("/signup")

      }
    }
    getComp()
  }, [url, navigate])
  return [access]
}
export default useAccess