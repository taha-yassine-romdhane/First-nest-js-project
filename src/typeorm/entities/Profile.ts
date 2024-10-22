import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user_profile'})
export class Profile  {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({ unique: true })
    firstName: string;
    
    @Column()
    lastName: string;

    @Column({nullable: true})
    age: number;

    @Column()
    job: string;
}