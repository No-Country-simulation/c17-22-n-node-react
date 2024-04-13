import { PrismaClient } from '@prisma/client'
// const PrismaClient = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {


  // CATEGORY
  const category001 = await prisma.category.create({
    data: {
      name: "Libros",
    }
  });
  const category002 = await prisma.category.create({
    data: {
      name: "Cines",
    }
  });
  const category003 = await prisma.category.create({
    data: {
      name: "Videojuegos",
    }
  });

  // sub categories

  // await prisma.subcategory.deleteMany({})
  const subCategory011 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 001",
      categoryId: category001.id
    }
  })
  const subCategory012 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 012",
      categoryId: category001.id
    }
  })
  const subCategory013 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 013",
      categoryId: category001.id
    }
  })

  const subCategory021 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 021",
      categoryId: category001.id
    }
  })

  const subCategory022 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 022",
      categoryId: category001.id
    }
  })

  const subCategory023 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 023",
      categoryId: category001.id
    }
  })

  const subCategory031 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 031",
      categoryId: category001.id
    }
  })

  const subCategory032 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 032",
      categoryId: category001.id
    }
  })

  const subCategory033 = await prisma.subcategory.create({
    data: {
      name: "SubCategories 033",
      categoryId: category001.id
    }
  })


  // User

  const User001 = await prisma.user.create({
    data: {
      name: "Luis García",
      email: "luis.garcia@example.com",
      password: "qwerty",
      city: "Lima",
      country: "Peru",
    }
  });

  const User002 = await prisma.user.create({
    data: {
      name: "Ana López",
      email: "ana.lopez@example.com",
      password: "qwerty",
      city: "Arequipa",
      country: "Peru",
    }
  });

  const User003 = await prisma.user.create({
    data: {
      name: "Diego Pérez",
      email: "diego.perez@example.com",
      password: "qwerty",
      city: "Rosario",
      country: "Argentina",
    }
  });

  const User004 = await prisma.user.create({
    data: {
      name: "María Rodríguez",
      email: "maria.rodriguez@example.com",
      password: "qwerty",
      city: "Cordoba",
      country: "Argentina",
    }
  });

  const User005 = await prisma.user.create({
    data: {
      name: "Carlos Martínez",
      email: "carlos.martinez@example.com",
      password: "qwerty",
      city: "Buenos Aires",
      country: "Argentina",
    }
  });

  const User006 = await prisma.user.create({
    data: {
      name: "Sofía Gómez",
      email: "sofia.gomez@example.com",
      password: "qwerty",
      city: "Salta",
      country: "Argentina",
    }
  });

  const User007 = await prisma.user.create({
    data: {
      name: "Javier Sánchez",
      email: "javier.sanchez@example.com",
      password: "qwerty",
      city: "Santa Fe",
      country: "Argentina",
    }
  });

  const User008 = await prisma.user.create({
    data: {
      name: "Laura Flores",
      email: "laura.flores@example.com",
      password: "qwerty",
      city: "Buenos Aires",
      country: "Argentina",
    }
  });


  // inversor

  const inversor001 = await prisma.investor.create({
    data: {
      id: User001.id,
      mensual_votes: 120
    }
  })

  const inversor002 = await prisma.investor.create({
    data: {
      id: User002.id,
      mensual_votes: 120
    }
  })

  // 

  /// Entrepeneur

  const entrepeneur001 = await prisma.entrepeneur.create({
    data: {
      id: User003.id,
      mensual_tickets: 200,
    }
  })

  const entrepeneur002 = await prisma.entrepeneur.create({
    data: {
      id: User004.id,
      mensual_tickets: 200,
    }
  })

  // emprendimientos

  const entrepreneurship001 = await prisma.entrepreneurship.create({
    data: {
      description: "Description for entrepeneurship 001",
      // creation_date: now(),
      meta: ["meta 001", "meta 002"],
      entrepeneurId: entrepeneur001.id,
      subcategoryId: subCategory011.id,
    }
  });

  const entrepreneurship002 = await prisma.entrepreneurship.create({
    data: {
      description: "Description for entrepeneurship 002",
      // creation_date: now(),
      meta: ["meta 001", "meta 002"],
      entrepeneurId: entrepeneur002.id,
      subcategoryId: subCategory023.id,
    }
  })


  // review

  // const review001 = await prisma.review.create({
  //   data: {
  //     userId: User005.id,
  //     entrepreneurshipId: entrepreneurship001.id,
  //     text: "Review 001"
  //   }
  // })

  // const review002 = await prisma.review.create({
  //   data: {
  //     userId: User006.id,
  //     entrepreneurshipId: entrepreneurship001.id,
  //     text: "Review 002"
  //   }
  // })

  // VOTE
  const vote001 = await prisma.vote.create({
    data: {
      userId: User007.id,
      entrepreneurshipId: entrepreneurship002.id,
      value: true
    }
  })

  const vote002 = await prisma.vote.create({
    data: {
      userId: User008.id,
      entrepreneurshipId: entrepreneurship002.id,
      value: true
    }
  })
  // const vote001 = await prisma.vote.create({
  //   data : {
  //     userId : User005.id,
  //     entrepreneurship : entrepreneurship002.id,
  //     value : true
  //   }
  // })

  // const vote002 = await prisma.vote.create({
  //   data : {
  //     userId : User006.id,
  //     entrepreneurship : entrepreneurship002.id,
  //     value : false
  //   }
  // })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })