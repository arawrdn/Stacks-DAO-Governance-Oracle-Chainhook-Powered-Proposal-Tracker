import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { configSchema } from "./config/schema.js";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const jsonPath = path.join(process.cwd(), "src/config", `${env}.json`);
const fileConfig = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, "utf-8")) : {};

const config = {
  ...fileConfig,
  chainhook: {
    url: process.env.CHAINHOOK_URL || fileConfig.chainhook?.url,
    network: process.env.CHAINHOOK_NETWORK || fileConfig.chainhook?.network
  },
  governance: {
    address: process.env.DAO_GOVERNANCE_ADDRESS || fileConfig.governance?.address
  },
  monitor: {
    pollInterval: Number(process.env.POLL_INTERVAL) || fileConfig.monitor?.pollInterval,
    outputMode: process.env.OUTPUT_MODE || fileConfig.monitor?.outputMode
  },
  alert: {
    discordWebhook: process.env.DISCORD_WEBHOOK_URL || fileConfig.alert?.discordWebhook,
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN || fileConfig.alert?.telegram.botToken,
      chatId: process.env.TELEGRAM_CHAT_ID || fileConfig.alert?.telegram.chatId
    }
  }
};

const { value, error } = configSchema.validate(config);
if (error) throw new Error(`Config validation error: ${error.message}`);

export default value;
