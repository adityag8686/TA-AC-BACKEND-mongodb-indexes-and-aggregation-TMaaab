
db.users.aggregate([{ $match: { isActive: true } }]);

db.users.aggregate([{ $match: { gender: "male" } }]);

db.users.aggregate([ {$match: {gender:'male', isActive:true}}])

db.users.aggregate([ {$match:{gender:"female",age:{$gte:25}}}])

db.users.aggregate([ {$match:{gender:"male",age:{$gte:25},eyeColor:"blue"}}])

db.users.aggregate([ {$match: {eyeColor:'blue', 'company.location.country': 'USA'}}])

db.users.aggregate([{$match:{gender:'female','company.location.country' : 'Germany', favoriteFruit:'apple'}}])

db.users.aggregate([{$group:{_id :'$gender', count :{$sum :1}}}])

db.users.aggregate([{$match :{eyeColor: "green"}},{$group:{_id :'$eyeColor', count :{$sum :1}}}])

db.users.aggregate([{$match :{eyeColor: "brown",age:{$gt : 20}}},{$group:{_id :'$eyeColor', count :{$sum :1}}}])

db.users.aggregate([{$group :{ _id:'$eyeColor' , count:{$sum : 1}}}])


db.users.aggregate([{$match : {gender : "female" , tags :"amet"}} ,{$group : {_id : '$gender' , count : {$sum : 1}}}])

db.users.aggregate([{$group : {_id :null , avg :{$avg : '$age'}}}])
// 15. Find the average age of males and females i.e. group them by gender.
db.users.aggregate([{$group :{_id : "$gender" , avg : {$avg : '$age'}}}]).pretty()
// 16. Find the user with maximum age.
db.users.aggregate([{$group : {_id : null , maxAge:{$max : '$age'} }}]).pretty()
// 17. Find the document with minimum age.
db.users.aggregate([{$group : {_id : null , minAge:{$min : '$age'} }}]).pretty()
// 18. Find the sum of ages of all males and females.
db.users.aggregate([{$group :{_id : "$gender" , ageSum : {$sum : "$age"}}}])
// 19. Group all males by their eyeColor.
db.users.aggregate([{$match : {gender : "male"}} ,{$group : {_id : "$eyeColor"}}])
// 20. group all 30+ females by their age.
db.users.aggregate([{$match :{gender : "female"}} ,{$group : {_id : "$age"}}]).pretty()
// 21. Group all 23+ males with blue eyes working in Germany.
db.users.aggregate([{$match : {gender: "male" , age : {$gt : 23} ,'company.location.country':"Germany", eyeColor : "blue"}} ,{$group : {_id : "$eyeColor" ,count : {$sum : 1}}}])

// 22. Group all by tag names i.e. use \$unwind since tags are array.
db.users.aggregate([{$unwind : '$tags'} , {$group :{_id : '$tags' , count:{$sum : 1}}}])
// 23. Group all males whose favoriteFruit is `banana` who have registered before 2015.
db.users.aggregate([ {$match: { gender:'male', favoriteFruit: 'banana' }}, {$group: {_id:'$favoriteFruit', count: {$sum:1}}} ]).pretty()
// 24. Group all females by their favoriteFruit.
db.users.aggregate([ {$match : {gender : "female"}},{$group : {_id : "$favoriteFruit"} , count :{$sum : 1}}])
// 25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);
db.users.distinct('eyeColor')
// 26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.
db.users.aggregate([{ $match: { gender: 'female', favoriteFruit: 'apple', eyeColor: 'blue', 'company.location.country': 'USA' } },{ $sort: { registered: -1 } },]).pretty();
// 27. Find all 18+ inactive men and return only the fields specified below in the below provided format

// ```js
// {
//   name: "",
//   email: '';
//   identity: {
//     eye: '',
//     phone: '',
//     location: ''
//   }
// }
db.users.aggregate([{$match: {gender: 'male',isActive: 'false', age:{$gt :18} }}, { $project: { name: 1, email: '$company:email', identity: {
    eye: '$eyeColor',
    phone: '$company.phone',
    location: '$company.location'
    } } }]).pretty()
