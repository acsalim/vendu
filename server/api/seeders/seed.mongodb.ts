import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import DB from '../models';

async function csv2json(file: string) {
  try {
    const data = await fs.readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), file + '.csv'), 'utf8');
    const [headers, ...rows] = data.split('\r\n').slice(0, -1);
    return rows.map(row => row.split(',').reduce((acc, curr, index) => ({
      ...acc, [headers.split(',')[index]]: curr
    }), {}));
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function main() {
  DB.connect();
  await DB.Product.deleteMany({});
  //await DB.Sale.deleteMany({});
  const products = await csv2json('products');
  const sales = await csv2json('sales');

  if (products) {
    console.log('seeding products...');
    console.time('Products seeding time');
    await DB.Product.insertMany(products);
    console.timeEnd('Products seeding time');
    console.log('products seeded !');
  }

  if (sales) {
    console.log('seeding sales...');
    console.time('Sales seeding time');
    await DB.Sale.insertMany(sales);
    console.timeEnd('Sales seeding time');
    console.log('sales seeded !');
  }
  
  console.log('DB seeded !');

  DB.disconnect();
  process.exit(0);
}

await main();