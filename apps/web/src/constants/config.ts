export const IS_DEV = true

export const ONEID_MESSAGE = 'OneID | Your Universal Identity in the Digital World'

const ENVs = {
  DEV: {
    PISCALE_APP_ID: '2e0gjsomg3n',
    BOT_ID: '8938892095947353',
    CHAT_END_POINT: 'https://superwallet-chat-api-stg.coin98.tech/',
    MQTT_DOMAIN: 'superwallet-stg-iot.coin98.dev',
    MQTT_AUTHORIZE: 'superwallet-stg'
  },
  PROD: {
    PISCALE_APP_ID: '2e0k928kuhi',
    BOT_ID: '8939098254377489',
    CHAT_END_POINT: 'https://superwallet-chat-api.coin98.tech',
    MQTT_DOMAIN: 'superwallet-iot.coin98.tech',
    MQTT_AUTHORIZE: 'superwallet-prd'
  }
}

const ENV = IS_DEV ? ENVs.DEV : ENVs.PROD

export const { PISCALE_APP_ID, BOT_ID, CHAT_END_POINT, MQTT_DOMAIN, MQTT_AUTHORIZE } = ENV

export const PERSONAL_SIGN_CHALLENGE = 'Welcome to Coin98 Chat Service. Please sign this message to authenticate.'

export const MQTT_END_POINT = `wss://${MQTT_DOMAIN}/mqtt?x-amz-customauthorizer-name=${MQTT_AUTHORIZE}`

//Test server;
//'wss://a232wgcz1uajvt-ats.iot.ap-southeast-1.amazonaws.com/mqtt?x-amz-customauthorizer-name=PublicAuthorizerWillDelete'
