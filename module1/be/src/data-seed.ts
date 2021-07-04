import seeder from 'mongoose-seed'
import data from './data/achievements.json'
const mongo =
  'mongodb://lenavu:1q2w3e@cluster0-shard-00-00.ymcyu.mongodb.net:27017,cluster0-shard-00-01.ymcyu.mongodb.net:27017,cluster0-shard-00-02.ymcyu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13w37v-shard-0&authSource=admin&retryWrites=true&w=majority'

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
