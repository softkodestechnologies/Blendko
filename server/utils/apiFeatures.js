class ApiFeatures {
  constructor(query, queryStr, document = null) {
    this.query = query;
    this.queryStr = queryStr;
    this.document = document;
  }

  search() {
    if(this.queryStr.keyword === "All Sale") {
      this.queryStr.keyword = ''
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

    this.document = this.document.countDocuments({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = {...this.queryStr };

    const removeFields = ['keyword', 'limit', 'page', 'pp', 'ort'];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Split colors into an array if it's a comma-separated string
    if (queryCopy.colors) {
      queryCopy.colors = queryCopy.colors.split(',');
    }

    const query = {};

    for (const key in queryCopy) {
      if (queryCopy.hasOwnProperty(key)) {
        if (key === 'colors') {
          query[key] = { $in: queryCopy[key] };
        } else if (key === 'sizes') {
          query[key] = { $in: queryCopy[key].split(',') };
        } else if (key === 'dress_style') {
          query[key] = { $in: queryCopy[key].split(',') };
        } else if (key === 'fashion_collection') {
          query[key] = { $in: queryCopy[key].split(',') };
        } else if (key === 'technology') {
          query[key] = { $in: queryCopy[key].split(',') };
        }   else {
          for (const operator in queryCopy[key]) {
            if (queryCopy[key].hasOwnProperty(operator)) {
              query[key] = { [`$${operator}`]: queryCopy[key][operator] };
            }
          }
        }
    }
}

this.query = this.query.find(query);
this.document = this.document && this.document.countDocuments(query);

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