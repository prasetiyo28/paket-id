

const fs = require('fs');
const path = require('path');
const rawdata = fs.readFileSync(path.join(__dirname, '../../app/config/package.json'));
let package = JSON.parse(rawdata);
const redisCache = require('../lib/RedisCache');
const { del } = require('../lib/RedisCache');
redisCache.set('ALL_ITEM', package.koli_data);
const { validationResult } = require('express-validator');

exports.getAll = async (req, res, next) => {
    try {
      const key = 'ALL_ITEM';
      const result = await redisCache.getInAsync(key)
      return MSG.sendResponse(res, 'GET_PACKAGE_SUCCESS',result);
    } catch (error) {
      console.log(error);
      return MSG.sendResponse(res, 'GET_PACKAGE_FAILED');
    }
  };

  exports.getPackagesById = async (req, res, next) => {
    try {
        const params = req.params;
        const key = 'ALL_ITEM';
        let packages = await redisCache.getInAsync(key)
      const result = packages.find(rows => rows.koli_id === params.id_package)
      return MSG.sendResponse(res, 'PACKAGE_FOUND',result);
    } catch (error) {
      console.log(error);
      return MSG.sendResponse(res, 'GET_PACKAGE_FAILED');
    }
  };

  exports.update = async (req, res, next) => {
    try {
        const validate = validationResult(req);
        if (!validate.isEmpty()) return MSG.sendResponse(res, 'UPDATE_PACKAGE_FAILED', validate.array());
      
        const params = req.params;
        const key = 'ALL_ITEM';
        let packages = await redisCache.getInAsync(key);
        packages = packages.map(row => {
        if (row.koli_id === params.id_package) {
            row = {...row,...req.body}
            return row;
        }else{
        return row;       
        }
        
    })
      redisCache.set('ALL_ITEM', packages);
      return MSG.sendResponse(res, 'UPDATE_SUCCESS',packages);
    } catch (error) {
      console.log(error);
      return MSG.sendResponse(res, 'UPDATE_FAILED');
    }
  };

  exports.insert = async (req, res, next) => {
    try {
    const validate = validationResult(req);
    if (!validate.isEmpty()) return MSG.sendResponse(res, 'ADD_PACKAGE_FAILED', validate.array());
        
    const key = 'ALL_ITEM';
    let packages = await redisCache.getInAsync(key);
    packages.push(req.body);
    redisCache.set('ALL_ITEM', packages);
    return MSG.sendResponse(res, 'ADD_PACKAGE_SUCCESS',packages);
    } catch (error) {
      console.log(error);
      return MSG.sendResponse(res, 'ADD_PACKAGE_FAILED');
    }
  };

  
  exports.delete = async (req, res, next) => {
    try {
        const params = req.params;
        const key = 'ALL_ITEM';
        let packages = await redisCache.getInAsync(key);
        packages = packages.filter(row => row.koli_id !== params.id_package);
        redisCache.set('ALL_ITEM', packages);
      return MSG.sendResponse(res, 'DELETE_PACKAGE_SUCCESS',packages);
    } catch (error) {
      console.log(error);
      return MSG.sendResponse(res, 'DELETE_PACKAGE_FAILED');
    }
  };
  
  
  