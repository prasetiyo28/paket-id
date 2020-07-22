const router = require('express').Router();

const PackageController = require('../controllers/PackageController');
const Validator = require('../helpers/validation');

router.get('/', PackageController.getAll);
router.post('/',Validator.validate('post_package'), PackageController.insert);
router.get('/:id_package', PackageController.getPackagesById);
router.patch('/:id_package',Validator.validate('patch_package'), PackageController.update);
router.put('/:id_package',Validator.validate('update_package'), PackageController.update);
router.delete('/:id_package', PackageController.delete);

module.exports = router;
