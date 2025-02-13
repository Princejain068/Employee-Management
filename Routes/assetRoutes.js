const express = require('express');
const router = express.Router();
const {assignAsset,getAllAssets,getAssetById,deleteAsset} = require('../controller/assestsContollers');

// Routes for asset assignments
router.post('/assign', assignAsset);
router.get('/', getAllAssets);
router.get('/:id', getAssetById);
router.delete('/:id', deleteAsset);

module.exports = router;
