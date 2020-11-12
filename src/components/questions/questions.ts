export const questions = [
  {
    id: 1,
    question: "Какая общая сумма задолженности?",
    name: "sum",
    type: "radio",
    answers: [
      "от 300 000 до 700 000 рублей",
      "от 700 000 до 1 500 000 рублей",
      "от 1 500 000 до 3 000 000 рублей",
      "от 3 000 000 рублей",
    ],
  },
  {
    id: 2,
    question: "Есть просрочки по платежам?",
    name: "has_delay",
    type: "radio",
    answers: ["Нет", "Да, менее 3-х месяцев", "Да, более 3-х месяцев"],
  },
  {
    id: 3,
    question: "Сколько составляет ваш официальный доход?",
    name: "income",
    type: "radio",
    answers: [
      "Менее 10 000 рублей",
      "от 10 000 до 20 000 рублей",
      "от 20 000 до 30 000 рублей",
      "более 30 000 рублей",
    ],
  },
  {
    id: 4,
    name: "has_child",
    question: "Имеются несовершеннолетние дети или другие лица на содержании?",
    type: "radio",
    answers: ["Да", "Нет"],
  },
  {
    id: 5,
    question: "Вы состоите в браке?",
    name: "is_marriage",
    type: "radio",
    answers: [
      "Нет, никогда не состоял(а)",
      "Нет, разведен(а) более 3-х лет",
      "Да",
    ],
  },
  {
    id: 6,
    question: "Что имеете в собственности сейчас?",
    name: "property",
    type: "checkbox",
    answers: [
      "Единственное жилье",
      "Гараж, парковочное место",
      "Жилой дом",
      "Земельный участок",
      "Коммерческая недвижимость",
      "Доля в бизнесе",
      "Автомобиль",
      "Иное имущество/права требования",
      "Ничего нет",
    ],
  },
  {
    id: 7,
    name: "own_per_marriage",
    question: "Было ли что-то из ранее упомянутого приобретено в период брака?",
    type: "radio",
    answers: ["Да", "Нет"],
  },
  {
    id: 8,
    name: "property_transaction",
    question: "Вы совершали сделки с имуществом в течение последних трех лет?",
    type: "radio",
    answers: ["Да", "Нет"],
  },
  {
    id: 9,
    name: "pledge",
    question: "Имеется ипотека или залог?",
    type: "radio",
    answers: ["Да", "Нет"],
  },
];

interface Answers {
  name: string;
  value: string[] | string;
}

export const forAnswers = [
  { name: "sum", value: "" },
  { name: "has_delay", value: "" },
  { name: "income", value: "" },
  { name: "has_child", value: "" },
  { name: "is_marriage", value: "" },
  { name: "property", value: [] },
  { name: "own_per_marriage", value: "" },
  { name: "property_transaction", value: "" },
  { name: "pledge", value: "" },
] as Answers[];
