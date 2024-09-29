const express = require("express");
const { Faker, en, fr, pl } = require("@faker-js/faker");
const cors = require("cors");

const app = express();

// Настройка CORS
// app.use(
//   cors({
//     origin: true,
//     methods: "GET,POST",
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

// app.options("*", cors());

app.use(express.json());

// Маршрут для корневого URL
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Маршрут для генерации данных
app.post("/api/generate-data", (req, res) => {
  const { region, seed, errors, existingItems } = req.body;

  const localeMap = {
    en: en,
    fr: fr,
    pl: pl,
  };

  const selectedLocale = localeMap[region] || en;
  const fakerInstance = new Faker({
    locale: [selectedLocale, en],
  });

  fakerInstance.seed(parseInt(seed) || 0);

  const data = existingItems ? [...existingItems] : [];

  for (let i = existingItems ? existingItems.length : 0; i < 20; i++) {
    const id = fakerInstance.string.uuid();
    let name = fakerInstance.person.fullName();
    const addressFormats = [
      () => fakerInstance.location.streetAddress(),
      () =>
        `${fakerInstance.location.city()}, ${fakerInstance.location.streetAddress()}, ${fakerInstance.location.state()}`,
      () =>
        `${fakerInstance.location.country()}, ${fakerInstance.location.city()}, ${fakerInstance.location.streetAddress()}`,
      () => fakerInstance.location.secondaryAddress(),
      () =>
        `${fakerInstance.location.county()}, ${fakerInstance.location.street()}, ${fakerInstance.location.buildingNumber()}`,
    ];
    const addressFormat = fakerInstance.helpers.arrayElement(addressFormats);
    let address = addressFormat();
    const phoneFormats = [
      () => fakerInstance.phone.number(),
      () => fakerInstance.phone.number("###-###-####"),
      () => fakerInstance.phone.number("+## (#) ###-##-##"),
      () => fakerInstance.phone.number("0#########"),
      () => fakerInstance.phone.number("(+##) #########"),
    ];
    const phoneFormat = fakerInstance.helpers.arrayElement(phoneFormats);
    let phone = phoneFormat();

    name = introduceErrors(name, errors, fakerInstance, region);
    address = introduceErrors(address, errors, fakerInstance, region);
    phone = introduceErrors(phone, errors, fakerInstance, region);

    data.push({ id, name, address, phone });
  }

  const updatedData = data.map((item) => {
    let name = fakerInstance.person.fullName();
    const addressFormats = [
      () => fakerInstance.location.streetAddress(),
      () =>
        `${fakerInstance.location.city()}, ${fakerInstance.location.streetAddress()}, ${fakerInstance.location.state()}`,
      () =>
        `${fakerInstance.location.country()}, ${fakerInstance.location.city()}, ${fakerInstance.location.streetAddress()}`,
      () => fakerInstance.location.secondaryAddress(),
      () =>
        `${fakerInstance.location.county()}, ${fakerInstance.location.street()}, ${fakerInstance.location.buildingNumber()}`,
    ];
    const addressFormat = fakerInstance.helpers.arrayElement(addressFormats);
    let address = addressFormat();
    const phoneFormats = [
      () => fakerInstance.phone.number(),
      () => fakerInstance.phone.number("###-###-####"),
      () => fakerInstance.phone.number("+## (#) ###-##-##"),
      () => fakerInstance.phone.number("0#########"),
      () => fakerInstance.phone.number("(+##) #########"),
    ];
    const phoneFormat = fakerInstance.helpers.arrayElement(phoneFormats);
    let phone = phoneFormat();

    name = introduceErrors(name, errors, fakerInstance, region);
    address = introduceErrors(address, errors, fakerInstance, region);
    phone = introduceErrors(phone, errors, fakerInstance, region);

    return { ...item, name, address, phone };
  });

  res.json(updatedData);
});

// Функция для внесения ошибок
const introduceErrors = (data, errorCount, fakerInstance, region) => {
  const errorTypes = ["delete", "add", "swap"];
  let newData = data;

  const integerErrors = Math.floor(errorCount);
  const fractionalPart = errorCount - integerErrors;

  for (let i = 0; i < integerErrors; i++) {
    newData = applyRandomError(newData, errorTypes, fakerInstance, region);
  }

  if (
    fractionalPart > 0 &&
    fakerInstance.number.float({ min: 0, max: 1 }) < fractionalPart
  ) {
    newData = applyRandomError(newData, errorTypes, fakerInstance, region);
  }

  return newData;
};

// Применение случайной ошибки
const applyRandomError = (data, errorTypes, fakerInstance, region) => {
  const errorType = fakerInstance.helpers.arrayElement(errorTypes);
  const pos = fakerInstance.number.int({
    min: 0,
    max: Math.max(data.length - 1, 0),
  });

  const alphabets = {
    en: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    pl: "aąbcćdeęfghijklłmnńoóprsśtuwyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ",
    fr: "abcdefghijklmnopqrstuvwxyzàâçéèêëîïôûùüÿñæœABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ",
  };
  const alphabet = alphabets[region] || alphabets.en;

  switch (errorType) {
    case "delete": {
      if (data.length > 0) {
        data = data.slice(0, pos) + data.slice(pos + 1);
      }
      break;
    }
    case "add": {
      const randomChar = fakerInstance.helpers.arrayElement(
        (alphabet + "0123456789").split("")
      );
      data = data.slice(0, pos) + randomChar + data.slice(pos);
      break;
    }
    case "swap": {
      if (pos < data.length - 1) {
        data =
          data.slice(0, pos) + data[pos + 1] + data[pos] + data.slice(pos + 2);
      }
      break;
    }
    default:
      break;
  }
  return data;
};

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
