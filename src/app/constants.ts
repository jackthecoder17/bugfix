export const routes = {
    MAIL_SERVERS: "/mail-servers",
    NEW_MAIL_SERVER: "/mail-servers/new",
    WARM_UPS: "/warm-ups",
    NEW_WARM_UP: "/warm-ups/new",
    EMAIL_LISTS: "/email-lists",
    SETTINGS: "/settings"
}


export const sampleWarmups = [
  {
    _id: "wwlkwk",
    no: "01",
    name: "Neww1",
    status: "draft",
    day: 0,
    spamEmail: 0,
    sentEmail: 0
  },
  {
    _id: "asdkfjasdf",
    no: "02",
    name: "warmup 2",
    status: "Sent 15 Aug, 8:30PM",
    day: 0,
    spamEmail: 0,
    sentEmail: 200
  },
]


export const sampleMailServers = [
  {
    _id: "wwlkwk",
    no: "01",
    name: "Neww1",
    email: "anwar359**@gmail.com",
    day: 5,
    reputation: 70,
    bounceRate: 15,
    spamRate: 2
  },
  {
    _id: "asdkfjasdf",
    no: "02",
    name: "New mail service2",
    email: "sadiq65**@gmail.com",
    day: 8,
    reputation: 60,
    bounceRate: 20,
    spamRate: 2
  },
  {
    _id: "aklsdfnsdmf",
    no: "03",
    name: "Mail man mail service",
    email: "mailman232@yahoo.com",
    day: 20,
    reputation: 80,
    bounceRate: 10,
    spamRate: 1
  },
]
