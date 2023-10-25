export type User = {
  _id: string,
  username: string,
  email: string,
  fullname: string,
  autoresponder: {
    isActive: boolean,
    createdOn: Date | string
  }
}

type ServerConfig = {
  hostname: string,
  port: number,
  email: string,
  password: string,
  security: "tls" | "ssl" | "unsecure"
}

export type MailServer = {
  _id: string,
  name: string
  addedOn: Date,
  lastModified: Date,
  userId: string,
  imapDetails: ServerConfig,
  smtpDetails: ServerConfig
}
