const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name!'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'The tour name must have less than or equal to 40 characteres!'
      ],
      minlength: [
        10,
        'The tour name must have more than or equal to 10 characteres!'
      ]
    },
    slug: String,
    duration: {
      type: String,
      required: [true, 'A tour must have a duration!'],
      validate: [
        validator.isNumeric,
        'The tour duration can only contain numbers!'
      ]
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size!']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty!'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, or difficult!'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0!'],
      max: [5, 'Rating must be below 5.0!']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price!']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        }
      },
      message: 'Discount price ({VALUE}) should be below the regular price!'
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description!']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image!']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// virtual properties are not added to the database and not usable in querys
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// doc middleware, work for .save() or .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// query middleware (with REGEX to execute all mongo methods with "find")
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

// occurs after the query execution
tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds`);
  next();
});

// aggregation middleware
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
