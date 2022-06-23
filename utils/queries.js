const Questions = require('../models/questions');
const combinations = require('../utils/combinations');
var async = require('async');
var randomSlector = require('./randomly')

module.exports = (req,res)=>{
    let questionsReady = [];
    let course = req.params.course;
    let combination = combinations.filter((el)=> el.course == course);
    combination = combination[0];

    questionsReady.push(function (cb) {
        Questions.find({category:combination.combination[0]}).exec(function (err, docs) {
            if (err) {
                throw cb(err);
            }
    
            // select questions randomly
            let ramdomQuests = [];
            cb(null,  randomSlector(ramdomQuests,docs));
        });
    })
    
    questionsReady.push(function (cb) {
        Questions.find({category:combination.combination[1]}).exec(function (err, docs) {
            if (err) {
                throw cb(err);
            }
    
            // do some stuff with docs & pass or directly pass it
            let ramdomQuests = [];
            cb(null,  randomSlector(ramdomQuests,docs));
        });
    })    
    
    questionsReady.push(function (cb) {
        Questions.find({category:combination.combination[2]}).exec(function (err, docs) {
            if (err) {
                throw cb(err);
            }
    
            // do some stuff with docs & pass or directly pass it
            let ramdomQuests = [];
            cb(null,  randomSlector(ramdomQuests,docs));
        });
    })
    
    questionsReady.push(function (cb) {
        Questions.find({category:combination.combination[3]}).exec(function (err, docs){
            if (err) {
                throw cb(err);
            }
    
            // do some stuff with docs & pass or directly pass it
            let ramdomQuests = [];
            cb(null,  randomSlector(ramdomQuests,docs));
        });
    })
    
    async.parallel(questionsReady, function(err, docs) {
        // if any query fails
        if (err) {
            throw err;
        }
    
        // console.log(docs)
        return res.send(docs);
    })
}