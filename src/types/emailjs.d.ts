declare module '@emailjs/browser' {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  interface SendFormParameters {
    serviceID: string;
    templateID: string;
    form: HTMLFormElement;
    userID: string;
  }

  interface EmailJSStatic {
    init(userID: string): void;
    send(
      serviceID: string,
      templateID: string,
      templateParams: Record<string, unknown>,
      userID: string
    ): Promise<EmailJSResponseStatus>;
    sendForm(
      serviceID: string,
      templateID: string,
      form: HTMLFormElement,
      userID: string
    ): Promise<EmailJSResponseStatus>;
  }

  const emailjs: EmailJSStatic;
  export default emailjs;
}
