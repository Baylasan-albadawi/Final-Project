import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Shop } from "./Shop.js";
import { Category } from "./Category.js";

@Entity("product")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({length: 255})
    price: string;

    @ManyToOne(()=>Shop, shop=>shop.shops)
    shops: Partial<Shop>

    @ManyToMany(() => Category, category => category.products)
    @JoinTable({
        name: "product-category",
        joinColumn: {
            name: "productId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "categoryNo",
            referencedColumnName: "id"
        }
    })
    categoies: Partial<Category[]>;


}