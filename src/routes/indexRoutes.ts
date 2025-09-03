import { Router } from "express";
import { apiKeyAuth, jwtAuth } from "../middleware/auth.middleware";
import { RequestHandler } from "express";

// Importación de todas las rutas
import bannerContentRoutes from "./BannerContentRoutes";
import cardsRoutes from "./CardsRoutes";
import categoryRoutes from "./CategoryRoutes";
import checkoutRoutes from "./CheckoutRoutes";
import contentRoutes from "./ContentRoutes";
import couponsRoutes from "./CouponsRoutes";
import faqRoutes from "./FAQRoutes";
import horizontalCardRoutes from "./HorizontalCardRoutes";
import itemsRoutes from "./ItemsRoutes";
import largeItemsRoutes from "./LargeItemsRoutes";
import linkCheckoutRoutes from "./LinkCheckoutRoutes";
import linkFooterRoutes from "./LinkFooterRoutes";
import paymentRoute from "./PaymentRoute";
import productsAmountsRoutes from "./ProductsAmountsRoutes";
import productsGeneralRoutes from "./ProductsGeneralRoutes";
import productsRoutes from "./ProductsRoutes";
import sectionBannerRoutes from "./SectionBannerRoutes";
import sectionCardsRoutes from "./SectionCardsRoutes";
import sectionFAQRoutes from "./SectionFAQRoutes";
import sectionHorizontalCardRoutes from "./SectionHorizontalCardRoutes";
import sectionInformationRoutes from "./SectionInformationRoutes";
import sectionItemsRoutes from "./SectionItemsRoutes";
import sectionLargeItemsRoutes from "./SectionLargeItemsRoutes";
import sellDescriptionProductRoutes from "./SellDescriptionProductRoutes";
import sellRoutes from "./sellRoutes";
import salesforceRoutes from "./SalesforceRoutes";
import shortUrlRoutes from "./ShortUrlRoutes";
import socialMediaRoutes from "./SocialMediaRoutes";
import sourceRoutes from "./SourceRoutes";
import tabsCardsRoutes from "./TabsCardsRoutes";
import tabsRoutes from "./TabsRoutes";
import tabsSectionCardsRoutes from "./TabsSectionCardsRoutes";
import testimonyRoutes from "./TestimonyRoutes";
import testimonySectionRoutes from "./TestimonySectionRoutes";
import speciesRoutes from "./SpeciesRoutes";

const router = Router();

const jwtAuthHandler = jwtAuth as RequestHandler;
const apiKeyAuthHandler = apiKeyAuth as RequestHandler;

// Rutas protegidas con JWT (para el CMS)
const cmsRoutes = [
  { path: "/cms/banner-content", router: bannerContentRoutes },
  { path: "/cms/card", router: cardsRoutes },
  { path: "/cms/category", router: categoryRoutes },
  { path: "/cms/checkout", router: checkoutRoutes },
  { path: "/cms/content", router: contentRoutes },
  { path: "/cms/faq", router: faqRoutes },
  { path: "/cms/horizontal-card", router: horizontalCardRoutes },
  { path: "/cms/items", router: itemsRoutes },
  { path: "/cms/large-items", router: largeItemsRoutes },
  { path: "/cms/link-checkout", router: linkCheckoutRoutes },
  { path: "/cms/link-footer", router: linkFooterRoutes },
  { path: "/cms/products-amounts", router: productsAmountsRoutes },
  { path: "/cms/products-general", router: productsGeneralRoutes },
  { path: "/cms/products", router: productsRoutes },
  { path: "/cms/section-banner", router: sectionBannerRoutes },
  { path: "/cms/section-cards", router: sectionCardsRoutes },
  { path: "/cms/section-faq", router: sectionFAQRoutes },
  { path: "/cms/section-horizontal-card", router: sectionHorizontalCardRoutes },
  { path: "/cms/section-information", router: sectionInformationRoutes },
  { path: "/cms/section-items", router: sectionItemsRoutes },
  { path: "/cms/section-large-items", router: sectionLargeItemsRoutes },
  {
    path: "/cms/sell-description-product",
    router: sellDescriptionProductRoutes,
  },
  { path: "/cms/sell", router: sellRoutes },
  { path: "/cms/short-url", router: shortUrlRoutes },
  { path: "/cms/social-media", router: socialMediaRoutes },
  { path: "/cms/source", router: sourceRoutes },
  { path: "/cms/tabs-cards", router: tabsCardsRoutes },
  { path: "/cms/tabs", router: tabsRoutes },
  { path: "/cms/tabs-section-cards", router: tabsSectionCardsRoutes },
  { path: "/cms/testimony", router: testimonyRoutes },
  { path: "/cms/testimony-section", router: testimonySectionRoutes },
  { path: "/cms/species", router: speciesRoutes },
];

// Rutas protegidas con API Key (para la landing)
const landingRoutes = [
  { path: "/landing/payment", router: paymentRoute },
  { path: "/landing/coupons", router: couponsRoutes },
  { path: "/landing/salesforce", router: salesforceRoutes },
];

// Aplicar JWT Auth a todas las rutas CMS
cmsRoutes.forEach((route) => {
  // router.use(route.path, jwtAuthHandler, route.router);
  router.use(route.path, route.router);
});

// Aplicar API Key Auth a todas las rutas de landing
landingRoutes.forEach((route) => {
  // router.use(route.path, apiKeyAuthHandler, route.router);
  router.use(route.path, route.router);
});

export default router;
