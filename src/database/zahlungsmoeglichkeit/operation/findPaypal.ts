import Paypal from "../paypal";

export default async function findPaypal(): Promise<Paypal[]> {
  const paypal = await Paypal.findAll();
  return paypal;
}

export async function findPaypalByPk(id: string): Promise<Paypal | null> {
  try {
    const paypal = await Paypal.findByPk(id);
    console.log(paypal);

    return paypal;
  } catch (error) {
    console.error("Error finding paypal:", error);
    throw error;
  }
}

export async function findPaypalByKundeId(
  kundenId: string
): Promise<Array<Paypal> | null> {
  try {
    const paypal = await Paypal.findAll({
      where: {
        kundenId: kundenId
      }
    });
    return paypal;
  } catch (error) {
    console.error("Error finding paypal:", error);
    throw error;
  }
}

export async function findPaypalByPaypalId(
  paypalId: string
): Promise<Array<Paypal> | null> {
  try {
    const paypal = await Paypal.findAll({
      where: {
        paypalId: paypalId
      }
    });
    return paypal;
  } catch (error) {
    console.error("Error finding paypal:", error);
    throw error;
  }
}

export async function findPaypalByPaypalIdAndKundeId(
  paypalId: string,
  kundenId: string
): Promise<Array<Paypal> | null> {
  try {
    const paypal = await Paypal.findAll({
      where: {
        paypalId: paypalId,
        kundenId: kundenId
      }
    });
    return paypal;
  } catch (error) {
    console.error("Error finding paypal:", error);
    throw error;
  }
}

export async function findPaypalByPaypalIdAndKundeIdAndPaypalEmail(
  paypalId: string,
  kundenId: string,
  paypalEmail: string
): Promise<Array<Paypal> | null> {
  try {
    const paypal = await Paypal.findAll({
      where: {
        paypalId: paypalId,
        kundenId: kundenId,
        paypalEmail: paypalEmail
      }
    });
    return paypal;
  } catch (error) {
    console.error("Error finding paypal:", error);
    throw error;
  }
}

export async function findPaypalByPaypalEmail(
  paypalEmail: string
): Promise<Array<Paypal> | null> {
  try {
    const paypal = await Paypal.findAll({
      where: {
        paypalEmail: paypalEmail
      }
    });
    return paypal;
  } catch (error) {
    console.error("Error finding paypal:", error);
    throw error;
  }
}
