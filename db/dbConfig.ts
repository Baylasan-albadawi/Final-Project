import { DataSource } from "typeorm";
import { Shop } from "./entities/Shop.js";
import { Product } from "./entities/Product.js";
import { Hotline } from "./entities/Hotline.js";
import { Category } from "./entities/Category.js";

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ecommerce-db",
    synchronize: true,
    logging: false,
    entities: [Shop, Product, Hotline, Category]
})

export default dataSource;