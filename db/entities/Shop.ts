import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany, OneToOne, JoinColumn } from "typeorm";
import bcrypt from "bcrypt"
import { Product } from "./Product.js";
import { Hotline } from "./Hotline.js";

@Entity("shop")
export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 255})
    shopName: string;

    @Column({length: 255})
    email: string;

    @Column({ length: 255 })
    password: string

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @OneToMany(()=>Product, product=> product.shops)
    shops:Shop

    @OneToOne(() => Shop, shop => shop.hotline)
    @JoinColumn(
        {
            name: "hotline",
            referencedColumnName: "id"
        }
    )
    hotline:Partial<Hotline>
}