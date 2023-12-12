import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import idLocale from 'date-fns/locale/id';

function formatPrice(number) {
  // Mengecek apakah input adalah angka
  if (isNaN(number)) {
    return 'Invalid Input';
  }

  // Mengonversi angka ke format harga dengan titik sebagai pemisah per tiga angka
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function calculateSingleProductPrice(price, quantity, rentDurationInDays) {
  return price * quantity * rentDurationInDays;
}

function calculateRentalDurationDay(dayFrom, dayTo) {
  const INCLUDE_TODAY_SELECTED = 1;

  const rentalDurationInDay =
    Math.abs(differenceInDays(dayFrom, dayTo)) + INCLUDE_TODAY_SELECTED;

  return rentalDurationInDay;
}

function getEstimationDate(rangeDay) {
  const startDate = new Date(); // Tanggal awal (misalnya, hari ini)
  const endDate = addDays(startDate, rangeDay); // Tambahkan 1 hari ke tanggal awal

  const formattedStartDate = format(startDate, 'd MMM', { locale: idLocale });
  const formattedEndDate = format(endDate, 'd MMM', { locale: idLocale });

  return `${formattedStartDate} - ${formattedEndDate}`;
}

function calculateTotalPriceOrder(arrayOfProduct) {
  const totalPrice = arrayOfProduct.reduce((acc, current) => {
    return acc + current.subTotal;
  }, 0);
  return totalPrice;
}

function mapOrderObjectToBeSendToAPI(order) {
  const mapped = {
    ...order,
    products: order.products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      rentFrom: product.rentPeriod.from,
      rentTo: product.rentPeriod.to,
    })),
  };

  return mapped;
}

function formatISODateToLocalDate(isoDate) {
  // Parse ISO datetime menjadi objek Date
  const dateObject = parseISO(isoDate);

  // Format tanggal menggunakan date-fns
  const formattedDate = format(dateObject, 'd MMMM yyyy', { locale: idLocale }); // enLocale adalah locale bahasa Inggris

  return formattedDate;
}

function formatISODateToLocalDateTime(isoDate) {
  // Parse ISO datetime menjadi objek Date
  const dateObject = parseISO(isoDate);

  // Format tanggal dan waktu menggunakan date-fns dan locale bahasa Indonesia
  const formattedDateTime = format(dateObject, 'd MMMM yyyy HH:mm:ss', {
    locale: idLocale,
  });

  return formattedDateTime;
}

export {
  formatPrice,
  calculateSingleProductPrice,
  calculateRentalDurationDay,
  getEstimationDate,
  calculateTotalPriceOrder,
  mapOrderObjectToBeSendToAPI,
  formatISODateToLocalDate,
  formatISODateToLocalDateTime,
};
