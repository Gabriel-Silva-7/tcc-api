const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/index");
const cron = require("node-cron");
const sequelize = require("./src/config/db");
const { QueryTypes } = require("sequelize");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// cron.schedule("*/2 * * * *", async () => {
//   try {
//     const res = await sequelize.query(
//       `
//       UPDATE Locker
//       SET Status = 0
//       WHERE CURRENT_TIMESTAMP > DATEADD(MINUTE, 2, LastUpdateLockerStatus) AND LastUpdateLockerStatus is null
//       AND Status = 1
//     `,
//       {
//         type: QueryTypes.UPDATE,
//       }
//     );
//     // const res2 = await sequelize.query(
//     //   `
//     //   UPDATE Locker
//     //   SET Status = 0
//     //   WHERE IdLocker IN (
//     //   SELECT IdLocker
//     //     FROM LockerHistorico
//     //     WHERE CURRENT_TIMESTAMP > DATEADD(MINUTE, 2, DataHoraEntrega)
//     //   ) AND status = 1
//     // `,
//     //   {
//     //     type: QueryTypes.UPDATE,
//     //   }
//     // );
//     console.log(`Updated ${res[1]} rows`);
//     // console.log(`Updated ${res2[1]} rows`);
//   } catch (err) {
//     console.error("Error running cron job", err);
//   }
// });
