import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name:"user"})
export class UserEntity extends BaseEntity{
    @Column({length:90})
    name!: string; //@db.VarChar(90)
    @Column({length:90})
    lastname!: string; //@db.VarChar(90)
    @Column({length:100})
    email!: string; //@unique @db.VarChar(100)
    @Column({length:90})
    phone!: string; //@db.VarChar(90)
    @Column({nullable: true})
    image!: string; //@db.VarChar(255)
    @Column({length:90})
    password!: string; //@db.VarChar(90)
}