import { PrismaClient } from '@prisma/client'
// const PrismaClient = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {


  // CATEGORY
  const category001 = await prisma.category.create({
    data: {
      name: "Category 001",
    }
  });
  const category002 = await prisma.category.create({
    data: {
      name: "Category 002",
    }
  });
  const category003 = await prisma.category.create({
    data: {
      name: "Category 003",
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
      name: "Nombre User 01",
      email: "emailInve001@gmail.com",
      password: "qwerty",
      city: {
        create: {
          name: "Ciudad 001",
          country: {
            create: {
              name: "Country 001"
            }
          }
        }
      }
    }
  });

  const User002 = await prisma.user.create({
    data: {
      name: "Nombre User 02",
      email: "emailInve002@gmail.com",
      password: "qwerty",
      city: {
        create: {
          name: "Ciudad 002",
          country: {
            create: {
              name: "Country 002"
            }
          }
        }
      }
    }
  });

  const User003 = await prisma.user.create({
    data: {
      name: "Nombre User 03",
      email: "emailInve003@gmail.com",
      password: "qwerty",
      city: {
        create: {
          name: "Ciudad 003",
          country: {
            create: {
              name: "Country 003"
            }
          }
        }
      }
    }
  });

  const User004 = await prisma.user.create({
    data: {
      name: "Nombre User 04",
      email: "emailInve004@gmail.com",
      password: "qwerty",
      city: {
        create: {
          name: "Ciudad 004",
          country: {
            create: {
              name: "Country 004"
            }
          }
        }
      }
    }
  });

  const User005 = await prisma.user.create({
    data: {
      name: "Nombre User 05",
      email: "emailInve005@gmail.com",
      password: "qwerty",
      city: {
        create: {
          name: "Ciudad 005",
          country: {
            create: {
              name: "Country 005"
            }
          }
        }
      }
    }
  });

  const User006 = await prisma.user.create({
    data: {
      name: "Nombre User 06",
      email: "emailInve006@gmail.com",
      password: "qwerty",
      city: {
        create: {
          name: "Ciudad 006",
          country: {
            create: {
              name: "Country 006"
            }
          }
        }
      }
    }
  });

  const User007 = await prisma.user.create({
    data: {
      name: "Nombre User 07",
      email: "emailInve007@gmail.com",
      password: "qwerty",
      city: {
        create: {
          name: "Ciudad 007",
          country: {
            create: {
              name: "Country 007"
            }
          }
        }
      }
    }
  });

  const User008 = await prisma.user.create({
    data: {
      name: "Nombre User 08",
      email: "emailInve008@gmail.com",
      password: "qwerty",
      city: {
        create: {
          name: "Ciudad 008",
          country: {
            create: {
              name: "Country 008"
            }
          }
        }
      }
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

  const review001 = await prisma.review.create({
    data: {
      userId: User005.id,
      entrepreneurshipId: entrepreneurship001.id,
      text: "Review 001"
    }
  })

  const review002 = await prisma.review.create({
    data: {
      userId: User006.id,
      entrepreneurshipId: entrepreneurship001.id,
      text: "Review 002"
    }
  })

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