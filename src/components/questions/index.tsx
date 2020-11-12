import React, { useEffect, useState } from "react";
import { questions, forAnswers } from "./questions";
import Form from "./form";
import cn from "classnames";
import styles from "./style.module.css";

import { Arrow } from "../../img/arrow";
import { Checked } from "../../img/checked";

const Questions: React.FC = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [checked, setChecked] = useState(forAnswers);
  const [toForm, setToForm] = useState(false);
  const [openDisc, setOpenDisc] = useState(false);
  const { question, answers, name, type } = questions[questionNumber];
  const valueAnswer: string[] | string = checked[questionNumber].value;

  const toFurther = () => {
    setTimeout(() => {
      if (questionNumber + 1 < questions.length) {
        setQuestionNumber(questionNumber + 1);
      } else setToForm(true);
    }, 500);
  };

  const toBack = () => {
    const number =
      questionNumber - 1 >= 0 ? questionNumber - 1 : questionNumber;
    setQuestionNumber(number);
  };

  const getChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (type === "radio") {
      const forChecked = checked.map((item) => {
        if (item.name === name) {
          return { ...item, value };
        }
        return item;
      });
      setChecked(forChecked as []);
      toFurther();
    }

    if (type === "checkbox") {
      const forChecked = checked.map((item) => {
        if (item.name === name && typeof item.value === "object") {
          const checkbox = item.value;
          let check = NaN;
          checkbox.filter((ch, i) => {
            if (ch === value) {
              check = i;
            }
          });
          isNaN(check) ? checkbox.push(value) : delete checkbox[check];
          return { ...item, value: checkbox };
        }
        return item;
      });

      setChecked(forChecked as []);
    }
  };

  const isChecked = (item: string, type: string) => {
    if (type === "radio") {
      return valueAnswer === item;
    }

    if (type === "checkbox" && typeof valueAnswer === "object") {
      return (
        valueAnswer.filter((val) => (val === item ? true : false)).length > 0
      );
    }
  };

  useEffect(() => {
    getProgress();
    getDiscount();
  });

  const getProgress = () => {
    const progress = (100 / questions.length) * questionNumber;
    return Math.round(progress);
  };

  const getDiscount = () => {
    const discount = (15 / questions.length) * questionNumber;
    return Math.round(discount);
  };

  const questionsRender = () => (
    <>
      <div className={styles.questionWrapper}>
        <h2 className={styles.question}>{question}</h2>

        {type === "checkbox" && (
          <span className={styles.info}>
            <span className={styles.checkSvg}>
              <Checked />
            </span>
            выберите один или несколько
          </span>
        )}
        <div className={styles.answersWrapper}>
          {answers.map((item) => (
            <React.Fragment key={item}>
              <input
                className={styles.input}
                name={name}
                id={item}
                type={type}
                value={item}
                onChange={getChecked}
                checked={isChecked(item, type)}
              />
              <label className={styles.label} htmlFor={item}>
                {item}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.progressCont}>
          <span className={styles.progressText}>
            Готово: <span className={styles.proc}>{`${getProgress()} %`}</span>
          </span>
          <div className={styles.progressWrapper}>
            <div
              className={styles.progress}
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        <button className={styles.btnBack} onClick={toBack}>
          <span className={styles.backSvg}>
            <Arrow />
          </span>
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={toFurther}
          disabled={Boolean(!valueAnswer || valueAnswer.length === 0)}
        >
          Далее
          <span className={styles.nextSvg}>
            <Arrow />
          </span>
        </button>
      </div>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {!toForm ? (
          <div className={styles.questionContainer}>
            <div className={styles.wrapCont}> {questionsRender()}</div>
            <div className={styles.discount}>
              <div
                className={cn(
                  {
                    [styles.openMiniDisc]: openDisc,
                  },
                  styles.mobileDisc
                )}
                onClick={() => setOpenDisc(!openDisc)}
              >
                <span
                  className={styles.discountProc}
                >{`${getDiscount()} %`}</span>
              </div>
              <div
                className={cn(
                  {
                    [styles.openDisc]: openDisc,
                  },
                  styles.discountBlock
                )}
                onClick={() => setOpenDisc(!openDisc)}
              >
                Ваша скидка:
                <span
                  className={styles.discountProc}
                >{`${getDiscount()} %`}</span>
              </div>
            </div>
          </div>
        ) : (
          <Form checked={checked} />
        )}
      </div>
    </div>
  );
};

export default Questions;
