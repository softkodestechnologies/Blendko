class ApiFeatures {
  constructor(query, queryStr, document = null) {
    this.query = query;
    this.queryStr = queryStr;
    this.document = document;
  }

  search() {
    if (this.queryStr.keyword === "All Sale") {
      this.queryStr.keyword = '';
    }
  
    const keyword = this.queryStr.keyword
      ? {
          features: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
  
    this.query = this.query.find({ ...keyword });
     
    return this;  
  }

  // searchO() {
  //   const keyword = this.queryStr.keyword;
  //   const startDate = this.queryStr.startDate;
  //   const endDate = this.queryStr.endDate;
  
  //   let searchQuery = {};
  
  //   if (keyword || startDate || endDate) {
  //     const queryConditions = [];
  
  //     if (keyword) {
  //       queryConditions.push({
  //         $or: [
  //           { 'shippingInfo.firstName': { $regex: keyword, $options: 'i' } },
  //           { orderStatus: { $regex: keyword, $options: 'i' } },
  //         ],
  //       });
  //     }
  
  //     if (startDate && endDate) {
  //       queryConditions.push({
  //         createdAt: {
  //           $gte: new Date(startDate),
  //           $lte: new Date(endDate),
  //         },
  //       });
  //     }
  
  //     searchQuery = { $and: queryConditions };
  //   }
  
  //   this.query = this.query.find(searchQuery);
  
  //   return this;
  // }

  searchO(fields) {
    const keyword = this.queryStr.keyword;
    const startDate = this.queryStr.startDate;
    const endDate = this.queryStr.endDate;
  
    let searchQuery = {};
  
    if (keyword || startDate || endDate) {
      const queryConditions = [];
  
      if (keyword) {
        queryConditions.push({
          $or: fields.map((field) => ({ [field]: { $regex: keyword, $options: 'i' } })),
        });
      }
  
      if (startDate && endDate) {
        queryConditions.push({
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        });
      }
  
      searchQuery = { $and: queryConditions };
    }
  
    this.query = this.query.find(searchQuery);
  
    return this;
  }

  
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ['keyword', 'limit', 'page', 'pp', 'sort'];
    removeFields.forEach((el) => delete queryCopy[el]);

    let query = {};

    const subcategoryMapping = {
      'T-shirt': 'gender',
      'Pants': 'style',
      'Shoes': 'type',
      'Accessories': 'type',
      '40% or More Off': 'subcategory'
    };

    for (const key in queryCopy) {
      if (queryCopy.hasOwnProperty(key)) {
        const value = queryCopy[key];

        if (subcategoryMapping[key]) {
          const attribute = subcategoryMapping[key];
          query.subcategory = key;
          query[`attributes.${attribute}`] = {
            $in: value.split(','),
          };
        } else if (key === 'colors') {
          query[key] = {
            $in: value.split(',').map((color) => new RegExp(color, 'i')),
          };
        } else if (key === 'fashion_collection') {
          query[key] = { $in: value.split(',') };
        }  else if (key === 'sizes') {
          query[key] = { $in: value.split(',') };
         
        } else if (key.startsWith('price')) {
          query[key] = {}; 
          for (const operator in queryCopy[key]) {
            if (queryCopy[key].hasOwnProperty(operator)) {
              const value = Number(queryCopy[key][operator]);
        
              if (!isNaN(value)) { 
                query[key][`$${operator}`] = value;
              }
            }
          }
        }
        else if (key === 'category') {
          query.category = value;
        } else {
          query[`attributes.${key}`] = value;
        }
      }
    }
    
    this.query = this.query.find(query);
    this.document = this.document && this.document.countDocuments(query);

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    this.document = this.document && this.document.countDocuments();
    return this;
  }
}

module.exports = ApiFeatures;
