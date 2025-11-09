// auth.d.ts
declare module '#auth-utils' {
  interface User {
    fullname?: string;
    shortname?: string;
    firstname?: string;
    lastname?: string;
    initials?: string;
    login?: string;
    mail?: string;
    department?: string;
    jobTitle?: string;
    telephoneNumber: ?string;
    status: ?string;
  }
}

export {};
