class ApiFeatures {
    constructor(query, queryStr, document = null) {
      this.query = query;
      this.queryStr = queryStr;
      this.document = document;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
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
      const queryCopy = { ...this.queryStr };
  
      const removeFields = ['keyword', 'limit', 'page', 'pp', 'sort'];
      removeFields.forEach((el) => delete queryCopy[el]);
  
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      this.document =
        this.document && this.document.countDocuments(JSON.parse(queryStr));
  
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