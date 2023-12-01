const FeatureMethode = require("../utils/FeatureMethode");

const asynchandler = require("express-async-handler");

exports.GetElementService = (module) =>
  asynchandler(async (req, res, next) => {
    const TotaleDoucement = await module.countDocuments();

    const { MongoQuery, pagination } = new FeatureMethode( module , req.query )
      .FiledsBy()
      .Pagination(TotaleDoucement)
      .SortBy()
      .filter();

    const doucement = await MongoQuery ;

    return res.status(201).json({ pagination , data : doucement });
  });
