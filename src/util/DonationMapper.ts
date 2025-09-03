import dayjs from "dayjs";
import type { DonationFormDTO } from "../dto/DonationFormDTO";
export interface InputPayload {
  infoPersonal: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    typeDocument: string;
    document: string;
    gender: string;
    dateBirth: string;
    termsAccepted: boolean;
    dataTreatmentAccepted: boolean;
    transactionDay?: number | string;
    paymentMethod?: string;
  };
  utm: {
    campaign: string;
    content: string;
    media: string;
    source: string;
    term: string;
  };
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  price: number;
  category: "donation" | "adoption" | "membership";
  typePayment: 0 | 1 ;
  isGift: boolean;
  tokenSF?: string;
  paymentId?: string;
  discount?: number;
  discountName?: string;
  species?: string;
  campaignId?: string;
  gift?: {
    receiverName: string;
    receiverEmail: string;
    sendingDate: string;
    alias: string;
    message: string;
  };
  sent?: {
    city: string;
    province: string;
    district: string;
    address: string;
    unit: string;
    reference: string;
  };
}

/** Convierte todo el payload en un array de DonationFormDTO (uno por item). */
export function mapToDonationDTO(input: InputPayload): DonationFormDTO[] {
  const { infoPersonal, utm, items } = input;

  return items.map<DonationFormDTO>((item) => {
    const [recName = "", recLast = ""] = item.isGift
      ? splitName(item.gift?.receiverName || "")
      : ["", ""];

    const payment = mapPayment(item.typePayment);

    return {
      Acepto_T_C__c: infoPersonal.termsAccepted,
      Acepto_tratamiento_de_datos_personales__c:
        infoPersonal.dataTreatmentAccepted,

      UTM_Campaign__c: utm.campaign,
      UTM_Content__c: utm.content,
      UTM_Media__c: utm.media,
      UTM_Source__c: utm.source,
      UTM_Term__c: utm.term,

      FirstName: infoPersonal.name,
      LastName: infoPersonal.lastName,
      MobilePhone: infoPersonal.phone,
      Email: infoPersonal.email,
      Tipo_de_documento__c: infoPersonal.typeDocument,
      Nro_de_documento__c: infoPersonal.document,
      Identidad_de_g_nero__c: infoPersonal.gender,
      Fecha_de_nacimiento__c: infoPersonal.dateBirth,

      CampaignId: item.campaignId,
      Es_regalo__c: item.isGift,
      Especie_que_adopta__c: item.species,
      GiftAmount: item.price,
      GiftReceivedDate: dayjs().format("YYYY-MM-DD"),
      Nombre_del_receptor__c: recName,
      Apellido_del_receptor__c: recLast,
      Correo_electr_nico_del_receptor__c: item.isGift
        ? item.gift?.receiverEmail
        : "",
      Nombre_apodo_del_remitente__c: item.isGift ? item.gift?.alias : "",
      Mensaje_del_regalo__c: item.isGift ? item.gift?.message : "",
      Fecha_de_env_o_del_regalo__c: item.gift?.sendingDate,

      Ciudad_entrega__c: item.sent?.city,
      Provincia_entrega__c: item.sent?.province,
      Direcci_n_de_entrega__c: item.sent?.address,
      Dpto_Interior_entrega__c: item.sent?.unit,
      Referencia_de_entrega__c: item.sent?.reference,
      Distrito_de_entrega__c: item.sent?.district,
      Nombre_del_cup_n_aplicado__c: item?.discountName,

      Recurrencia__c: payment.interval,
      Tipo_de_aportaci_n__c: item.category,
      TransactionPeriod: "",
      TransactionDay: "",
      TransactionInterval: 0,

      Descuento__c: item.discount || 0,
      Subtotal__c: item.price || 0,
      PaymentMethod: infoPersonal.paymentMethod,
      Marca_de_la_tarjeta__c: "",
      Id_externo_de_MP__c: item.paymentId,
      Origen_de_la_entrada__c: "Formularios Web",
    };
  });
}

function splitName(full: string): [string, string] {
  const parts = full.trim().split(/\s+/);
  return [parts.slice(0, -1).join(" ") || parts[0], parts.at(-1) || ""];
}

function mapPayment(code: 0 | 1): { method?: string; interval?: string } {
  switch (code) {
    case 0:
      return { method: "", interval: "Única vez" };
    case 1:
      return { method: "Monthly", interval: "Recurrente" };
    default:
      return { method: "Desconocido" };
  }
}
