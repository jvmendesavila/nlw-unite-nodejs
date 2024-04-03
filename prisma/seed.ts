import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data:{
      id: '642ac8ae-dd41-4806-9fb2-52b9c9bdb321',
      title: 'Unite Summit',
      slug: 'unite-sumit',
      details: 'Um evento para devs apaixonados por código!',
      maximumAttendees: 120, 
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})