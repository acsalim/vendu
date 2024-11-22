import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import AnalyticsController from '../controllers/AnalyticsController';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.get('/products', ProductsController.all);

router.get('/analytics/total_sales', AnalyticsController.TotalSales);
router.get('/analytics/trending_products', AnalyticsController.TrendingProducts);
router.get('/analytics/category_sales', AnalyticsController.CategorySales);

export default router;