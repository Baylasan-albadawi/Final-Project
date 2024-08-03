import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./Shop.js";

@Entity("hotline")
export class Hotline extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 255})
    hotlineNumber: string;

    @OneToOne(() => Shop, shop => shop.hotline)
    @JoinColumn(
        {
            name: "hotline",
            referencedColumnName: "id"
        }
    )
    shop: Partial<Shop>
}
