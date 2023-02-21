export interface LoginData {
  email: string;
  password: string;
}

export interface REGISTER_FORM_DATA extends LoginData{
  fullName:string;
  passwordConfirm?:string;
  role?:number;
}

export interface HttpRequestData {
  url: string;
  params?: any;
  headers?: any;
  body?: any;
}

export interface User {
  id: number;
  email: string;
}
export interface Profile extends User {
  userId: string;
  fullName: string;
  role: string;
  date: string;
}
export interface RequestData {
  url: string;
  params?: any;
  headers?: any;
  body?: any;
}
export interface ResponseData {
  success: boolean;
  data: any;
  error?: any;
}
