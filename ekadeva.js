// Import Packages
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const localtunnel = require("localtunnel");
const stopwatch = require("timer-stopwatch");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Path to .env file
const envFilePath = path.join(__dirname, ".env");

let displayRealTime = false; // Track if option 5 is active

// Prompt user for values to create .env file if it doesn’t exist
const promptForEnvValues = () => {
  const defaultValues = {
    CUSTOM_DOMAIN: "substoekadevaonyt",
    CURRENT_TIME: "10000",
    ADD_TIME_PER_THOUSAND: "60",
  };

  let envContent = `PORT=6969\n`; // Default port

  const askForValue = (key) => {
    return new Promise((resolve) => {
      rl.question(
        `Silahkan masukkan nilai untuk ${key} (default: ${defaultValues[key]}): `,
        (answer) => {
          envContent += `${key}=${answer || defaultValues[key]}\n`;
          resolve();
        }
      );
    });
  };

  const configureEnvFile = async () => {
    console.log("File konfigrasi tidak ditemukan. Silahkan setting file konfigurasi berikut terlebih dahulu :");

    await askForValue("CUSTOM_DOMAIN");
    await askForValue("CURRENT_TIME");
    await askForValue("ADD_TIME_PER_THOUSAND");

    fs.writeFileSync(envFilePath, envContent, { encoding: "utf8" });
    console.log("File konfigurasi telah dibuat silahkan restart aplikasi.\n");
    rl.close();
    process.exit(0);
  };

  configureEnvFile();
};

// Function to update .env file with a new value for a specific variable
const updateEnvVariable = (variable, newValue) => {
  const envData = fs.readFileSync(envFilePath, "utf8");
  const updatedData = envData.replace(
    new RegExp(`^${variable}=.*`, "m"),
    `${variable}=${newValue}`
  );
  fs.writeFileSync(envFilePath, updatedData, "utf8");
};

// Prompt user to edit .env variables
const editVariable = (variable) => {
    console.clear();
  rl.question(`Masukkan nilai baru untuk ${variable}: `, (newValue) => {
    updateEnvVariable(variable, newValue);
    console.log("Tolong restart aplikasi setelah mengedit");
    askForMenuConfirmation();
  });
};

// Option 4: Run timer and start the server
const runTimerAndServer = async () => {
  console.clear();
  const sawer_time = parseInt(process.env.ADD_TIME_PER_THOUSAND);
  const insert_time = parseInt(process.env.CURRENT_TIME) * 1000;
  const options = { refreshRateMS: 1000 };
  const timer = new stopwatch(insert_time, options);
  timer.start();

  timer.onTime((time) => {
    const hours = String(Math.floor(timer.ms / (1000 * 60 * 60))).padStart(
      2,
      "0"
    );
    const minutes = String(
      Math.floor((timer.ms % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const seconds = String(
      Math.floor((timer.ms % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    const countdown = `${hours} : ${minutes} : ${seconds}`;
    fs.writeFile("clock.txt", countdown, (error) => {
      if (error) throw error;
    });

    updateEnvVariable("CURRENT_TIME", timer.ms.toString() / 1000);

    // Show real-time data if option 5 is active
    if (displayRealTime) {
      console.clear();
      console.log("Real-time Console Output (Close/(Ctrl+C) Aplikasi untuk stop timer dan server)");
      console.log(`Timer Countdown: ${countdown}`);
    }
  });

  const app = express();
  const PORT = process.env.PORT || 6969;
  app.use(express.json());

  app.get("/", (req, res) => {
    res.redirect("https://youtube.com/@ekadeva");
  });

  app.post("/", (req, res) => {
    res.status(200).send({
        message: `Aplikasi berjalan dengan sempurna,
        script dibuat oleh Eka Deva di YT. 
        Please forget it hehehe.`,
      });

    const {
      donator_name,
      gifterName,
      supporter_name,
      supporter,
      amount_raw,
      price,
      amount,
      amount_settled,
    } = req.body;
    const donorName = donator_name || gifterName || supporter_name || supporter;
    var donationAmount = amount_raw || price || amount || amount_settled;
    if (amount && amount_settled && amount !== amount_settled) {
      donationAmount = amount_settled;
    } else {
      donationAmount = amount_raw || price || amount;
    }
    const platform = donator_name
      ? "Saweria"
      : gifterName
      ? "Tako"
      : supporter_name
      ? "Trakteer"
      : "Sociabuzz";

    const donateTime = Math.floor(donationAmount / 1000) * sawer_time;
    console.log(
      `Donate ${donationAmount} from ${donorName} on ${platform} | Added ${donateTime} seconds`
    );

    timer.reset(timer.ms + donateTime * 1000);
    timer.start();

    // Show donation in real-time console
    if (displayRealTime) {
      console.log(
        `Donate ${donationAmount} from ${donorName} on ${platform} | Added ${donateTime} seconds`
      );
    }
  });

  app.listen(PORT, () => {
    console.log(`Aplikasi express berjalan di localhost: http://localhost:${PORT}`);
  });

  const tunnel = await localtunnel({
    port: PORT,
    subdomain: process.env.CUSTOM_DOMAIN,
  });
  console.log(`Alamat URL untuk Webhookmu adalah ${tunnel.url}`);
  tunnel.on("close", () => {});

  askForMenuConfirmation();
};

// Enable real-time console view
const enableRealTimeConsole = () => {
  displayRealTime = true;
  console.log("Real-time console output diaktifkan.");
  askForMenuConfirmation();
};

// Main program menu
const runProgram = () => {
  console.clear();
  console.log("\n Silahkan pilih Angka di bawah ini:");
  console.log("1. Edit URL Webhook");
  console.log("2. Edit Target Waktu (Dalam detik)");
  console.log("3. Edit Tambah Waktu per Rp.1000 (Dalam detik)");
  console.log("4. Jalankan Timer dan Aplikasi");
  console.log("5. Tampilkan Timer (Aktifkan no.4 dahulu, dan akan stuck di sini)");
  console.log("0. Keluar");

  rl.question("Masukkan nomor pilihan anda (lalu enter): ", (answer) => {
    switch (answer) {
      case "1":
        editVariable("CUSTOM_DOMAIN");
        break;
      case "2":
        editVariable("CURRENT_TIME");
        break;
      case "3":
        editVariable("ADD_TIME_PER_THOUSAND");
        break;
      case "4":
        runTimerAndServer();
        break;
      case "5":
        enableRealTimeConsole();
        break;
      case "0":
        rl.close();
        process.exit(0);
      default:
        console.clear();
        console.log("Input salah, silahkan coba lagi.");
        runProgram();
        break;
    }
  });
};

// Confirmation prompt to return to the menu
const askForMenuConfirmation = () => {
  rl.question("\nTekan Enter untuk kembali ke menu...\n", () => {
    runProgram();
  });
};

// Initialize and start the program
if (!fs.existsSync(envFilePath)) {
  promptForEnvValues();
} else {
  runProgram();
}
