import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'user_posts'})
export class Post {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({ unique: true })
    title: string;
    
    @Column()
    description: string;

    @ManyToOne(() => User , (user) => user.posts )
    user: User;
}