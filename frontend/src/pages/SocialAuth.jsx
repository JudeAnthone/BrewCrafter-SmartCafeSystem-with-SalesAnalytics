import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const SocialAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("brewCrafterToken", token);

      // Fetch user profile using the token
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCurrentUser(res.data.user);
          navigate("/profile");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, setCurrentUser]);

  return <div>Logging you in...</div>;
};

export default SocialAuth;

