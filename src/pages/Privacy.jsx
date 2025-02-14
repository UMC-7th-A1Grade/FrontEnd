import styles from '../styles/HomePage/Privacy.module.css'

const Privacy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>A1등급 개인정보처리방침</h1>

      <div className={styles.section}>
        <h2 className={styles.heading2}>1. 수집하는 개인정보 항목</h2>
        <p className={styles.text}>
          회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.emphasis}>필수항목</span>
            <ul className={styles.nestedList}>
              <li className={styles.listItem}>이메일 주소 (구글 로그인)</li>
              <li className={styles.listItem}>닉네임</li>
            </ul>
          </li>
          <li className={styles.listItem}>
            <span className={styles.emphasis}>서비스 이용 과정에서 생성되는 정보</span>
            <ul className={styles.nestedList}>
              <li className={styles.listItem}>촬영한 문제 사진</li>
              <li className={styles.listItem}>학습 이력 (틀린 문제, 풀이 기록 등)</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>2. 개인정보의 수집 및 이용목적</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            서비스 제공 및 운영
            <ul className={styles.nestedList}>
              <li className={styles.listItem}>수학 문제 답안 및 풀이 제공</li>
              <li className={styles.listItem}>AI 기반 유사 문제 생성</li>
              <li className={styles.listItem}>학습 진도 관리</li>
            </ul>
          </li>
          <li className={styles.listItem}>서비스 개선 및 신규 서비스 개발</li>
          <li className={styles.listItem}>불만처리 등 민원처리</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>3. 개인정보의 보유 및 이용기간</h2>
        <p className={styles.text}>
          회사는 회원탈퇴 시 지체 없이 해당 이용자의 개인정보를 파기합니다. 단, 관계 법령의 규정에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>4. 이용자의 권리와 행사방법</h2>
        <p className={styles.text}>
          이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수 있으며, 회원탈퇴를 통해 개인정보 이용에 대한 동의를 철회할 수 있습니다.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>5. 개인정보의 안전성 확보 조치</h2>
        <p className={styles.text}>
          회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>개인정보 암호화</li>
          <li className={styles.listItem}>해킹 등에 대비한 기술적 대책</li>
          <li className={styles.listItem}>개인정보에 대한 접근 제한</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>6. 개인정보 보호책임자</h2>
        <p className={styles.text}>
          개인정보 보호책임자 및 고객센터 연락처는 추후 공개될 예정입니다.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>7. 개정 전 고지의무</h2>
        <p className={styles.text}>
          본 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 경우 변경사항의 시행 7일 전부터 공지사항을 통해 고지할 것입니다.
        </p>
      </div>

      <div className={styles.footer}>
        <p>시행일자: 2025년 2월 14일</p>
        <p>대표자: 이진동</p>
      </div>
    </div>
  )
}

export default Privacy