var fs = require('fs');
var faker = require('faker');
var Chance = require('chance');

var requisitions = [];
var chance = new Chance();

for (var i = 0; i < 1000; i++) {
  var requisition_item = {
    id: chance.natural({ min: 35000000, max: 40000000 }),
    requisition: faker.name.jobTitle(),
    // recruiter: 'Johnny Appleseed',
    recruiter: chance.pickone(['Johnny Appleseed', chance.name({ gender: chance.pickone(['male', 'female']) })]),
    manager: chance.name({ gender: chance.pickone(['male', 'female']) }),
    privacy: chance.pickone(['Public', 'Confidential'])
  };

  requisitions.push(requisition_item);
}

fs.writeFileSync(
  'data.json',
  JSON.stringify(
    {
      data: {
        requisitions: requisitions
      }
    },
    2
  ),
  'utf8'
);
