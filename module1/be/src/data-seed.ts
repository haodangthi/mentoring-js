import seeder from 'mongoose-seed'
import data from './data/database.json'
import { mongo } from './constants'

seeder.connect(mongo, function () {
  seeder.loadModels([
    'src/schemas/task.ts',
    'src/schemas/achievement.ts',
    'src/schemas/user.ts',
    'src/schemas/challenge.ts',
  ])

  seeder.clearModels([ 'Task', 'Achievement', 'User', 'Challenge' ], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect()
    })
  })
})
