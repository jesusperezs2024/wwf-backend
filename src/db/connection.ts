import "reflect-metadata";
import { DataSource } from "typeorm";  
import { Payment } from "../models/Payment";
import { BannerContent } from "../models/BannerContent";
import { Cards } from "../models/Cards";
import { Category } from "../models/Category";
import { Checkout } from "../models/Checkout";
import { Content } from "../models/Content";
import { Coupons } from "../models/Coupons";
import { FAQ } from "../models/FAQ";
import { HorizontalCard } from "../models/HorizontalCard";
import { Items } from "../models/Items";
import { LargeItems } from "../models/LargeItems";
import { LinkCheckout } from "../models/LinkCheckout";
import { LinkFooter } from "../models/LinkFooter";
import { Products } from "../models/Products";
import { ProductsAmounts } from "../models/ProductsAmounts";
import { ProductsGeneral } from "../models/ProductsGeneral"; 
import { SectionBanner } from "../models/SectionBanner";
import { SectionCards } from "../models/SectionCards";
import { SectionFAQ } from "../models/SectionFAQ";
import { SectionHorizontalCard } from "../models/SectionHorizontalCard";
import { SectionInformation } from "../models/SectionInformation";
import { SectionItems } from "../models/SectionItems";
import { SectionLargeItems } from "../models/SectionLargeItems";
import { Sell } from "../models/Sell";
import { SellDescriptionProduct } from "../models/SellDescriptionProduct";
import { ShortUrl } from "../models/ShortUrl";
import { SocialMedia } from "../models/SocialMedia";
import { Source } from "../models/Source";
import { Tabs } from "../models/Tabs";
import { TabsCards } from "../models/TabsCards";
import { TabsSectionCards } from "../models/TabsSectionCards";
import { Testimony } from "../models/Testimony";
import { TestimonySection } from "../models/TestimonySection"; 
import { Species } from "../models/Species";
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql", // Tipo de base de datos
  host: process.env.DB_HOST || 'localhost', // Host de la base de datos
  port: parseInt(process.env.DB_PORT || '3306'), // Puerto de MySQL
  username: process.env.DB_USERNAME || process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  database: process.env.DB_DATABASE, // Nombre de la base de datos
  synchronize: true, // True para sincronizar entidades con la base de datos automáticamente (desactivar en producción)
  logging: false, // Muestra logs de las consultas
  entities: [
    Payment,
    BannerContent,
    Cards,
    Category,
    Checkout,
    Content,
    Coupons,
    FAQ,
    HorizontalCard,
    Items,
    LargeItems,
    LinkCheckout,
    LinkFooter,
    Products,
    ProductsAmounts,
    ProductsGeneral,
    SectionBanner,
    SectionCards,
    SectionFAQ,
    SectionHorizontalCard,
    SectionInformation,
    SectionItems,
    SectionLargeItems,
    Sell,
    SellDescriptionProduct,
    ShortUrl,
    SocialMedia,
    Source,
    Tabs,
    TabsCards,
    TabsSectionCards,
    Testimony,
    TestimonySection,
    Species
  ],
  extra: {
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true
  }, 
  migrations: ["src/migrations/*.ts"], // Ruta de las migraciones
  subscribers: ["src/subscribers/*.ts"], // Ruta de los suscriptores (opcional)

});

export default AppDataSource