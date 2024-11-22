import type { Request, Response } from "express";
import Sale from "../models/Sale";
import Product from "../models/Product";

async function TotalSales(req: Request, res: Response) {

  const [start, end] = (req.query.period as string).split(',').map((date: string) => new Date(date));

  const data = await Sale.aggregate([
    {
      $match: {
        Date: { $gte: start, $lte: end }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "ProductID",
        foreignField: "ProductID",
        as: "product"
      }
    },
    {
      $addFields: {
        total: {
          $sum: {
            $map: {
              input: "$product",
              as: "product",
              in: { $multiply: ["$Quantity", "$$product.Price"] }
            }
          }
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$total" }
      }
    }
  ]);

  res.json({
    totalSales: data?.[0]?.totalSales || null
  });
}

async function TrendingProducts(req: Request, res: Response) {

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
    {
      $limit: parseInt(req.query.limit as string) || 3
    }
  ]);

  res.json(products);
}

async function CategorySales(req: Request, res: Response) {
  const sales = await Product.aggregate([
    {
      $lookup: {
        from: "sales",
        localField: "ProductID",
        foreignField: "ProductID",
        as: "sales"
      },
    },
    {
      $project: {
        Category: 1,
        CategorySales: {
          $sum: '$sales.Quantity'
        },
      }
    },
    {
      $group: {
        _id: "$Category",
        CategorySales: { $sum: "$CategorySales" },
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$CategorySales" },
        categories: { $push: { category: "$_id", sales: "$CategorySales" } }
      }
    },
    {
      $unwind: "$categories"
    },
    {
      $project: {
        _id: "$categories.category",
        CategorySales: "$categories.sales",
        Percentage: {
          $multiply: [{ $divide: ["$categories.sales", "$totalSales"] }, 100]
        }
      }
    }
  ]);

  res.json(sales);
}

export default { TotalSales, TrendingProducts, CategorySales };