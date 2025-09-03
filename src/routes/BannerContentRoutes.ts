import { Router } from 'express';
import { BannerContentController } from '../controllers/BannerContentController';

const router = Router();
const bannerContentController = new BannerContentController();

// Get all banner contents
router.get('/', bannerContentController.getAllBannerContents);

// Get banner content by ID
router.get('/:id', bannerContentController.getBannerContentById);

// Get banner contents by banner ID
router.get('/banner/:bannerId', bannerContentController.getByBannerId);

// Get banner contents by horizontal card ID
router.get('/horizontal-card/:horizontalCardId', bannerContentController.getByHorizontalCardId);

// Create new banner content
router.post('/', bannerContentController.createBannerContent);

// Update banner content
router.put('/:id', bannerContentController.updateBannerContent);

// Delete banner content
router.delete('/:id', bannerContentController.deleteBannerContent);

// Save multiple banner contents
router.post('/batch', bannerContentController.saveManyBannerContents);

// Get count of banner contents
router.get('/count/total', bannerContentController.countBannerContents);

export default router;