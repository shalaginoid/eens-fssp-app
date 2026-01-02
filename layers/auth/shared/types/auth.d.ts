// auth.d.ts
declare module '#auth-utils' {
  interface User {
    fullname?: string;
    shortname?: string;
    login?: string;
    mail?: string;
    department?: string;
    jobTitle?: string;
    status?: string;
    photo?: string;
  }
}

export {};
