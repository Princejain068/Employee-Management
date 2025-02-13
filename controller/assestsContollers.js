const AssetAssignmentSchema = require('../models/Asset');

const assignAsset = async (req, res) => {
    const user = req.user;
    try {
        if(user.Role==='HR'){
            const { employeeId, assetName, assetTag, assetSpecification, assignedDate, returnDate, status, notes } = req.body;
            const asset = new AssetAssignmentSchema({ employeeId, assetName, assetTag, assetSpecification, assignedDate, returnDate, status, notes ,comapanyId:user.Company});
            await asset.save();
            return res.status(201).json("Asset is assigned to the employee");
        }
        return res.status.json("You are not allowed to perform this task")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getAllAssets = async (req, res) => {
    const user = req.user;

    try {
        if(user.Role ==='HR'){
            const assets = await AssetAssignmentSchema.find({comapanyId:user.Company}).populate('employeeId');
            return res.status(200).json(assets);
        }
        return res.status.json("You are not allowed to perform this task")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const getAssetById = async (req, res) => {
    const user = req.user;
    try {
        if(user.Role==='HR'){
            const asset = await AssetAssignmentSchema.findById(req.params.id).populate('employeeId');
            if (!asset) return res.status(404).json({ message: 'Asset not found' });
            return res.status(200).json(asset);
        }
        return res.status.json("You are not allowed to perform this task")
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const deleteAsset = async (req, res) => {
    const user = req.user;
    try {
        if(user.Role==='HR'){
            const asset = await AssetAssignmentSchema.findByIdAndDelete(req.params.id);
            if (!asset) return res.status(404).json({ message: 'Asset not found' });
            return res.status(200).json({ message: 'Asset deleted successfully' });
        }
        return res.status.json("You are not allowed to perform this task")
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports ={
    getAssetById,
    deleteAsset,
    assignAsset,
    getAllAssets
}