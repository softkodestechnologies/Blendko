const {Schema, model} = require('mongoose');

const productSchema = new Schema({
name: {
  type: String,
  required: [true, 'Please enter product name'],
  trim: true,
},
description: {
  type: String,
  required: [true, 'Please enter product description'],
},
price: {
  type: Number,
  required: [true, 'Please enter product price'],
  default: 0.0,
},
images: [
  {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
],
patterns: [
  {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
],
ratings: {
  type: Number,
  default: 0,
},
category: {
  type: Schema.Types.ObjectId,
  ref: 'Category',
  required: [true, 'Please enter product category'],
},
subcategory: {
  type: String,
  required: [true, 'Please enter product subcategory'],
},
attributes: {
  type: Map,
  of: String,
  default: {},
},
num_of_reviews: {
  type: Number,
  default: 0,
},
reviews: [
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
],
measurement: {
  type: String,
  required: [true, 'Please enter product measurement'],
},
quantity: {
  type: Number,
  required: [true, 'Please enter product quantity'],
  default: 0,
},
available_quantity: {
  type: Number,required: [true, 'Please enter product available quantity'],
  default: 0,
},
discount: { type: Number },
features: [
  {
    type: String,
    required: [true, 'Please enter product features'],
  },
],
user: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},
colors: [
  {
    type: String
  }
],
dress_style: [
  {
    type: String
  }
],
gender: {
  type: String,
  enum: ['Male', 'Female', 'Unisex'],
  required: true
},
sizes: [
  {
    type: String
}
], 
fashion_collection: [
  {
    type: String
  }
],
technology: [
  {
    type: String
  }
],
brand: {
  type: String,
  required: [true, 'Please enter product brand']
},
isCustomizable: {
  type: Boolean,
  default: true,
},
weight: {
  type: Number,
  required: true,
},
width: {
  type: Number,
  required: true,
},
height: {
  type: Number,
  required: true,
},
sku: {
  type: String,
  unique: true,
  required: true,
},
}, {
  timestamps: true,
});



const Product = model('Product', productSchema);
module.exports = Product;