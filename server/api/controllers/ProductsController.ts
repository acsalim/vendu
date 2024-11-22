import type { Request, Response } from "express";
import Product from "../models/Product";

async function all(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = (page - 1) * limit;
  const rows = await Product.countDocuments();

  const products = await Product.aggregate([
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