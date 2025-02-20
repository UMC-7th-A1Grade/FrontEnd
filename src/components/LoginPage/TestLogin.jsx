import React from "react";
import { useNavigate } from "react-router-dom";

const TestLoginButton = () => {
  const navigate = useNavigate();

  const handleTestLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/google?code=test`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 포함 요청
      });

      const data = await response.json();

      if (data.isSuccess) {
        // API 응답에서 사용자 정보 저장
        localStorage.setItem("accessToken", data.result.accessToken);
        localStorage.setItem("email", data.result.email);
        localStorage.setItem("socialId", data.result.socialId);

        // 메인 페이지로 이동
        navigate("/");
      } else {
        console.error("테스트 계정 로그인 실패:", data.message);
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
    }
  };

  return (
    <p onClick={handleTestLogin} style={{ color: "gray", fontSize: "14px", textAlign: "center", marginTop: "8px", cursor: "pointer" }}>
      테스트 계정 로그인
    </p>
  );
};

export default TestLoginButton;
