import React, { useState, ChangeEvent } from "react";
import styles from "./style.module.css";
import isEmail from "validator/lib/isEmail";
import cn from "classnames";
import InputMask from "react-input-mask";

import { Person } from "./../../../img/person";
import { Phone } from "./../../../img/phone";
import { City } from "./../../../img/city";
import { Email } from "./../../../img/email";
import { Error } from "./../../../img/error";
import { Sbm } from "./../../../img/sbm";

interface Answers {
  name: string;
  value: string[] | string;
}

interface Props {
  checked: Answers[];
}

const Form: React.FC<Props> = ({ checked }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [goodResp, setGoodResp] = useState(false);
  const [error, setError] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    err: "",
  });

  const getName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
    setError({ ...error, name: "", err: "" });
  };

  const getEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setError({ ...error, email: "", err: "" });
  };

  const getPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
    setError({ ...error, phone: "", err: "" });
  };

  const getCity = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCity(value);
    setError({ ...error, city: "", err: "" });
  };

  const validInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if ((name === "email" && !isEmail(value)) || value === "") {
      setError({ ...error, email: name });
    }
    if (name === "name" && value === "") {
      setError({ ...error, name: name });
    }
    if ((name === "phone" && value === "") || value.includes(" ")) {
      setError({ ...error, phone: name });
    }
    if (name === "city" && value === "") {
      setError({ ...error, city: name });
    }
  };

  const submitForm = async () => {
    if (
      name === "" ||
      city === "" ||
      phone === "" ||
      email === "" ||
      !isEmail(email) ||
      phone.includes(" ")
    ) {
      setError({ ...error, err: "Заполните все нужные поля" });
      return null;
    }

    let formData = new FormData();
    checked.map((item) => {
      formData.append(item.name, String(item.value));
    });

    formData.append("name", name);
    formData.append("city", city);
    formData.append("phone_number", phone);
    formData.append("email", email);

    let requestOptions = {
      method: "POST",
      body: formData,
    };

    let response = await fetch(
      `https://api.fl-bankrotstvo.ru/onepage/new_quiz/`,
      requestOptions
    );

    if (response.ok) {
      setGoodResp(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      {!goodResp ? (
        <>
          <h2 className={styles.title}>Заполните форму контакта</h2>
          <div className={styles.container}>
            <div className={styles.disount}>
              Ваша скидка:
              <div className={styles.proc}>15 %</div>
            </div>
            <div className={styles.field}>
              <label
                className={cn(styles.label, {
                  [styles.error]: error.name === "name",
                })}
              >
                Введите имя
              </label>
              <div
                className={cn(styles.control, {
                  [styles.error]: error.name === "name",
                })}
              >
                <span className={styles.imgWrapper}>
                  <Person />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  className={styles.input}
                  value={name}
                  onChange={getName}
                  onBlur={validInput}
                />

                <span className={styles.errorIcon}>
                  {error.name === "name" && <Error />}
                </span>
              </div>
            </div>

            <div className={styles.field}>
              <label
                className={cn(styles.label, {
                  [styles.error]: error.email === "email",
                })}
              >
                ВВЕДИТЕ EMAIL
              </label>
              <div
                className={cn(styles.control, {
                  [styles.error]: error.email === "email",
                })}
              >
                <span className={styles.imgWrapper}>
                  <Email />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                  value={email}
                  onChange={getEmail}
                  onBlur={validInput}
                />

                <span
                  className={cn(styles.errorIcon, {
                    [styles.error]: error.email === "email",
                  })}
                >
                  {error.email === "email" && <Error />}
                </span>
              </div>
            </div>

            <div className={styles.field}>
              <label
                className={cn(styles.label, {
                  [styles.error]: error.phone === "phone",
                })}
              >
                ВВЕДИТЕ ТЕЛЕФОН
              </label>
              <div
                className={cn(styles.control, {
                  [styles.error]: error.phone === "phone",
                })}
              >
                <span className={styles.imgWrapper}>
                  <Phone />
                </span>
                <InputMask
                  maskChar=" "
                  mask="+7(999)-999-99-99"
                  type="tel"
                  name="phone"
                  placeholder="Введите номер"
                  className={styles.input}
                  value={phone}
                  onChange={getPhone}
                  onBlur={validInput}
                />

                <span className={styles.errorIcon}>
                  {error.phone === "phone" && <Error />}
                </span>
              </div>
            </div>

            <div className={styles.field}>
              <label
                className={cn(styles.label, {
                  [styles.error]: error.city === "city",
                })}
              >
                Откуда Вы к нам обращаетесь?
              </label>
              <div
                className={cn(styles.control, {
                  [styles.error]: error.city === "city",
                })}
              >
                <span className={styles.imgWrapper}>
                  <City />
                </span>
                <input
                  type="text"
                  name="city"
                  placeholder="Город"
                  className={styles.input}
                  value={city}
                  onChange={getCity}
                  onBlur={validInput}
                />

                <span className={styles.errorIcon}>
                  {error.city === "city" && <Error />}
                </span>
              </div>
            </div>

            <button className={styles.btn} type="button" onClick={submitForm}>
              <span className={styles.imgSbm}>
                <Sbm />
              </span>
              Получить результаты теста
            </button>
            <div className={styles.err}>{error.err}</div>
          </div>
        </>
      ) : (
        <>
          <h2
            className={styles.title}
          >{`${name}, спасибо, что прошли наш тест! `}</h2>
          <p className={styles.text}>
            Прямо сейчас наши юристы определяют Ваше соответствие положениям
            Федерального закона от 26.10.2002 №127-ФЗ «О несостоятельности
            (банкротстве)». Мы свяжемся с Вами в ближайшее время по номеру телефона, указанному в анкете и сообщим результат!
          </p>
          <div className={styles.line} />
          <a href="https://fl-bankrotstvo.ru/" className={styles.logo} />
        </>
      )}
    </div>
  );
};

export default Form;
