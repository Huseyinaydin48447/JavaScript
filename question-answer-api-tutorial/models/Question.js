//173
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require("slugify"); //178

const QuestionSchema = new Schema({

    title: {
        type: String,
        require: [true, "Please provide a title"],
        minlength: [10, "Please provide a title at least 10 characters"],
        unique: true
        // Bu bir sorudur. bu-bir-sorudur
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [20, "Please provide a title at least 20 characters"],

    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    //206
    likes:[// bir den fazla beğeni yani birden fazla Id olur.[]
        {
            type: mongoose.Schema.ObjectId,
             ref: "User"
        }
    ],
    //209
    answers:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"Answer"
        }
    ]

});
QuestionSchema.pre("save", function (next) {
    if (!this.isModified("title")) {
        next();
    }
    this.slug = this.makeSlug();//179
    next();
});
//179
QuestionSchema.methods.makeSlug = function () {
    return slugify(this.title, {

        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
    });

};
module.exports = mongoose.model("Question", QuestionSchema);