import Joi from "joi";

export const configSchema = Joi.object({
  chainhook: Joi.object({
    url: Joi.string().uri().required(),
    network: Joi.string().valid("mainnet", "testnet").required()
  }),
  governance: Joi.object({
    address: Joi.string().required()
  }),
  monitor: Joi.object({
    pollInterval: Joi.number().min(5).default(15),
    outputMode: Joi.string().valid("console", "webhook").default("console")
  }),
  alert: Joi.object({
    discordWebhook: Joi.string().uri().allow(""),
    telegram: Joi.object({
      botToken: Joi.string().allow(""),
      chatId: Joi.string().allow("")
    })
  })
});
