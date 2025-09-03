// auth.d.ts
declare module '#auth-utils' {
  interface User {
    fullname?: string;
    firstname?: string;
    lastname?: string;
    initials?: string;
    login?: string;
    mail?: string;
    department?: string;
    jobTitle?: string;
    telephoneNumber: ?string;
  }
}

export {};
