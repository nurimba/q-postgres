import moment from 'moment'
import faker from 'faker/locale/pt_BR'

export default () => {
  const isDeleted = Boolean(Math.floor((Math.random() * 10) + 1) % 2)

  return {
    name: faker.name.findName() + ' - ' + faker.name.lastName(),
    age: faker.random.number(),
    birthday: moment(faker.date.past()).format('YYYY-MM-DD'),
    deleted: isDeleted
  }
}
