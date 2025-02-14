import styles from '../styles/HomePage/Terms.module.css'

const Terms = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>A1등급 이용약관</h1>

      <div className={styles.section}>
        <h2 className={styles.heading2}>제1장 총칙</h2>

        <h3 className={styles.heading3}>제1조 (목적)</h3>
        <p className={styles.text}>
          본 약관은 A1등급(이하 "회사")이 제공하는 수학 학습 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>

        <h3 className={styles.heading3}>제2조 (정의)</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            "서비스"란 이용자가 촬영한 수학 문제에 대한 답과 풀이를 제공하고, AI 기반 유사 문제를 생성하며, 학습 이력을 관리할 수 있는 교육 플랫폼을 의미합니다.
          </li>
          <li className={styles.listItem}>
            "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원을 말합니다.
          </li>
          <li className={styles.listItem}>
            "회원"이란 서비스에 구글 계정을 통해 가입하여 서비스를 이용하는 자를 말합니다.
          </li>
        </ol>

        <h3 className={styles.heading3}>제3조 (약관의 효력 및 변경)</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
          </li>
          <li className={styles.listItem}>
            회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.
          </li>
          <li className={styles.listItem}>
            약관이 변경된 경우에는 지체 없이 이를 공지합니다.
          </li>
        </ol>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>제2장 서비스 이용</h2>

        <h3 className={styles.heading3}>제4조 (서비스 이용 계약의 성립)</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            서비스 이용 계약은 만 14세 이상의 이용자가 구글 계정을 통해 로그인하고 본 약관에 동의함으로써 성립됩니다.
          </li>
          <li className={styles.listItem}>
            회사는 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다:
            <ul className={styles.nestedList}>
              <li className={styles.listItem}>만 14세 미만인 경우</li>
              <li className={styles.listItem}>타인의 계정을 도용한 경우</li>
              <li className={styles.listItem}>서비스의 운영을 고의로 방해한 경우</li>
              <li className={styles.listItem}>불법적인 목적으로 서비스를 이용한 경우</li>
            </ul>
          </li>
        </ol>

        <h3 className={styles.heading3}>제5조 (서비스의 제공 및 변경)</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            회사는 다음과 같은 서비스를 제공합니다:
            <ul className={styles.nestedList}>
              <li className={styles.listItem}>수학 문제 사진 촬영 및 답안 제공</li>
              <li className={styles.listItem}>AI 기반 유사 문제 생성</li>
              <li className={styles.listItem}>틀린 문제 및 학습 이력 관리</li>
            </ul>
          </li>
          <li className={styles.listItem}>
            회사는 서비스의 내용을 변경하거나 중단할 수 있으며, 이 경우 변경 또는 중단됨을 사전에 공지합니다.
          </li>
        </ol>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>제3장 의무 및 책임</h2>

        <h3 className={styles.heading3}>제6조 (회사의 의무)</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            회사는 관련 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않습니다.
          </li>
          <li className={styles.listItem}>
            회사는 지속적이고 안정적인 서비스 제공을 위하여 최선을 다하여 노력합니다.
          </li>
          <li className={styles.listItem}>
            회사는 이용자가 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보처리방침을 공시하고 준수합니다.
          </li>
        </ol>

        <h3 className={styles.heading3}>제7조 (이용자의 의무)</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            이용자는 다음 행위를 하여서는 안 됩니다:
            <ul className={styles.nestedList}>
              <li className={styles.listItem}>타인의 계정 및 비밀번호를 도용하는 행위</li>
              <li className={styles.listItem}>서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제, 공개 또는 제3자에게 제공하는 행위</li>
              <li className={styles.listItem}>서비스의 운영을 고의로 방해하는 행위</li>
              <li className={styles.listItem}>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
              <li className={styles.listItem}>기타 관련 법령에 위배되는 행위</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading2}>제4장 기타</h2>

        <h3 className={styles.heading3}>제8조 (저작권의 귀속 및 이용제한)</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속됩니다.
          </li>
          <li className={styles.listItem}>
            이용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
          </li>
        </ol>

        <h3 className={styles.heading3}>제9조 (분쟁해결)</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            서비스 이용과 관련하여 회사와 이용자 간에 분쟁이 발생한 경우, 양 당사자간의 협의를 통해 해결하도록 합니다.
          </li>
          <li className={styles.listItem}>
            본 약관은 대한민국 법령에 의하여 규정되고 이행됩니다.
          </li>
        </ol>
      </div>

      <div className={styles.footer}>
        <p>시행일자: 2025년 2월 14일</p>
        <p>대표자: 이진동</p>
      </div>
    </div>
  )
}

export default Terms