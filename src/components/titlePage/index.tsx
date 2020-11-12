import React from "react";
import styles from "./style.module.css";

interface Props {
  toQuestions: () => void;
}

const TitlePage: React.FC<Props> = ({ toQuestions }) => {
  return (
    <div className={styles.wrapper}>
      <a href="https://fl-bankrotstvo.ru/" className={styles.logo} />
      <div className={styles.line} />
      <h1 className={styles.headerTitle}>Нужна помощь в списании долгов?</h1>
      <span className={styles.text}>
        Узнайте возможность и стоимость процедуры вашего банкротства, пройдя
        короткий тест:
      </span>
      <button className={styles.btn} onClick={toQuestions}>
        УЗНАТЬ СТОИМОСТЬ
      </button>
      <span className={styles.info}>
        Нажав кнопку "Узнать стоимость", Вы соглашаетесь на обработку
        Персональных данных, в т.ч. выражаете согласие на совершение звонка на
        ваш мобильный номер телефона, либо получение СМС с информацией в
        соответствии с ФЗ "О связи" от 07.07.2003 N 126-ФЗ. Вы можете позже
        отозвать такое согласие.
        <span> </span>
        <a
          className={styles.link}
          href="https://drive.google.com/file/d/1AmdgMWgL4DzmqWDp48YItlYEo0ynUf42/view"
        >
          Политика конфиденциальности
        </a>
      </span>
    </div>
  );
};

export default TitlePage;
