class ApiFeatures {
  constructor(moongoseQuery, queryString) {
    this.moongoseQuery = moongoseQuery;
    this.queryString = queryString;
  }
  filter() {
    const queryStringObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryStringObj[el]);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.moongoseQuery = this.moongoseQuery.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      this.moongoseQuery = this.moongoseQuery.sort(
        this.queryString.sort.split(",").join(" ")
      );
    } else this.moongoseQuery = this.moongoseQuery.sort("-createdAt");
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      this.moongoseQuery = this.moongoseQuery.select(
        this.queryString.fields.split(",").join(" ")
      );
    } else this.moongoseQuery = this.moongoseQuery.select("-__v");
    return this;
  }
  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "products") {
        query = {
          $or: [
            { title: { $regex: this.queryString.keyword, $options: "i" } },
            {
              description: { $regex: this.queryString.keyword, $options: "i" },
            },
          ],
        };
      } else {
        query = {
          $or: [
            { name: { $regex: this.queryString.keyword, $options: "i" } },
            {
              description: { $regex: this.queryString.keyword, $options: "i" },
            },
          ],
        };
      }
      this.moongoseQuery = this.moongoseQuery.find(query);
    }
    return this;
  }
  paginate(countDocuments) {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 5;
    const skip = (page - 1) * limit;
    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.totalPages = Math.ceil(countDocuments / limit);
    pagination.totalDocuments = countDocuments;
    // next page
    if (pagination.currentPage < pagination.totalPages) {
      pagination.nextPage = page + 1;
    }
    // previous page
    if (pagination.currentPage > 1) {
      pagination.previousPage = page - 1;
    }
    this.pagination = pagination;
    this.moongoseQuery = this.moongoseQuery.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeatures;
