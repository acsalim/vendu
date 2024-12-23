import type { Request, Response } from "express";
import type { ProductType } from "../types/ProductType";
import DB from "../models";

async function all(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = (page - 1) * limit;
  const rows = await DB.Product.countDocuments();

  const products: ProductType[] = await DB.Product.aggregate([
    {
      $lookup: {
        from: "sales",
        localField: "ProductID",
        foreignField: "ProductID",
        as: "sales"
      },
    },
    {
      $addFields: {
        sold: {
          $sum: {
            $map: {
              input: "$sales",
              as: "sale",
              in: "$$sale.Quantity"
            }
          }
        }
      }
    },
    {
      $project: {
        sales: 0
      },
    },
    {
      $sort: { sold: -1 }
    },
    { $skip: skip },
    { $limit: limit }
  ]);

  res.json({
    data: products,
    pagination: {
      page, limit, rows
    }
  });
}

export default { all };