declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpConfig {
    apiKey?: string;
    server?: string;
  }

  interface ListMember {
    email_address: string;
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  }

  interface Lists {
    addListMember(listId: string, member: ListMember): Promise<unknown>;
  }

  interface Mailchimp {
    setConfig(config: MailchimpConfig): void;
    lists: Lists;
  }

  const mailchimp: Mailchimp;
  export = mailchimp;
}