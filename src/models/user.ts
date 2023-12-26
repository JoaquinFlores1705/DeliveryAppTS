export default interface User {
  id: bigint;
  email:string;
  name:string;
  lastname:string;
  phone:string;
  image:string | null;
  password:string;
}